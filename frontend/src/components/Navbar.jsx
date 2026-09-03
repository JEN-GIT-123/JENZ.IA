import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import { useGoldPrice } from "../hooks/useGoldPrice";
import { useEurPrice } from "../hooks/useEurPrice";
import { useGbpPrice } from "../hooks/useGbpPrice";

const SESSIONS = [
  {
    name: "LON",
    timezone: "Europe/London",
    open: 8,
    close: 17,
    icon: "🇬🇧",
  },
  {
    name: "NYC",
    timezone: "America/New_York",
    open: 8,
    close: 17,
    icon: "🇺🇸",
  },
  {
    name: "TYO",
    timezone: "Asia/Tokyo",
    open: 9,
    close: 18,
    icon: "🇯🇵",
  },
];

export default function TerminalNavbar() {
  const [now, setNow] = useState(new Date());

  // ================================
  // LIVE MARKET DATA
  // ================================
  const gold = useGoldPrice("3,400.20");
  const eur = useEurPrice("1.17000");
  const gbp = useGbpPrice("1.35000");

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Market ticker data
  const markets = [
    {
      symbol: "XAU/USD",
      price: gold.price,
      change: gold.change,
      up: gold.up,
      isLive: true,
    },
    {
      symbol: "EUR/USD",
      price: eur.price,
      change: eur.change,
      up: eur.up,
      isLive: true,
    },
    {
      symbol: "GBP/USD",
      price: gbp.price,
      change: gbp.change,
      up: gbp.up,
      isLive: true,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full select-none border-b border-[#18202c] bg-[#07090e]/95 text-slate-200 shadow-xl backdrop-blur-md">

      {/* =========================================================
          TOP MARKET TICKER
      ========================================================= */}
      <div className="h-[34px] w-full overflow-hidden border-b border-[#131a24] bg-[#040508]">

        {/* TICKER VIEWPORT */}
        <div className="relative h-full overflow-hidden">

          {/* TICKER TRACK
              LEFT → RIGHT
          */}
          <div className="ticker-track absolute left-0 top-0 flex h-full items-center">

            {/* FIRST SET */}
            <div className="flex h-full items-center divide-x divide-[#161e2b]">

              {markets.map((market) => (
                <Ticker
                  key={`first-${market.symbol}`}
                  symbol={market.symbol}
                  price={market.price}
                  change={market.change}
                  up={market.up}
                  isLive={market.isLive}
                />
              ))}

            </div>

            {/* SECOND SET
                Duplicate for seamless animation
            */}
            <div className="flex h-full items-center divide-x divide-[#161e2b]">

              {markets.map((market) => (
                <Ticker
                  key={`second-${market.symbol}`}
                  symbol={market.symbol}
                  price={market.price}
                  change={market.change}
                  up={market.up}
                  isLive={market.isLive}
                />
              ))}

            </div>

            {/* THIRD SET
                Helps prevent empty space
            */}
            <div className="flex h-full items-center divide-x divide-[#161e2b]">

              {markets.map((market) => (
                <Ticker
                  key={`third-${market.symbol}`}
                  symbol={market.symbol}
                  price={market.price}
                  change={market.change}
                  up={market.up}
                  isLive={market.isLive}
                />
              ))}

            </div>

          </div>
        </div>
      </div>

      {/* =========================================================
          MARKET TICKER CSS
      ========================================================= */}
      <style>{`
        .ticker-track {
          width: max-content;
          animation: jenzTickerLeftToRight 24s linear infinite;
          will-change: transform;
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }

        @keyframes jenzTickerLeftToRight {
          0% {
            transform: translateX(-33.333%);
          }

          100% {
            transform: translateX(0%);
          }
        }
      `}</style>

      {/* =========================================================
          MAIN NAVBAR
      ========================================================= */}
      <div className="mx-auto flex h-[58px] max-w-[1800px] items-center justify-between px-4">

        {/* BRAND + NAVIGATION */}
        <div className="flex min-w-0 items-center gap-5">

          {/* LOGO */}
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-2.5"
          >
            <div
              className="
                flex h-9 w-9 items-center justify-center
                rounded-lg
                border border-emerald-400/40
                bg-emerald-400/10
                text-xl font-black italic
                text-emerald-400
                shadow-[0_0_15px_rgba(52,211,153,0.12)]
                transition-all duration-200
                group-hover:bg-emerald-400
                group-hover:text-black
                group-hover:shadow-[0_0_20px_rgba(52,211,153,0.35)]
              "
            >
              J
            </div>

            <div className="flex flex-col">

              <span className="text-[15px] font-black leading-none tracking-[0.08em] text-white">
                JENZ<span className="text-emerald-400">.AI</span>
              </span>

              <span className="mt-1 text-[7px] font-bold uppercase tracking-[0.28em] text-slate-500">
                AI TRADING INTELLIGENCE
              </span>

            </div>
          </Link>

          {/* NAV LINKS */}
          <nav className="hidden items-center gap-1 border-l border-[#19222f] pl-4 xl:flex">

            <NavItem
              to="/"
              text="Home"
            />

            <NavItem
              to="/markets"
              text="Markets"
            />

            <NavItem
              to="/trading-tools"
              text="Trading Tools"
            />

            <NavItem
              to="/ai-analysis"
              text="AI Analysis"
              badge="AI"
            />

            <NavItem
              to="/learn"
              text="Learn"
            />

            <NavItem
              to="/news"
              text="News"
              badge="HOT"
            />

          </nav>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* AI STATUS */}
          <div
            className="
              hidden items-center gap-2
              rounded-full
              border border-emerald-500/25
              bg-emerald-500/5
              px-3 py-1.5
              text-[9px]
              font-bold
              tracking-wider
              text-emerald-400
              sm:flex
            "
          >
            <span className="relative flex h-1.5 w-1.5">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />

              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />

            </span>

            AI ONLINE
          </div>

          {/* LOCAL CLOCK */}
          <div className="hidden border-r border-[#19222f] pr-4 text-right font-mono leading-tight md:block">

            <div className="text-xs font-bold text-slate-200">
              {formatTime(now)}
            </div>

            <div className="mt-0.5 text-[7px] uppercase tracking-[0.2em] text-slate-500">
              LOCAL TIME
            </div>

          </div>

          {/* LOGIN */}
          <Link
            to="/login"
            className="
              rounded-md
              border border-emerald-400
              bg-emerald-400
              px-4 py-2
              text-[11px]
              font-black
              tracking-wide
              text-black
              transition-all
              duration-200
              hover:bg-emerald-300
              hover:shadow-[0_0_20px_rgba(52,211,153,0.35)]
            "
          >
            LOGIN
          </Link>

        </div>
      </div>

      {/* =========================================================
          MOBILE NAVIGATION
      ========================================================= */}
      <div className="flex overflow-x-auto border-t border-[#131a24] bg-[#05070b] px-3 py-1.5 no-scrollbar xl:hidden">

        <MobileNavItem
          to="/"
          text="Home"
        />

        <MobileNavItem
          to="/markets"
          text="Markets"
        />

        <MobileNavItem
          to="/trading-tools"
          text="Tools"
        />

        <MobileNavItem
          to="/ai-analysis"
          text="AI"
        />

        <MobileNavItem
          to="/learn"
          text="Learn"
        />

        <MobileNavItem
          to="/news"
          text="News"
        />

      </div>

    </header>
  );
}

/* =========================================================
   DESKTOP NAV ITEM
========================================================= */

function NavItem({ to, text, badge }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        group relative flex items-center gap-1.5
        rounded-md
        px-3 py-2
        text-xs
        font-bold
        transition-all
        duration-150

        ${
          isActive
            ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            : "border border-transparent text-slate-400 hover:bg-[#111722] hover:text-white"
        }
        `
      }
    >
      {text}

      {badge && (
        <span
          className={`
            rounded px-1 py-0.5
            text-[6px]
            font-black

            ${
              badge === "AI"
                ? "bg-emerald-400/15 text-emerald-400"
                : "bg-rose-500/15 text-rose-400"
            }
          `}
        >
          {badge}
        </span>
      )}
    </NavLink>
  );
}

/* =========================================================
   MOBILE NAV ITEM
========================================================= */

function MobileNavItem({ to, text }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        mr-1 shrink-0
        rounded-md
        px-3 py-1.5
        text-[10px]
        font-bold
        transition

        ${
          isActive
            ? "bg-emerald-400/10 text-emerald-400"
            : "text-slate-500 hover:text-white"
        }
        `
      }
    >
      {text}
    </NavLink>
  );
}

/* =========================================================
   MARKET TICKER
========================================================= */

function Ticker({
  symbol,
  price,
  change,
  up,
  isLive,
}) {
  return (
    <div className="flex h-full items-center gap-2.5 px-4 py-1 font-mono">

      <div className="flex items-center gap-1.5">

        {isLive && (
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
        )}

        <span className="text-[10px] font-bold text-slate-400">
          {symbol}
        </span>

      </div>

      <span className="text-xs font-semibold text-slate-100">
        {price}
      </span>

      <span
        className={`text-[10px] font-bold ${
          up
            ? "text-emerald-400"
            : "text-rose-500"
        }`}
      >
        {up ? "▲" : "▼"} {change}
      </span>

    </div>
  );
}

/* =========================================================
   MARKET SESSION STATUS
========================================================= */

function getSessionStatus(session, now) {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: session.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);

  let [hour, minute] = time
    .split(":")
    .map(Number);

  if (hour === 24) {
    hour = 0;
  }

  const current = hour * 60 + minute;

  const open = session.open * 60;
  const close = session.close * 60;

  return {
    open: current >= open && current < close,
  };
}

/* =========================================================
   CLOCK
========================================================= */

function formatTime(date, timezone) {
  return new Intl.DateTimeFormat("en-GB", {
    ...(timezone
      ? { timeZone: timezone }
      : {}),
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}