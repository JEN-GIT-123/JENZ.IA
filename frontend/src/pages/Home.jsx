import React from "react";
import { Link } from "react-router-dom";

import { useGoldPrice } from "../hooks/useGoldPrice";
import { useEurPrice } from "../hooks/useEurPrice";
import { useGbpPrice } from "../hooks/useGbpPrice";

const MARKETS = [
  {
    symbol: "XAU/USD",
    name: "Gold",
    live: true,
  },
  {
    symbol: "EUR/USD",
    name: "Euro / Dollar",
    live: true,
  },
  {
    symbol: "GBP/USD",
    name: "Pound / Dollar",
    live: true,
  },
  {
    symbol: "BTC/USD",
    name: "Bitcoin",
    price: "108,420",
    change: "+2.45%",
    up: true,
    live: false,
  },
];

const FEATURES = [
  {
    number: "01",
    title: "Live Markets",
    description:
      "Monitor major forex, gold and crypto markets with a clean real-time trading interface.",
    icon: "↗",
  },
  {
    number: "02",
    title: "AI Analysis",
    description:
      "Turn market data into clear insights with AI-powered trend, momentum and market analysis.",
    icon: "✦",
  },
  {
    number: "03",
    title: "Trading Tools",
    description:
      "Access professional tools designed to help traders analyze opportunities faster.",
    icon: "⌁",
  },
];

export default function Home() {
  // =========================================================
  // LIVE MARKET DATA
  // =========================================================

  const gold = useGoldPrice("3,400.20");
  const eur = useEurPrice("1.17000");
  const gbp = useGbpPrice("1.35000");

  return (
    <main className="min-h-screen overflow-hidden bg-[#05070b] text-white">

      {/* =========================================================
          BACKGROUND GRID
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-0">

        <div
          className="
            absolute inset-0
            opacity-[0.035]
            [background-image:linear-gradient(#94a3b8_1px,transparent_1px),linear-gradient(90deg,#94a3b8_1px,transparent_1px)]
            [background-size:70px_70px]
          "
        />

        <div className="absolute left-[8%] top-[10%] h-[420px] w-[420px] rounded-full bg-emerald-500/[0.045] blur-[140px]" />

        <div className="absolute right-[5%] top-[35%] h-[380px] w-[380px] rounded-full bg-cyan-500/[0.035] blur-[140px]" />

      </div>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative z-10">

        <div className="mx-auto max-w-[1800px] px-5 pb-20 pt-16 sm:px-8 lg:px-12 lg:pb-28 lg:pt-24">

          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">

            {/* =====================================================
                HERO LEFT
            ===================================================== */}

            <div>

              {/* STATUS */}

              <div
                className="
                  mb-7 inline-flex items-center gap-2
                  rounded-full
                  border border-emerald-400/20
                  bg-emerald-400/[0.06]
                  px-3 py-1.5
                  font-mono
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-emerald-400
                "
              >

                <span className="relative flex h-1.5 w-1.5">

                  <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                  <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />

                </span>

                JENZ.AI ENGINE ONLINE

              </div>

              {/* HEADING */}

              <h1
                className="
                  max-w-4xl
                  text-5xl
                  font-black
                  leading-[0.98]
                  tracking-[-0.045em]
                  sm:text-6xl
                  lg:text-7xl
                  xl:text-[88px]
                "
              >

                Trade
                <span className="text-slate-500">
                  {" "}smarter.
                </span>

                <br />

                Read the
                <span
                  className="
                    bg-gradient-to-r
                    from-emerald-300
                    via-emerald-400
                    to-cyan-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  {" "}market faster.
                </span>

              </h1>

              {/* DESCRIPTION */}

              <p className="mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">

                JENZ.AI combines live market data, intelligent analysis and
                professional trading tools into one powerful platform built
                for modern traders.

              </p>

              {/* BUTTONS */}

              <div className="mt-9 flex flex-wrap gap-3">

                <Link
                  to="/markets"
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    bg-emerald-400
                    px-5
                    py-3
                    text-xs
                    font-black
                    tracking-wide
                    text-black
                    transition-all
                    hover:bg-emerald-300
                    hover:shadow-[0_0_35px_rgba(52,211,153,0.25)]
                  "
                >

                  EXPLORE MARKETS

                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>

                </Link>

                <Link
                  to="/ai-analysis"
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-[#26303e]
                    bg-[#0b0f16]
                    px-5
                    py-3
                    text-xs
                    font-black
                    tracking-wide
                    text-slate-200
                    transition-all
                    hover:border-emerald-400/40
                    hover:bg-[#10161f]
                  "
                >

                  <span className="text-emerald-400">
                    ✦
                  </span>

                  AI ANALYSIS

                </Link>

              </div>

              {/* HERO STATS */}

              <div className="mt-12 flex flex-wrap gap-x-10 gap-y-5">

                <HeroStat
                  value="24/7"
                  label="MARKET MONITORING"
                />

                <HeroStat
                  value="AI"
                  label="MARKET INTELLIGENCE"
                />

                <HeroStat
                  value="01"
                  label="TRADING WORKSPACE"
                />

              </div>

            </div>

            {/* =====================================================
                HERO RIGHT - MARKET TERMINAL
            ===================================================== */}

            <div className="relative">

              {/* Glow */}

              <div className="absolute -inset-10 rounded-full bg-emerald-400/[0.04] blur-3xl" />

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#202a38]
                  bg-[#080b11]/95
                  shadow-2xl
                "
              >

                {/* TERMINAL HEADER */}

                <div className="flex items-center justify-between border-b border-[#18202c] px-4 py-3">

                  <div className="flex items-center gap-2">

                    <span
                      className="
                        h-2
                        w-2
                        animate-pulse
                        rounded-full
                        bg-emerald-400
                        shadow-[0_0_10px_rgba(52,211,153,.7)]
                      "
                    />

                    <span className="font-mono text-[10px] font-bold tracking-wider text-slate-400">
                      MARKET TERMINAL
                    </span>

                  </div>

                  <span className="font-mono text-[9px] text-emerald-400">
                    LIVE
                  </span>

                </div>

                {/* =================================================
                    GOLD MAIN
                ================================================= */}

                <div className="border-b border-[#18202c] p-5">

                  <div className="flex items-start justify-between">

                    <div>

                      <div className="font-mono text-[10px] font-bold text-slate-500">
                        XAU/USD
                      </div>

                      <div className="mt-2 text-3xl font-black tracking-tight">
                        {gold.price}
                      </div>

                      <div className="mt-1 flex items-center gap-2 font-mono text-[10px]">

                        <span
                          className={
                            gold.up
                              ? "text-emerald-400"
                              : "text-rose-400"
                          }
                        >
                          {gold.up ? "▲" : "▼"} {gold.change}
                        </span>

                        <span className="text-slate-600">
                          LIVE
                        </span>

                      </div>

                    </div>

                    <div
                      className="
                        rounded-md
                        border
                        border-emerald-400/20
                        bg-emerald-400/[0.06]
                        px-2.5
                        py-1
                        text-[8px]
                        font-black
                        tracking-wider
                        text-emerald-400
                      "
                    >
                      BULLISH
                    </div>

                  </div>

                  {/* FAKE CHART */}

                  <div
                    className="
                      relative
                      mt-6
                      h-[190px]
                      overflow-hidden
                      rounded-lg
                      border
                      border-[#18202c]
                      bg-[#05070b]
                    "
                  >

                    {/* GRID */}

                    <div
                      className="
                        absolute
                        inset-0
                        opacity-30
                        [background-image:linear-gradient(#1a2430_1px,transparent_1px),linear-gradient(90deg,#1a2430_1px,transparent_1px)]
                        [background-size:35px_35px]
                      "
                    />

                    {/* CHART */}

                    <svg
                      className="absolute inset-0 h-full w-full"
                      viewBox="0 0 600 220"
                      preserveAspectRatio="none"
                    >

                      <defs>

                        <linearGradient
                          id="chartFill"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >

                          <stop
                            offset="0%"
                            stopColor="#34d399"
                            stopOpacity="0.22"
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
                          M0 175
                          L35 165
                          L60 171
                          L88 145
                          L112 153
                          L138 128
                          L165 137
                          L195 105
                          L220 116
                          L250 92
                          L278 103
                          L305 75
                          L335 88
                          L360 66
                          L390 82
                          L420 58
                          L450 70
                          L475 45
                          L505 59
                          L530 35
                          L560 47
                          L600 20
                          L600 220
                          L0 220
                          Z
                        "
                        fill="url(#chartFill)"
                      />

                      <path
                        d="
                          M0 175
                          L35 165
                          L60 171
                          L88 145
                          L112 153
                          L138 128
                          L165 137
                          L195 105
                          L220 116
                          L250 92
                          L278 103
                          L305 75
                          L335 88
                          L360 66
                          L390 82
                          L420 58
                          L450 70
                          L475 45
                          L505 59
                          L530 35
                          L560 47
                          L600 20
                        "
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="2.5"
                      />

                      <circle
                        cx="600"
                        cy="20"
                        r="5"
                        fill="#34d399"
                      />

                    </svg>

                    <div className="absolute left-3 top-3 font-mono text-[8px] text-slate-600">
                      XAUUSD · 1H
                    </div>

                    <div
                      className={`
                        absolute
                        bottom-3
                        right-3
                        font-mono
                        text-[8px]
                        ${
                          gold.up
                            ? "text-emerald-400"
                            : "text-rose-400"
                        }
                      `}
                    >
                      {gold.up ? "▲" : "▼"} {gold.change}
                    </div>

                  </div>

                </div>

                {/* =================================================
                    AI PANEL
                ================================================= */}

                <div className="p-5">

                  <div className="mb-4 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <div
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-md
                          border
                          border-emerald-400/20
                          bg-emerald-400/10
                          text-sm
                          text-emerald-400
                        "
                      >
                        ✦
                      </div>

                      <div>

                        <div className="text-[10px] font-black text-white">
                          AI MARKET ANALYSIS
                        </div>

                        <div className="text-[8px] text-slate-600">
                          JENZ INTELLIGENCE
                        </div>

                      </div>

                    </div>

                    <span
                      className="
                        rounded
                        bg-emerald-400/10
                        px-2
                        py-1
                        font-mono
                        text-[8px]
                        font-bold
                        text-emerald-400
                      "
                    >
                      84% CONFIDENCE
                    </span>

                  </div>

                  <div className="grid grid-cols-2 gap-2">

                    <AnalysisItem
                      label="TREND"
                      value="STRONG ↑"
                      positive
                    />

                    <AnalysisItem
                      label="MOMENTUM"
                      value="POSITIVE"
                      positive
                    />

                    <AnalysisItem
                      label="SUPPORT"
                      value="3,380.00"
                    />

                    <AnalysisItem
                      label="RESISTANCE"
                      value="3,425.00"
                    />

                  </div>

                  <Link
                    to="/ai-analysis"
                    className="
                      mt-3
                      flex
                      w-full
                      items-center
                      justify-center
                      rounded-md
                      border
                      border-[#26303e]
                      bg-[#0c1119]
                      py-2.5
                      text-[9px]
                      font-black
                      tracking-wider
                      text-slate-300
                      transition
                      hover:border-emerald-400/30
                      hover:text-emerald-400
                    "
                  >
                    VIEW FULL AI ANALYSIS →
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          MARKET OVERVIEW
      ========================================================= */}

      <section
        className="
          relative
          z-10
          border-y
          border-[#151d28]
          bg-[#06080d]/80
        "
      >

        <div className="mx-auto max-w-[1800px] px-5 py-12 sm:px-8 lg:px-12">

          <div className="mb-6 flex items-end justify-between">

            <div>

              <div
                className="
                  mb-2
                  font-mono
                  text-[9px]
                  font-bold
                  tracking-[0.2em]
                  text-emerald-400
                "
              >
                MARKET DATA
              </div>

              <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                Market Overview
              </h2>

            </div>

            <Link
              to="/markets"
              className="
                hidden
                text-[10px]
                font-bold
                text-slate-500
                transition
                hover:text-emerald-400
                sm:block
              "
            >
              VIEW ALL MARKETS →
            </Link>

          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">

            {MARKETS.map((market) => {

              const isGold = market.symbol === "XAU/USD";
              const isEur = market.symbol === "EUR/USD";
              const isGbp = market.symbol === "GBP/USD";

              const liveData = isGold
                ? gold
                : isEur
                ? eur
                : isGbp
                ? gbp
                : null;

              return (
                <div
                  key={market.symbol}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-xl
                    border
                    border-[#1a2330]
                    bg-[#090d13]
                    p-4
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-emerald-400/25
                    hover:bg-[#0b1017]
                  "
                >

                  {/* GOLD GLOW */}

                  {isGold && (
                    <div
                      className="
                        absolute
                        right-0
                        top-0
                        h-20
                        w-20
                        rounded-full
                        bg-emerald-400/[0.05]
                        blur-2xl
                      "
                    />
                  )}

                  <div className="relative flex items-start justify-between">

                    <div>

                      <div className="font-mono text-[11px] font-bold text-slate-300">
                        {market.symbol}
                      </div>

                      <div className="mt-1 text-[8px] uppercase tracking-wider text-slate-600">
                        {market.name}
                      </div>

                    </div>

                    {market.live && (
                      <span
                        className="
                          flex
                          items-center
                          gap-1
                          text-[7px]
                          font-bold
                          text-emerald-400
                        "
                      >

                        <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />

                        LIVE

                      </span>
                    )}

                  </div>

                  {/* PRICE */}

                  <div className="relative mt-7 flex items-end justify-between">

                    <div className="font-mono text-lg font-bold text-white">

                      {liveData
                        ? liveData.price
                        : market.price}

                    </div>

                    {/* CHANGE */}

                    <div
                      className={`
                        font-mono
                        text-[10px]
                        font-bold
                        ${
                          liveData
                            ? liveData.up
                              ? "text-emerald-400"
                              : "text-rose-400"
                            : market.up
                            ? "text-emerald-400"
                            : "text-rose-400"
                        }
                      `}
                    >

                      {liveData
                        ? `${liveData.up ? "▲" : "▼"} ${liveData.change}`
                        : `${market.up ? "▲" : "▼"} ${market.change}`}

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* =========================================================
          FEATURES
      ========================================================= */}

      <section className="relative z-10">

        <div className="mx-auto max-w-[1800px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">

          <div className="max-w-2xl">

            <div
              className="
                mb-3
                font-mono
                text-[9px]
                font-bold
                tracking-[0.2em]
                text-emerald-400
              "
            >
              BUILT FOR TRADERS
            </div>

            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">

              Everything you need.

              <br />

              <span className="text-slate-500">
                One intelligent workspace.
              </span>

            </h2>

          </div>

          <div
            className="
              mt-12
              grid
              gap-px
              overflow-hidden
              rounded-2xl
              border
              border-[#1a2330]
              bg-[#1a2330]
              md:grid-cols-3
            "
          >

            {FEATURES.map((feature) => (
              <FeatureCard
                key={feature.number}
                {...feature}
              />
            ))}

          </div>

        </div>

      </section>

      {/* =========================================================
          AI SECTION
      ========================================================= */}

      <section
        className="
          relative
          z-10
          border-y
          border-[#151d28]
          bg-[#070a10]
        "
      >

        <div className="mx-auto max-w-[1800px] px-5 py-20 sm:px-8 lg:px-12">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div>

              <div
                className="
                  mb-4
                  inline-flex
                  items-center
                  gap-2
                  rounded
                  border
                  border-emerald-400/20
                  bg-emerald-400/[0.05]
                  px-2.5
                  py-1
                  font-mono
                  text-[8px]
                  font-bold
                  tracking-wider
                  text-emerald-400
                "
              >

                <span>✦</span>

                JENZ INTELLIGENCE

              </div>

              <h2 className="text-3xl font-black tracking-tight sm:text-5xl">

                AI that helps you

                <br />

                <span className="text-slate-500">
                  understand the market.
                </span>

              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500">

                Instead of staring at charts for hours, let JENZ.AI organize
                market signals into simple insights you can understand and
                evaluate.

              </p>

              <Link
                to="/ai-analysis"
                className="
                  mt-7
                  inline-flex
                  items-center
                  gap-3
                  rounded-lg
                  border
                  border-emerald-400/30
                  bg-emerald-400/[0.07]
                  px-5
                  py-3
                  text-[10px]
                  font-black
                  tracking-wider
                  text-emerald-400
                  transition
                  hover:bg-emerald-400
                  hover:text-black
                "
              >

                EXPLORE AI ANALYSIS

                <span>→</span>

              </Link>

            </div>

            {/* AI TERMINAL */}

            <div
              className="
                rounded-2xl
                border
                border-[#202a38]
                bg-[#090d13]
                p-5
                shadow-2xl
              "
            >

              <div className="mb-5 flex items-center justify-between">

                <div className="font-mono text-[9px] font-bold text-slate-500">
                  AI_SIGNAL_ENGINE
                </div>

                <div className="flex items-center gap-1.5 text-[8px] text-emerald-400">

                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

                  PROCESSING

                </div>

              </div>

              <div className="space-y-2">

                <SignalRow
                  pair="XAU/USD"
                  signal="BULLISH"
                  confidence="84%"
                  positive
                />

                <SignalRow
                  pair="EUR/USD"
                  signal="BULLISH"
                  confidence="71%"
                  positive
                />

                <SignalRow
                  pair="GBP/USD"
                  signal="NEUTRAL"
                  confidence="56%"
                />

                <SignalRow
                  pair="BTC/USD"
                  signal="STRONG BUY"
                  confidence="91%"
                  positive
                />

              </div>

              <div
                className="
                  mt-5
                  rounded-lg
                  border
                  border-[#18202c]
                  bg-[#05070b]
                  p-4
                "
              >

                <div
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-wider
                    text-slate-600
                  "
                >
                  AI SUMMARY
                </div>

                <p className="mt-2 text-xs leading-6 text-slate-400">

                  Market momentum remains positive. Gold is showing strong
                  bullish structure while BTC continues to demonstrate
                  elevated momentum.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          CTA
      ========================================================= */}

      <section className="relative z-10">

        <div
          className="
            mx-auto
            max-w-[1800px]
            px-5
            py-24
            text-center
            sm:px-8
            lg:px-12
          "
        >

          <div className="mx-auto max-w-3xl">

            <div
              className="
                mb-5
                font-mono
                text-[9px]
                font-bold
                tracking-[0.25em]
                text-emerald-400
              "
            >
              START YOUR NEXT TRADE WITH BETTER INFORMATION
            </div>

            <h2
              className="
                text-4xl
                font-black
                tracking-[-0.035em]
                sm:text-6xl
              "
            >

              Trade with

              <span className="text-emerald-400">
                {" "}intelligence.
              </span>

            </h2>

            <p
              className="
                mx-auto
                mt-5
                max-w-xl
                text-sm
                leading-7
                text-slate-500
              "
            >

              Explore the markets, analyze opportunities and build your
              trading workflow with JENZ.AI.

            </p>

            <div className="mt-8 flex justify-center gap-3">

              <Link
                to="/markets"
                className="
                  rounded-lg
                  bg-emerald-400
                  px-6
                  py-3
                  text-[10px]
                  font-black
                  tracking-wider
                  text-black
                  transition
                  hover:bg-emerald-300
                  hover:shadow-[0_0_30px_rgba(52,211,153,.25)]
                "
              >
                GET STARTED →
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer
        className="
          relative
          z-10
          border-t
          border-[#151d28]
          bg-[#040609]
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-[1800px]
            flex-col
            gap-5
            px-5
            py-7
            sm:px-8
            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:px-12
          "
        >

          <div>

            <div className="text-sm font-black tracking-wider">

              JENZ<span className="text-emerald-400">
                .AI
              </span>

            </div>

            <div
              className="
                mt-1
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-slate-600
              "
            >
              AI TRADING INTELLIGENCE
            </div>

          </div>

          <div
            className="
              flex
              flex-wrap
              gap-5
              text-[9px]
              font-bold
              text-slate-600
            "
          >

            <Link
              className="transition hover:text-emerald-400"
              to="/markets"
            >
              MARKETS
            </Link>

            <Link
              className="transition hover:text-emerald-400"
              to="/trading-tools"
            >
              TOOLS
            </Link>

            <Link
              className="transition hover:text-emerald-400"
              to="/ai-analysis"
            >
              AI ANALYSIS
            </Link>

            <Link
              className="transition hover:text-emerald-400"
              to="/learn"
            >
              LEARN
            </Link>

            <Link
              className="transition hover:text-emerald-400"
              to="/news"
            >
              NEWS
            </Link>

          </div>

          <div className="font-mono text-[8px] text-slate-700">
            © 2026 JENZ.AI
          </div>

        </div>

      </footer>

    </main>
  );
}

/* =========================================================
   HERO STAT
========================================================= */

function HeroStat({ value, label }) {
  return (
    <div>

      <div className="font-mono text-sm font-black text-slate-200">
        {value}
      </div>

      <div
        className="
          mt-1
          text-[7px]
          font-bold
          tracking-[0.18em]
          text-slate-600
        "
      >
        {label}
      </div>

    </div>
  );
}

/* =========================================================
   ANALYSIS ITEM
========================================================= */

function AnalysisItem({
  label,
  value,
  positive,
}) {
  return (
    <div
      className="
        rounded-md
        border
        border-[#18202c]
        bg-[#05070b]
        p-3
      "
    >

      <div
        className="
          text-[7px]
          font-bold
          tracking-wider
          text-slate-600
        "
      >
        {label}
      </div>

      <div
        className={`
          mt-1.5
          font-mono
          text-[10px]
          font-bold
          ${
            positive
              ? "text-emerald-400"
              : "text-slate-300"
          }
        `}
      >
        {value}
      </div>

    </div>
  );
}

/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({
  number,
  title,
  description,
  icon,
}) {
  return (
    <div
      className="
        group
        bg-[#080b11]
        p-7
        transition
        hover:bg-[#0b1017]
        sm:p-9
      "
    >

      <div className="flex items-start justify-between">

        <span className="font-mono text-[9px] font-bold text-slate-700">
          {number}
        </span>

        <span
          className="
            text-xl
            text-emerald-400
            transition-transform
            duration-200
            group-hover:-translate-y-1
            group-hover:translate-x-1
          "
        >
          {icon}
        </span>

      </div>

      <h3 className="mt-12 text-lg font-black">
        {title}
      </h3>

      <p className="mt-3 max-w-sm text-xs leading-6 text-slate-500">
        {description}
      </p>

      <div
        className="
          mt-7
          h-px
          w-8
          bg-emerald-400/40
          transition-all
          group-hover:w-16
        "
      />

    </div>
  );
}

/* =========================================================
   SIGNAL ROW
========================================================= */

function SignalRow({
  pair,
  signal,
  confidence,
  positive,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-lg
        border
        border-[#18202c]
        bg-[#070a0f]
        px-4
        py-3
      "
    >

      <div className="flex items-center gap-3">

        <span
          className={`
            h-1.5
            w-1.5
            rounded-full
            ${
              positive
                ? "bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,.6)]"
                : "bg-slate-600"
            }
          `}
        />

        <span className="font-mono text-[10px] font-bold text-slate-300">
          {pair}
        </span>

      </div>

      <div className="flex items-center gap-5">

        <span
          className={`
            font-mono
            text-[8px]
            font-bold
            ${
              positive
                ? "text-emerald-400"
                : "text-slate-500"
            }
          `}
        >
          {signal}
        </span>

        <span className="w-9 text-right font-mono text-[8px] text-slate-600">
          {confidence}
        </span>

      </div>

    </div>
  );
}