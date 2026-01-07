// import { useEffect, useRef, useState } from "react"

// // export const useCoinGeckoWebSocket = ({coinId, poolId, liveInterval }: UseCoinGeckoWebSocketProps): UseCoinGeckoWebSocketReturn => {
// //    const wsRef = useRef<WebSocket | null>(null)
// //    const subscribed = useRef(<Set<string>>new Set())

// //    const [price, setPrice] = useState<ExtendedPriceData | null>(null)
// //    const [trends, setTrends] = useState<Trade[]>([])
// //    const [ohlcv, setOhlcv] = useState<OHLCData | null>(null)

// //    const [isWsReady, setIsWsReady] = useState(false)

// //    useEffect(()=> {

// //    }, [])

// // }

// // Public API - Onchain DEX trades
// const fetchTrades = async (network: string, poolAddress: string) => {
//   const response = await fetch(
//     `https://api.coingecko.com/api/v3/onchain/networks/${network}/pools/${poolAddress}/trades`,
//     {
//       headers: {
//         'x-cg-demo-api-key': '<api-key>'
//       }
//     }
//   );
//   return response.json();
// };

// // Polling кожні 10-30 секунд
// useEffect(() => {
//   const interval = setInterval(() => {
//     fetchTrades('eth', poolAddress).then(setTrades);
//   }, 10000); // 10 секунд
  
//   return () => clearInterval(interval);
// }, [poolAddress]);

// // Public API - OHLCV chart
// const fetchOHLCV = async (network: string, poolAddress: string) => {
//   const response = await fetch(
//     `https://api.coingecko.com/api/v3/onchain/networks/${network}/pools/${poolAddress}/ohlcv/minute`,
//     {
//       headers: {
//         'x-cg-demo-api-key': '<api-key>'
//       }
//     }
//   );
//   return response.json();
// };

// // Public API - Simple price
// const fetchPrice = async (coinId: string) => {
//   const response = await fetch(
//     `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`,
//     {
//       headers: {
//         'x-cg-demo-api-key': '<api-key>'
//       }
//     }
//   );
//   return response.json();
// };

// const [liveInterval, setLiveInterval] = useState<'10s' | '30s'>('10s');
// const [trades, setTrades] = useState<Trade[]>([]);
// const [price, setPrice] = useState<number | null>(null);

// // Polling замість WebSocket
// useEffect(() => {
//   const intervalMs = liveInterval === '10s' ? 10000 : 30000;
  
//   const fetchData = async () => {
//     if (network && poolAddress) {
//       const tradesData = await fetchTrades(network, poolAddress);
//       setTrades(tradesData.data || []);
//     }
    
//     if (coinId) {
//       const priceData = await fetchPrice(coinId);
//       setPrice(priceData[coinId]?.usd);
//     }
//   };
  
//   fetchData(); // Перший запит одразу
//   const interval = setInterval(fetchData, intervalMs);
  
//   return () => clearInterval(interval);
// }, [coinId, network, poolAddress, liveInterval]);

// const tradeColumns: DataTableColumn<Trade>[] = [
//     {
//       header: 'Price',
//       cellClassName: 'price-cell',
//       cell: (trade) => (trade.price ? formatCurrency(trade.price) : '-'),
//     },
//     {
//       header: 'Amount',
//       cellClassName: 'amount-cell',
//       cell: (trade) => trade.amount?.toFixed(4) ?? '-',
//     },
//     {
//       header: 'Value',
//       cellClassName: 'value-cell',
//       cell: (trade) => (trade.value ? formatCurrency(trade.value) : '-'),
//     },
//     {
//       header: 'Buy/Sell',
//       cellClassName: 'type-cell',
//       cell: (trade) => (
//         <span className={trade.type === 'b' ? 'text-green-500' : 'text-red-500'}>
//           {trade.type === 'b' ? 'Buy' : 'Sell'}
//         </span>
//       ),
//     },
//     {
//       header: 'Time',
//       cellClassName: 'time-cell',
//       cell: (trade) => (trade.timestamp ? timeAgo(trade.timestamp) : '-'),
//     },
// ];