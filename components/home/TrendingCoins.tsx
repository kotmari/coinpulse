import { fetcher } from "@/lib/coingecko.actions";
import DataTable from "../DataTable";
import Link from "next/link";
import Image from "next/image";
import { cn, formatCurrentcy } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

const TrendingCoins = async () => {
  const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
    "/search/trending",
    undefined,
    300
  );
  const columns: DataTableColumn<TrendingCoin>[] = [
    {
      header: "Name",
      cellClassName: "name-cell",
      cell: (coin) => {
        const item = coin.item;
        return (
          <Link href={`/coins/${item.id}`}>
            <Image src={item.large} alt={item.name} width={36} height={36} />
            <p>{item.name}</p>
          </Link>
        );
      },
    },
    {
      header: "24h Change",
      cellClassName: "name-cell",
      cell: (coin) => {
        const item = coin.item;
        const percent = item.data?.price_change_percentage_24h?.usd ?? 0;
        const isTrendingUp = percent > 0;
        const formatted = `${isTrendingUp ? "+" : ""}${percent.toFixed(2)}%`;
        return (
          <div
            className={cn(
              "price-change",
              isTrendingUp ? "text-green-500" : "text-red-500"
            )}
          >
            <span>
              {isTrendingUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            </span>
            <p className="ml-2">{formatted}</p>
          </div>
        );
      },
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (coin) => formatCurrentcy(coin.item.data.price),
    },
  ];
  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>
      <div >
        <DataTable
          data={trendingCoins.coins.slice(0, 6) || []}
          columns={columns}
          rowKey={(coin) => coin.item.id}
          tableClassName="trending-coins-table"
          headerCellClassName="py-3!"
          bodyCellClassName="py-2!"
        />
      </div>
    </div>
  );
};

export default TrendingCoins;
