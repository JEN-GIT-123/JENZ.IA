
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGoldPrice } from "../hooks/useGoldPrice";

const ASSETS = [
  {
    symbol: "XAU/USD",
    name: "Gold / US Dollar",
    price: "3,400.20",
    change: "+0.82%",
    direction: "BULLISH",
    confidence: 84,
    trend: "STRONG BULLISH",
    momentum: "POSITIVE",
    volatility: "MEDIUM",
    support: "3,380.00",
    resistance: "3,425.00",
  },
  {
    symbol: "EUR/USD",
    name: "Euro / US Dollar",
    price: "1.1592",
    change: "+0.18%",
    direction: "BULLISH",
    confidence: 71,
    trend: "BULLISH",
    momentum: "POSITIVE",
    volatility: "LOW",
    support: "1.1540",
    resistance: "1.1645",
  },
  {
    symbol: "GBP/USD",
    name: "British Pound / US Dollar",
    price: "1.3545",
    change: "-0.05%",
    direction: "NEUTRAL",
    confidence: 56,
    trend: "SIDEWAYS",
    momentum: "MIXED",
    volatility: "LOW",
    support: "1.3490",
    resistance: "1.3600",
  },
  {
    symbol: "BTC/USD",
    name: "Bitcoin / US Dollar",
    price: "108,420",
    change: "+2.45%",
    direction: "STRONG BUY",
    confidence: 91,
    trend: "STRONG BULLISH",
    momentum: "VERY STRONG",
    volatility: "HIGH",
    support: "105,800",
    resistance: "110,500",
  },
];

const TIMEFRAMES = ["5M", "15M", "1H", "4H", "1D"];

export default function AIAnalysis() {
  const gold = useGoldPrice("3,400.20");

  const [selectedSymbol, setSelectedSymbol] = useState("XAU/USD");
  const [timeframe, setTimeframe] = useState("1H");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const selectedAsset = useMemo(() => {
    const asset =
      ASSETS.find((item) => item.symbol === selectedSymbol) || ASSETS[0];

    if (selectedSymbol === "XAU/USD") {
      return {
        ...asset,
        price: gold.price,
        change: gold.change,
        direction: gold.up ? "BULLISH" : "BEARISH",
      };
    }

    return asset;
  }, [selectedSymbol, gold]);

  const refreshAnalysis = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 900);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#05070b] text-white">
      <Background />

      <div className="relative z-10 mx-auto max-w-[1800px] px-4 py-6 sm:px-6 lg:px-10">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}
        <section className="mb-6">

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

            <div>
              <div className="mb-2 flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                JENZ INTELLIGENCE ENGINE
              </div>

              <h1 className="text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                AI Market Analysis
              </h1>

              <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-500 sm:text-sm">
                Intelligent market analysis designed to help you understand
                trend, momentum, volatility and key price levels.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">

              <div className="rounded-lg border border-[#1d2734] bg-[#090d13] px-3 py-2 font-mono text-[8px] text-slate-500">
                UPDATED{" "}
                <span className="text-slate-300">
                  {formatTime(lastUpdated)}
                </span>
              </div>

              <button
                onClick={refreshAnalysis}
                disabled={isRefreshing}
                className="
                  flex items-center gap-2
                  rounded-lg
                  border border-emerald-400/20
                  bg-emerald-400/[0.06]
                  px-4 py-2
                  text-[9px]
                  font-black
                  tracking-wider
                  text-emerald-400
                  transition
                  hover:border-emerald-400/40
                  hover:bg-emerald-400/10
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <span className={isRefreshing ? "animate-spin" : ""}>
                  ↻
                </span>

                {isRefreshing ? "ANALYZING..." : "REFRESH AI"}
              </button>

            </div>
          </div>
        </section>

        {/* =====================================================
            ASSET SELECTOR
        ===================================================== */}
        <section className="mb-4 overflow-x-auto no-scrollbar">

          <div className="flex min-w-max gap-2">

            {ASSETS.map((asset) => {
              const active = selectedSymbol === asset.symbol;

              return (
                <button
                  key={asset.symbol}
                  onClick={() => setSelectedSymbol(asset.symbol)}
                  className={`
                    min-w-[155px]
                    rounded-xl
                    border
                    px-4 py-3
                    text-left
                    transition-all
                    ${
                      active
                        ? "border-emerald-400/30 bg-emerald-400/[0.07] shadow-[0_0_25px_rgba(52,211,153,0.04)]"
                        : "border-[#18212d] bg-[#080b11] hover:border-[#2b3848]"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">

                    <span className="font-mono text-[10px] font-bold text-slate-300">
                      {asset.symbol}
                    </span>

                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        asset.direction === "NEUTRAL"
                          ? "bg-slate-600"
                          : "bg-emerald-400"
                      }`}
                    />

                  </div>

                  <div className="mt-2 flex items-center justify-between">

                    <span className="font-mono text-[11px] text-white">
                      {asset.symbol === "XAU/USD"
                        ? gold.price
                        : asset.price}
                    </span>

                    <span
                      className={`font-mono text-[8px] font-bold ${
                        asset.change.startsWith("+")
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}
                    >
                      {asset.change}
                    </span>

                  </div>
                </button>
              );
            })}

          </div>
        </section>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}
        <section className="grid gap-4 xl:grid-cols-[1.35fr_.65fr]">

          {/* ===================================================
              MAIN ANALYSIS TERMINAL
          =================================================== */}
          <div className="overflow-hidden rounded-2xl border border-[#1c2633] bg-[#080b11]">

            {/* TERMINAL HEADER */}
            <div className="flex flex-col gap-4 border-b border-[#18202c] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/[0.06] text-lg text-emerald-400">
                  ✦
                </div>

                <div>
                  <div className="font-mono text-[11px] font-black text-white">
                    {selectedAsset.symbol}
                  </div>

                  <div className="mt-0.5 text-[8px] text-slate-600">
                    {selectedAsset.name}
                  </div>
                </div>

              </div>

              {/* TIMEFRAME */}
              <div className="flex rounded-lg border border-[#18212d] bg-[#05070b] p-1">

                {TIMEFRAMES.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`
                      rounded px-3 py-1.5
                      font-mono text-[8px] font-bold
                      transition
                      ${
                        timeframe === tf
                          ? "bg-emerald-400 text-black"
                          : "text-slate-600 hover:text-slate-300"
                      }
                    `}
                  >
                    {tf}
                  </button>
                ))}

              </div>

            </div>

            {/* PRICE AREA */}
            <div className="grid gap-6 p-5 lg:grid-cols-[.8fr_1.2fr]">

              <div>

                <div className="font-mono text-[8px] uppercase tracking-wider text-slate-600">
                  Current Price
                </div>

                <div className="mt-2 text-4xl font-black tracking-tight">
                  {selectedAsset.price}
                </div>

                <div className="mt-2 flex items-center gap-2">

                  <span
                    className={`font-mono text-[10px] font-bold ${
                      selectedAsset.change.startsWith("+")
                        ? "text-emerald-400"
                        : "text-rose-400"
                    }`}
                  >
                    {selectedAsset.change}
                  </span>

                  <span className="text-[8px] text-slate-700">
                    TODAY
                  </span>

                </div>

                {/* SIGNAL */}
                <div className="mt-7 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.035] p-4">

                  <div className="flex items-center justify-between">

                    <div>
                      <div className="font-mono text-[8px] text-slate-600">
                        AI SIGNAL
                      </div>

                      <div className="mt-2 text-lg font-black text-emerald-400">
                        {selectedAsset.direction}
                      </div>
                    </div>

                    <ConfidenceRing
                      confidence={selectedAsset.confidence}
                    />

                  </div>

                </div>

              </div>

              {/* CHART */}
              <div>
                <div className="mb-2 flex items-center justify-between">

                  <span className="font-mono text-[8px] text-slate-600">
                    PRICE STRUCTURE · {timeframe}
                  </span>

                  <span className="font-mono text-[8px] text-emerald-400">
                    AI TRACKING
                  </span>

                </div>

                <MiniChart positive={selectedAsset.direction !== "BEARISH"} />

                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">

                  <MiniMetric
                    label="SUPPORT"
                    value={selectedAsset.support}
                  />

                  <MiniMetric
                    label="RESISTANCE"
                    value={selectedAsset.resistance}
                  />

                  <MiniMetric
                    label="VOLATILITY"
                    value={selectedAsset.volatility}
                  />

                  <MiniMetric
                    label="CONFIDENCE"
                    value={`${selectedAsset.confidence}%`}
                    positive
                  />

                </div>
              </div>

            </div>

          </div>

          {/* ===================================================
              AI SCORE PANEL
          =================================================== */}
          <div className="rounded-2xl border border-[#1c2633] bg-[#080b11] p-5">

            <div className="flex items-center justify-between">

              <div>
                <div className="font-mono text-[8px] font-bold tracking-[0.15em] text-emerald-400">
                  AI SCORE
                </div>

                <h2 className="mt-1 text-lg font-black">
                  Market Condition
                </h2>
              </div>

              <span className="rounded border border-emerald-400/20 bg-emerald-400/[0.06] px-2 py-1 font-mono text-[7px] font-bold text-emerald-400">
                ONLINE
              </span>

            </div>

            <div className="mt-6">

              <ScoreBar
                label="TREND"
                value={selectedAsset.confidence}
                status={selectedAsset.trend}
              />

              <ScoreBar
                label="MOMENTUM"
                value={selectedAsset.direction === "NEUTRAL" ? 52 : 78}
                status={selectedAsset.momentum}
              />

              <ScoreBar
                label="STRUCTURE"
                value={selectedAsset.direction === "NEUTRAL" ? 58 : 82}
                status={
                  selectedAsset.direction === "NEUTRAL"
                    ? "MIXED"
                    : "HEALTHY"
                }
              />

              <ScoreBar
                label="VOLATILITY"
                value={
                  selectedAsset.volatility === "HIGH"
                    ? 88
                    : selectedAsset.volatility === "MEDIUM"
                    ? 62
                    : 34
                }
                status={selectedAsset.volatility}
              />

            </div>

            <div className="mt-7 rounded-xl border border-[#18212d] bg-[#05070b] p-4">

              <div className="flex items-center gap-2">

                <span className="text-emerald-400">
                  ✦
                </span>

                <span className="font-mono text-[8px] font-bold text-slate-400">
                  AI INTERPRETATION
                </span>

              </div>

              <p className="mt-3 text-[11px] leading-6 text-slate-500">
                {getInterpretation(selectedAsset)}
              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            SIGNAL TABLE
        ===================================================== */}
        <section className="mt-4 overflow-hidden rounded-2xl border border-[#1c2633] bg-[#080b11]">

          <div className="flex items-center justify-between border-b border-[#18202c] px-5 py-4">

            <div>
              <div className="font-mono text-[8px] font-bold tracking-[0.18em] text-emerald-400">
                MULTI-ASSET ENGINE
              </div>

              <h2 className="mt-1 text-base font-black">
                AI Signals
              </h2>
            </div>

            <Link
              to="/markets"
              className="text-[8px] font-bold text-slate-600 transition hover:text-emerald-400"
            >
              VIEW MARKETS →
            </Link>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px]">

              <thead>
                <tr className="border-b border-[#151e29] text-left">

                  <TableHead>ASSET</TableHead>
                  <TableHead>PRICE</TableHead>
                  <TableHead>SIGNAL</TableHead>
                  <TableHead>TREND</TableHead>
                  <TableHead>MOMENTUM</TableHead>
                  <TableHead>CONFIDENCE</TableHead>
                  <TableHead>STATUS</TableHead>

                </tr>
              </thead>

              <tbody>

                {ASSETS.map((asset) => (

                  <tr
                    key={asset.symbol}
                    onClick={() => setSelectedSymbol(asset.symbol)}
                    className="
                      cursor-pointer
                      border-b border-[#111923]
                      transition
                      hover:bg-[#0b1017]
                    "
                  >

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2.5">

                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            asset.direction === "NEUTRAL"
                              ? "bg-slate-600"
                              : "bg-emerald-400"
                          }`}
                        />

                        <span className="font-mono text-[10px] font-bold text-slate-300">
                          {asset.symbol}
                        </span>

                      </div>

                    </td>

                    <td className="px-5 py-4 font-mono text-[10px] text-slate-400">
                      {asset.symbol === "XAU/USD"
                        ? gold.price
                        : asset.price}
                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`rounded px-2 py-1 font-mono text-[7px] font-black ${
                          asset.direction === "NEUTRAL"
                            ? "bg-slate-500/10 text-slate-500"
                            : "bg-emerald-400/10 text-emerald-400"
                        }`}
                      >
                        {asset.direction}
                      </span>

                    </td>

                    <td className="px-5 py-4 font-mono text-[8px] text-slate-500">
                      {asset.trend}
                    </td>

                    <td className="px-5 py-4 font-mono text-[8px] text-slate-500">
                      {asset.momentum}
                    </td>

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2">

                        <div className="h-1 w-16 overflow-hidden rounded-full bg-[#18212d]">

                          <div
                            className="h-full rounded-full bg-emerald-400"
                            style={{
                              width: `${asset.confidence}%`,
                            }}
                          />

                        </div>

                        <span className="font-mono text-[8px] text-slate-400">
                          {asset.confidence}%
                        </span>

                      </div>

                    </td>

                    <td className="px-5 py-4">

                      <span className="flex items-center gap-1.5 font-mono text-[7px] font-bold text-emerald-400">
                        <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                        ANALYZED
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

        {/* =====================================================
            KEY LEVELS + RISK
        ===================================================== */}
        <section className="mt-4 grid gap-4 md:grid-cols-2">

          <div className="rounded-2xl border border-[#1c2633] bg-[#080b11] p-5">

            <SectionTitle
              eyebrow="PRICE MAP"
              title="Key Levels"
            />

            <div className="mt-5 space-y-2">

              <LevelRow
                label="RESISTANCE 2"
                value={addPrice(selectedAsset.resistance, 20)}
                type="resistance"
              />

              <LevelRow
                label="RESISTANCE 1"
                value={selectedAsset.resistance}
                type="resistance"
              />

              <LevelRow
                label="CURRENT PRICE"
                value={selectedAsset.price}
                type="current"
              />

              <LevelRow
                label="SUPPORT 1"
                value={selectedAsset.support}
                type="support"
              />

              <LevelRow
                label="SUPPORT 2"
                value={addPrice(selectedAsset.support, -20)}
                type="support"
              />

            </div>

          </div>

          <div className="rounded-2xl border border-[#1c2633] bg-[#080b11] p-5">

            <SectionTitle
              eyebrow="RISK ENGINE"
              title="Market Risk"
            />

            <div className="mt-5 grid grid-cols-2 gap-2">

              <RiskCard
                label="VOLATILITY"
                value={selectedAsset.volatility}
              />

              <RiskCard
                label="MARKET STATE"
                value={
                  selectedAsset.direction === "NEUTRAL"
                    ? "RANGE"
                    : "TRENDING"
                }
              />

              <RiskCard
                label="LIQUIDITY"
                value="HIGH"
              />

              <RiskCard
                label="RISK LEVEL"
                value={
                  selectedAsset.volatility === "HIGH"
                    ? "HIGH"
                    : "MODERATE"
                }
              />

            </div>

            <div className="mt-4 border-l-2 border-amber-400/50 bg-amber-400/[0.03] px-4 py-3">

              <div className="font-mono text-[8px] font-bold text-amber-400">
                RISK NOTICE
              </div>

              <p className="mt-1 text-[9px] leading-5 text-slate-600">
                AI analysis is informational and does not guarantee future
                market movement. Always manage risk independently.
              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            FOOTER STATUS
        ===================================================== */}
        <div className="mt-6 flex flex-col justify-between gap-3 border-t border-[#151d28] pt-5 pb-8 sm:flex-row sm:items-center">

          <div className="flex items-center gap-2 font-mono text-[8px] text-slate-700">

            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

            JENZ.AI INTELLIGENCE ENGINE ACTIVE

          </div>

          <div className="font-mono text-[8px] text-slate-700">
            ANALYSIS IS GENERATED FOR INFORMATIONAL PURPOSES
          </div>

        </div>

      </div>
    </main>
  );
}

/* ============================================================
   BACKGROUND
============================================================ */

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-0">

      <div
        className="
          absolute inset-0 opacity-[0.035]
          [background-image:linear-gradient(#94a3b8_1px,transparent_1px),linear-gradient(90deg,#94a3b8_1px,transparent_1px)]
          [background-size:70px_70px]
        "
      />

      <div className="absolute left-[5%] top-[5%] h-[350px] w-[350px] rounded-full bg-emerald-500/[0.035] blur-[130px]" />

      <div className="absolute right-[5%] top-[25%] h-[400px] w-[400px] rounded-full bg-cyan-500/[0.025] blur-[150px]" />

    </div>
  );
}

/* ============================================================
   CONFIDENCE RING
============================================================ */

function ConfidenceRing({ confidence }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (confidence / 100) * circumference;

  return (
    <div className="relative h-14 w-14">

      <svg
        className="h-14 w-14 -rotate-90"
        viewBox="0 0 44 44"
      >
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#17202b"
          strokeWidth="3"
        />

        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#34d399"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center font-mono text-[9px] font-black text-emerald-400">
        {confidence}%
      </div>

    </div>
  );
}

/* ============================================================
   MINI CHART
============================================================ */

function MiniChart({ positive }) {
  return (
    <div className="relative h-[250px] overflow-hidden rounded-xl border border-[#18212d] bg-[#05070b]">

      <div
        className="
          absolute inset-0 opacity-30
          [background-image:linear-gradient(#1b2531_1px,transparent_1px),linear-gradient(90deg,#1b2531_1px,transparent_1px)]
          [background-size:35px_35px]
        "
      />

      <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-[#26313e]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 300"
        preserveAspectRatio="none"
      >

        <defs>
          <linearGradient
            id="aiChartGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#34d399"
              stopOpacity="0.2"
            />

            <stop
              offset="100%"
              stopColor="#34d399"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        <path
          d="
            M0 240
            L35 225
            L70 232
            L105 205
            L140 214
            L175 185
            L210 198
            L245 160
            L280 170
            L315 142
            L350 153
            L385 118
            L420 130
            L455 105
            L490 120
            L525 86
            L560 98
            L595 70
            L630 84
            L665 55
            L700 68
            L735 40
            L770 50
            L800 28
            L800 300
            L0 300
            Z
          "
          fill="url(#aiChartGradient)"
        />

        <path
          d="
            M0 240
            L35 225
            L70 232
            L105 205
            L140 214
            L175 185
            L210 198
            L245 160
            L280 170
            L315 142
            L350 153
            L385 118
            L420 130
            L455 105
            L490 120
            L525 86
            L560 98
            L595 70
            L630 84
            L665 55
            L700 68
            L735 40
            L770 50
            L800 28
          "
          fill="none"
          stroke={positive ? "#34d399" : "#fb7185"}
          strokeWidth="3"
        />

        <circle
          cx="800"
          cy="28"
          r="6"
          fill={positive ? "#34d399" : "#fb7185"}
        />

      </svg>

      <div className="absolute left-3 top-3 font-mono text-[7px] text-slate-700">
        AI PRICE STRUCTURE
      </div>

      <div className="absolute bottom-3 right-3 rounded bg-[#080c12] px-2 py-1 font-mono text-[7px] text-emerald-400">
        AI TRACKING
      </div>

    </div>
  );
}

/* ============================================================
   SCORE BAR
============================================================ */

function ScoreBar({ label, value, status }) {
  return (
    <div className="mb-5">

      <div className="mb-2 flex items-center justify-between">

        <span className="font-mono text-[8px] font-bold text-slate-500">
          {label}
        </span>

        <span className="font-mono text-[8px] text-emerald-400">
          {status}
        </span>

      </div>

      <div className="flex items-center gap-3">

        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#17202b]">

          <div
            className="h-full rounded-full bg-emerald-400 transition-all duration-500"
            style={{
              width: `${value}%`,
            }}
          />

        </div>

        <span className="w-7 text-right font-mono text-[8px] text-slate-600">
          {value}
        </span>

      </div>

    </div>
  );
}

/* ============================================================
   MINI METRIC
============================================================ */

function MiniMetric({
  label,
  value,
  positive,
}) {
  return (
    <div className="rounded-lg border border-[#18212d] bg-[#05070b] p-3">

      <div className="font-mono text-[7px] text-slate-700">
        {label}
      </div>

      <div
        className={`mt-1.5 font-mono text-[9px] font-bold ${
          positive
            ? "text-emerald-400"
            : "text-slate-400"
        }`}
      >
        {value}
      </div>

    </div>
  );
}

/* ============================================================
   TABLE HEAD
============================================================ */

function TableHead({ children }) {
  return (
    <th className="px-5 py-3 font-mono text-[7px] font-bold tracking-wider text-slate-700">
      {children}
    </th>
  );
}

/* ============================================================
   SECTION TITLE
============================================================ */

function SectionTitle({ eyebrow, title }) {
  return (
    <div>

      <div className="font-mono text-[8px] font-bold tracking-[0.18em] text-emerald-400">
        {eyebrow}
      </div>

      <h2 className="mt-1 text-base font-black">
        {title}
      </h2>

    </div>
  );
}

/* ============================================================
   LEVEL ROW
============================================================ */

function LevelRow({
  label,
  value,
  type,
}) {
  const current = type === "current";
  const resistance = type === "resistance";

  return (
    <div
      className={`
        flex items-center justify-between
        rounded-lg
        border
        px-4 py-3
        ${
          current
            ? "border-emerald-400/20 bg-emerald-400/[0.05]"
            : "border-[#18212d] bg-[#05070b]"
        }
      `}
    >

      <div className="flex items-center gap-2">

        <span
          className={`h-1.5 w-1.5 rounded-full ${
            current
              ? "bg-emerald-400"
              : resistance
              ? "bg-rose-400/70"
              : "bg-cyan-400/70"
          }`}
        />

        <span className="font-mono text-[8px] text-slate-600">
          {label}
        </span>

      </div>

      <span
        className={`font-mono text-[9px] font-bold ${
          current
            ? "text-emerald-400"
            : "text-slate-400"
        }`}
      >
        {value}
      </span>

    </div>
  );
}

/* ============================================================
   RISK CARD
============================================================ */

function RiskCard({
  label,
  value,
}) {
  return (
    <div className="rounded-lg border border-[#18212d] bg-[#05070b] p-4">

      <div className="font-mono text-[7px] font-bold text-slate-700">
        {label}
      </div>

      <div className="mt-2 font-mono text-[10px] font-bold text-slate-300">
        {value}
      </div>

    </div>
  );
}

/* ============================================================
   INTERPRETATION
============================================================ */

function getInterpretation(asset) {
  if (asset.direction === "NEUTRAL") {
    return `${asset.symbol} is currently showing mixed signals. Price structure appears range-bound, while momentum lacks enough strength to confirm a directional move.`;
  }

  if (asset.direction === "STRONG BUY") {
    return `${asset.symbol} is showing strong bullish momentum with a high-confidence trend structure. Momentum remains elevated, although volatility is also higher than normal.`;
  }

  if (asset.direction === "BULLISH") {
    return `${asset.symbol} is showing a bullish market structure. Momentum remains positive and price is holding above the identified support zone.`;
  }

  return `${asset.symbol} is showing bearish pressure. Momentum and structure should be monitored closely around the identified support and resistance levels.`;
}

/* ============================================================
   PRICE HELPER
============================================================ */

function addPrice(price, amount) {
  const numeric = Number(
    String(price).replace(/,/g, "")
  );

  if (Number.isNaN(numeric)) {
    return price;
  }

  return numeric
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* ============================================================
   TIME
============================================================ */

function formatTime(date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}
