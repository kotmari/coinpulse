import CoinOverview from "@/components/home/CoinOverview";
import TrendingCoins from "@/components/home/TrendingCoins";
import { CoinOverviewFallback, TrendingCoinsFallback } from "@/components/Skaleton";
import { Suspense } from "react";




export default async function Page() {

  return (
    <main className="main-container">
      <section className="home-grid">
      <Suspense fallback={<CoinOverviewFallback />}><CoinOverview /></Suspense>
      <Suspense fallback={<TrendingCoinsFallback />}><TrendingCoins /></Suspense>
      </section>
      <section className="w-full mt-7 space-y-4">
        <p>Categories</p>
      </section>
    </main>
  );
}
