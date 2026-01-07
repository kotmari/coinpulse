import CandlestickChart from "./CandlestickChart";
import CoinHeader from "./CoinHeader";
import { Separator } from "./ui/separator";

const LiveDataWrapper = ({
  children,
  coinId,
  coin,
  coinOHLCData,
}: LiveDataProps) => {
  return (
    <section id="live-data-wrapper">
      <CoinHeader
        name={coin.name}
        image={coin.image.large}
        livePrice={coin.market_data.current_price.usd}
        livePriceChangePercentage24h={
          coin.market_data.price_change_percentage_24h_in_currency.usd
        }
        priceChangePercentage30d={
          coin.market_data.price_change_percentage_30d_in_currency.usd
        }
        priceChange24h={coin.market_data.price_change_24h_in_currency.usd}
      />
      <Separator className="divider" />
      <div className="trend">
        <CandlestickChart
          coinId={coinId}
          data={coinOHLCData}
          //  liveOhlcv={ohlcv}
          //  mode="live"
          initialPeriod="daily"
          //  liveInterval={liveInterval}
          //  setLiveInterval={setLiveInterval}
        >
          <h4>Trend Overview</h4>
        </CandlestickChart>
      </div>
    </section>
  );
};

export default LiveDataWrapper;
