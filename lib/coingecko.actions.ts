"use server"

import qs from 'query-string'

const BASE_URL = process.env.COINGECKO_BASE_URL
const API_KEY = process.env.COINGECKO_API_KEY

if(!BASE_URL) throw new Error ("Could not get base url")
if(!API_KEY) throw new Error ("Could not get api key")

   export async function fetcher<T>(
      endpoint: string,
      params?: QueryParams,
      revalidate = 60
   ): Promise<T> {
      const url = qs.stringifyUrl({
         url: `${BASE_URL}/${endpoint}`,
         query: params
      }, {skipEmptyString: true, skipNull: true})

      const response = await fetch(url, {
         headers: {
            "x-cg-demo-api-key": API_KEY,
            "Content-Type": "application/json"
         } as Record<string, string>,
         next: {revalidate}
      })
      if(!response.ok){
         const errorBody: CoinGeckoErrorBody = await response.json().catch(()=>({}))
         throw new Error(`API Error: ${response.status}: ${errorBody.error || response.statusText}`)
      }

      return response.json()
   }

   export async function getPools(id: string, network?: string | null, contractAddress?: string | null): Promise<PoolData>{
      const fallback: PoolData = {
         id: '',
         network: '',
         name: '',
         address: ''
      }

      if(network && contractAddress){
         try{
         const poolData = await fetcher<{data: PoolData[]}>(`/onchain/networks/${network}/tokens/${contractAddress}/pools`)

         return poolData.data?.[0] ?? fallback
         }catch(error){
            console.error(error)
             return fallback
         }
      }

      try{
         const poolData = await fetcher<{data: PoolData[]}>('/onchain/search/pools', {query: id})
         return poolData.data?.[0] ?? fallback
      }catch {
         return fallback
      }
   }

// export async function searchCoins(query: string): Promise<SearchCoin[]> {
//   if (!query) return [];

//   try {
//     // 1️⃣ Пошук по назві
//     const searchResults = await fetcher<{ coins: TrendingCoin[] }>('search', { query });

//     if (!searchResults.coins || searchResults.coins.length === 0) return [];

//     // 2️⃣ Беремо топ-10 ID
//     const topCoinIds = searchResults.coins
//       .slice(0, 10)
//       .map((c) => c.item.id)
//       .join(',');

//     // 3️⃣ Отримуємо дані про ринок
//     const marketData = await fetcher<any[]>('coins/markets', {
//       vs_currency: 'usd',
//       ids: topCoinIds,
//       order: 'market_cap_desc',
//       sparkline: false,
//       price_change_percentage: '24h',
//     });

//     // 4️⃣ Об’єднуємо з оригінальними іконками
//     return marketData.map((coin) => {
//       const original = searchResults.coins.find((c) => c.item.id === coin.id)?.item;

//       return {
//         ...coin,
//         thumb: original?.thumb ?? coin.image,
//         large: original?.large ?? coin.image,
//         data: {
//           price_change_percentage_24h: coin.price_change_percentage_24h ?? 0,
//         },
//       } as SearchCoin;
//     });
//   } catch (err) {
//     console.error('Error in searchCoins:', err);
//     return [];
//   }
// }



// export async function getTrendingCoins(): Promise<TrendingCoin[]> {
//   try {
//     const response = await fetcher<{ coins: TrendingCoin[] }>("search/trending");

//     return response.coins || [];
//   } catch (error) {
//     console.error("Trending fetch failed:", error);
//     return [];
//   }
// }



export async function searchCoins(query: string): Promise<SearchCoin[]> {
  if (!query) return [];

  try {
    // 1️⃣ Отримуємо пошук по імені/символу монети
    const searchResults = await fetcher<{ coins: TrendingCoin[] }>('search', { query });
    console.log('🔍 search API results:', searchResults);

    if (!searchResults.coins || searchResults.coins.length === 0) return [];

    // 2️⃣ Беремо до 10 топових результатів
    const topCoinIds = searchResults.coins
      .slice(0, 10)
      .map((coin) => coin.item.id)
      .join(',');
    console.log('🆔 Top coin IDs:', topCoinIds);

    // 3️⃣ Отримуємо дані ринку по цих монетах
    const marketData = await fetcher<SearchCoin[]>('coins/markets', {
      vs_currency: 'usd',
      ids: topCoinIds,
      order: 'market_cap_desc',
      sparkline: false,
      price_change_percentage: '24h',
    });
    console.log('📊 Market data:', marketData);

    // 4️⃣ Об’єднуємо дані з пошуку та ринку
    const merged = marketData.map((marketCoin) => {
      const originalSearchData = searchResults.coins.find(c => c.item.id === marketCoin.id);
      return {
        ...marketCoin,
        thumb: originalSearchData?.item.thumb || marketCoin.thumb,
        data: {
          price_change_percentage_24h: marketCoin.data?.price_change_percentage_24h ?? 0
        }
      } as SearchCoin;
    });

    console.log('✅ Merged search results:', merged);
    return merged;

  } catch (error) {
    console.error('❌ Error in searchCoins:', error);
    return [];
  }
}

