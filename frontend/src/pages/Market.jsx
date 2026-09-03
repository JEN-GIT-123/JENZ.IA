import React, { useState, useEffect } from "react";
import { Clock, Globe, RefreshCw, ShieldAlert, ChevronRight } from "lucide-react"; // Adjust or use lucide-react standard icons

import {
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Search as SearchIcon,
  TrendingUp as TrendUpIcon,
  TrendingDown as TrendDownIcon,
  Activity as ActivityIcon,
  BarChart2 as ChartIcon,
  Sliders as SlidersIcon,
  Maximize2 as MaximizeIcon,
  Cpu as CpuIcon,
  Clock as ClockIcon,
  Globe as GlobeIcon,
  RefreshCw as RefreshIcon,
  ShieldAlert as AlertIcon,
} from "lucide-react";

// Initial Market Data Store
const INITIAL_WATCHLIST = [
  { symbol: "XAU/USD", name: "Gold Spot / US Dollar", price: 3400.20, change: 0.84, category: "GOLD", high: 3425.60, low: 3365.20, bid: 3400.10, ask: 3400.30 },
  { symbol: "EUR/USD", name: "Euro / US Dollar", price: 1.1718, change: 0.18, category: "FOREX", high: 1.1745, low: 1.1690, bid: 1.1717, ask: 1.1719 },
  { symbol: "GBP/USD", name: "British Pound / USD", price: 1.2615, change: -0.05, category: "FOREX", high: 1.2680, low: 1.2590, bid: 1.2614, ask: 1.2616 },
  { symbol: "USD/JPY", name: "US Dollar / Japanese Yen", price: 147.82, change: -0.21, category: "FOREX", high: 148.40, low: 147.30, bid: 147.81, ask: 147.83 },
  { symbol: "BTC/USD", name: "Bitcoin / US Dollar", price: 118540.0, change: 2.45, category: "CRYPTO", high: 121000.0, low: 115200.0, bid: 118535.0, ask: 118545.0 },
  { symbol: "NAS100", name: "Nasdaq 100 Index", price: 23840.20, change: 0.72, category: "INDICES", high: 24010.0, low: 23720.0, bid: 23839.0, ask: 23841.4 },
];

const CATEGORIES = ["ALL", "FOREX", "GOLD", "INDICES", "CRYPTO", "COMMODITIES"];
const TIMEFRAMES = ["1M", "5M", "15M", "30M", "1H", "4H", "1D"];

const SESSIONS = [
  { name: "TOKYO", timezone: "Asia/Tokyo", openHour: 9, closeHour: 18, flag: "🇯🇵" },
  { name: "LONDON", timezone: "Europe/London", openHour: 8, closeHour: 17, flag: "🇬🇧" },
  { name: "NEW YORK", timezone: "America/New_York", openHour: 8, closeHour: 17, flag: "🇺🇸" },
];

export default function JenzMarketTerminal() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [watchlist, setWatchlist] = useState(INITIAL_WATCHLIST);
  const [activeSymbol, setActiveSymbol] = useState(INITIAL_WATCHLIST[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeframe, setTimeframe] = useState("15M");
  const [isLocked, setIsLocked] = useState(false);
  const [now, setNow] = useState(new Date());

  // AI State
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiMetrics, setAiMetrics] = useState({
    bias: "BULLISH",
    confidence: 82,
    trend: "STRONG",
    momentum: "POSITIVE",
    volatility: "MEDIUM",
    structure: "HIGHER HIGH",
    support: (INITIAL_WATCHLIST[0].price * 0.9955).toFixed(2),
    resistance: (INITIAL_WATCHLIST[0].price * 1.0058).toFixed(2),
  });

  // Clock Ticker
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Live Price Simulation Stream
  useEffect(() => {
    const stream = setInterval(() => {
      setWatchlist((prev) =>
        prev.map((item) => {
          const delta = (Math.random() - 0.495) * (item.price * 0.0008);
          const newPrice = Math.max(0.0001, item.price + delta);
          const newChange = item.change + (delta > 0 ? 0.01 : -0.01);

          if (item.symbol === activeSymbol.symbol) {
            setActiveSymbol((prevActive) => ({
              ...prevActive,
              price: newPrice,
              change: newChange,
              bid: newPrice - item.price * 0.00005,
              ask: newPrice + item.price * 0.00005,
            }));
          }

          return { ...item, price: newPrice, change: newChange };
        })
      );
    }, 1800);

    return () => clearInterval(stream);
  }, [activeSymbol.symbol]);

  const runAiAnalysis = () => {
    setAiAnalyzing(true);
    setTimeout(() => {
      const isUp = activeSymbol.change >= 0;
      setAiMetrics({
        bias: isUp ? "BULLISH" : "BEARISH",
        confidence: Math.floor(75 + Math.random() * 20),
        trend: isUp ? "STRONG UP" : "DOWNWARD",
        momentum: isUp ? "POSITIVE" : "NEGATIVE",
        volatility: Math.random() > 0.5 ? "MEDIUM" : "HIGH",
        structure: isUp ? "HIGHER HIGH" : "LOWER LOW",
        support: (activeSymbol.price * 0.994).toFixed(activeSymbol.price > 100 ? 2 : 4),
        resistance: (activeSymbol.price * 1.006).toFixed(activeSymbol.price > 100 ? 2 : 4),
      });
      setAiAnalyzing(false);
    }, 1200);
  };

  const filteredWatchlist = watchlist.filter((item) => {
    const matchesCategory = selectedCategory === "ALL" || item.category === selectedCategory;
    const matchesSearch = item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#05070A] text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-black p-3 md:p-6 space-y-4">
      {/* 1. HEADER BAR */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0B0F13] border border-[#202830] rounded-lg p-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black tracking-wider text-white">MARKETS</h1>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              PRO TERMINAL
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Real-time market intelligence powered by JENZ.AI</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#05070A] border border-[#202830] text-xs font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400 font-bold">LIVE DATA</span>
            <span className="text-slate-600">|</span>
            <ClockIcon className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-emerald-400 font-bold">{formatTimeUTC(now)} UTC</span>
          </div>

          <div className="relative flex-1 sm:w-64">
            <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#05070A] border border-[#202830] rounded pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </header>

      {/* 2. CATEGORY SELECTOR TABS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded text-xs font-bold font-mono transition duration-150 whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-emerald-500 text-black shadow-[0_0_12px_rgba(52,211,153,0.3)]"
                : "bg-[#0B0F13] text-slate-400 hover:bg-[#121820] hover:text-slate-200 border border-[#202830]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. MAIN TERMINAL LAYOUT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT: WATCHLIST (3 COLS) */}
        <div className="lg:col-span-3 bg-[#0B0F13] border border-[#202830] rounded-lg p-3 flex flex-col h-[680px]">
          <div className="flex items-center justify-between mb-3 px-2 border-b border-[#202830] pb-2 text-xs text-slate-400 font-mono font-bold">
            <span>SYMBOL</span>
            <span>PRICE / CHG</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 font-mono">
            {filteredWatchlist.map((item) => {
              const isSelected = item.symbol === activeSymbol.symbol;
              const isUp = item.change >= 0;
              return (
                <div
                  key={item.symbol}
                  onClick={() => setActiveSymbol(item)}
                  className={`flex items-center justify-between p-2.5 rounded cursor-pointer transition border ${
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500/40 text-white"
                      : "bg-[#070A0E] border-transparent hover:border-[#202830] text-slate-300"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{item.symbol}</span>
                      <span className={`text-[9px] px-1 rounded ${isUp ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                        {isUp ? "🟢" : "🔴"}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate max-w-[110px]">{item.name}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-100">{formatPrice(item.price)}</div>
                    <div className={`text-[10px] font-bold ${isUp ? "text-emerald-400" : "text-rose-400"}`}>
                      {isUp ? "+" : ""}{item.change.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CENTER: CHART & WORKSPACE (6 COLS) */}
        <div className="lg:col-span-6 bg-[#0B0F13] border border-[#202830] rounded-lg p-4 flex flex-col justify-between h-[680px]">
          {/* Chart Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#202830] pb-3">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black tracking-tight text-white">{activeSymbol.symbol}</h2>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {activeSymbol.name}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 font-mono">
                <span className="text-xl font-bold text-slate-100">{formatPrice(activeSymbol.price)}</span>
                <span className={`text-xs font-bold ${activeSymbol.change >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {activeSymbol.change >= 0 ? "▲ +" : "▼ "}{activeSymbol.change.toFixed(2)}%
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                  BULLISH
                </span>
              </div>
            </div>

            {/* Lock Control & Timeframes */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLocked(!isLocked)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold border transition ${
                  isLocked
                    ? "bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.2)]"
                    : "bg-[#05070A] text-slate-300 border-[#202830] hover:border-slate-600"
                }`}
              >
                {isLocked ? <LockIcon className="w-3.5 h-3.5" /> : <UnlockIcon className="w-3.5 h-3.5" />}
                {isLocked ? "CHART LOCKED" : "LOCK CHART"}
              </button>
            </div>
          </div>

          {/* Timeframe Bar & Toolbar */}
          <div className="flex items-center justify-between my-2 font-mono text-xs">
            <div className={`flex items-center gap-1 ${isLocked ? "opacity-40 pointer-events-none" : ""}`}>
              {TIMEFRAMES.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded font-bold transition ${
                    timeframe === tf ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            <div className={`flex items-center gap-2 text-slate-400 ${isLocked ? "opacity-40 pointer-events-none" : ""}`}>
              <button className="p-1 hover:text-white" title="Indicators"><ChartIcon className="w-4 h-4" /></button>
              <button className="p-1 hover:text-white" title="Tools"><SlidersIcon className="w-4 h-4" /></button>
              <button className="p-1 hover:text-white" title="Fullscreen"><MaximizeIcon className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Dynamic Candlestick Chart Area */}
          <div className="relative flex-1 bg-[#05070A] border border-[#18202A] rounded-md overflow-hidden p-2 flex flex-col justify-between">
            {isLocked && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-10 flex items-center justify-center pointer-events-none">
                <div className="flex items-center gap-2 bg-[#0B0F13] px-4 py-2 rounded-full border border-rose-500/30 text-rose-400 font-mono text-xs font-bold">
                  <LockIcon className="w-4 h-4" /> CHART INTERACTION LOCKED
                </div>
              </div>
            )}
            
            <SimulatedCandlestickSvg basePrice={activeSymbol.price} />

            {/* Simulated Data Disclaimer */}
            <div className="text-[9px] font-mono text-slate-600 text-right mt-1">
              DEMO FEED • REAL-TIME WEBSOCKET SIMULATION
            </div>
          </div>
        </div>

        {/* RIGHT: AI ANALYSIS & ORDER PANEL (3 COLS) */}
        <div className="lg:col-span-3 space-y-4">
          {/* AI Panel */}
          <div className="bg-[#0B0F13] border border-[#202830] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#202830] pb-2">
              <div className="flex items-center gap-2">
                <CpuIcon className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-xs tracking-wider text-white">JENZ.AI ANALYSIS</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500">{activeSymbol.symbol}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-[#05070A] p-2 rounded border border-[#18202A]">
                <div className="text-[10px] text-slate-500">AI BIAS</div>
                <div className="font-bold text-emerald-400">{aiMetrics.bias}</div>
              </div>
              <div className="bg-[#05070A] p-2 rounded border border-[#18202A]">
                <div className="text-[10px] text-slate-500">CONFIDENCE</div>
                <div className="font-bold text-slate-100">{aiMetrics.confidence}%</div>
              </div>
              <div className="bg-[#05070A] p-2 rounded border border-[#18202A]">
                <div className="text-[10px] text-slate-500">STRUCTURE</div>
                <div className="font-bold text-slate-200">{aiMetrics.structure}</div>
              </div>
              <div className="bg-[#05070A] p-2 rounded border border-[#18202A]">
                <div className="text-[10px] text-slate-500">VOLATILITY</div>
                <div className="font-bold text-amber-400">{aiMetrics.volatility}</div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 leading-relaxed bg-[#05070A] p-2.5 rounded border border-[#18202A]">
              "{activeSymbol.symbol} displays robust market structure with sustained momentum. Key resistance at{" "}
              <strong className="text-slate-200">{aiMetrics.resistance}</strong> and support around{" "}
              <strong className="text-slate-200">{aiMetrics.support}</strong>."
            </div>

            <button
              onClick={runAiAnalysis}
              disabled={aiAnalyzing}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded py-2 text-xs font-mono font-bold transition"
            >
              <RefreshIcon className={`w-3.5 h-3.5 ${aiAnalyzing ? "animate-spin" : ""}`} />
              {aiAnalyzing ? "COMPUTING TELEMETRY..." : "RUN AI ANALYSIS"}
            </button>
          </div>

          {/* Trade Execution Panel */}
          <div className="bg-[#0B0F13] border border-[#202830] rounded-lg p-4 space-y-3 font-mono">
            <div className="flex justify-between items-center text-xs border-b border-[#202830] pb-2">
              <span className="font-bold text-white">ORDER PANEL</span>
              <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold">
                DEMO MODE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#05070A] p-2 rounded border border-[#18202A]">
                <div className="text-[10px] text-slate-500">BID</div>
                <div className="font-bold text-rose-400">{formatPrice(activeSymbol.bid || activeSymbol.price - 0.1)}</div>
              </div>
              <div className="bg-[#05070A] p-2 rounded border border-[#18202A]">
                <div className="text-[10px] text-slate-500">ASK</div>
                <div className="font-bold text-emerald-400">{formatPrice(activeSymbol.ask || activeSymbol.price + 0.1)}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded py-2.5 text-xs transition shadow-[0_0_12px_rgba(52,211,153,0.3)]">
                BUY (DEMO)
              </button>
              <button className="bg-rose-500 hover:bg-rose-400 text-black font-black rounded py-2.5 text-xs transition shadow-[0_0_12px_rgba(244,63,94,0.3)]">
                SELL (DEMO)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MARKET DEPTH & GLOBAL SESSIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Market Depth */}
        <div className="lg:col-span-4 bg-[#0B0F13] border border-[#202830] rounded-lg p-4 font-mono">
          <div className="flex justify-between items-center border-b border-[#202830] pb-2 mb-3">
            <span className="text-xs font-bold text-white">MARKET DEPTH (L2 SIMULATED)</span>
            <span className="text-[10px] text-slate-500">{activeSymbol.symbol}</span>
          </div>

          <div className="space-y-1 text-xs">
            {/* Ask / Sells */}
            <OrderBookRow price={(activeSymbol.price + 0.3).toFixed(2)} qty="18.2" type="sell" depth={65} />
            <OrderBookRow price={(activeSymbol.price + 0.15).toFixed(2)} qty="12.4" type="sell" depth={40} />
            
            <div className="py-1 border-y border-[#202830] text-center font-bold text-slate-200 my-1 bg-[#05070A]">
              SPREAD: 0.20 | LAST: {formatPrice(activeSymbol.price)}
            </div>

            {/* Bids / Buys */}
            <OrderBookRow price={(activeSymbol.price - 0.15).toFixed(2)} qty="20.1" type="buy" depth={75} />
            <OrderBookRow price={(activeSymbol.price - 0.3).toFixed(2)} qty="14.6" type="buy" depth={50} />
          </div>
        </div>

        {/* Global Sessions */}
        <div className="lg:col-span-8 bg-[#0B0F13] border border-[#202830] rounded-lg p-4">
          <div className="text-xs font-bold text-white mb-3 font-mono">GLOBAL TRADING SESSIONS</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SESSIONS.map((sess) => {
              const status = getSessionStatus(sess, now);
              return (
                <div key={sess.name} className="bg-[#05070A] border border-[#18202A] rounded p-3 font-mono">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-200">
                      {sess.flag} {sess.name}
                    </span>
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${status.isOpen ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-500"}`}>
                      {status.isOpen ? "OPEN" : "CLOSED"}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500">08:00 — 17:00 LOCAL</div>
                  <div className="text-[10px] text-emerald-400 font-bold mt-2">{status.statusText}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. NEWS & ECONOMIC CALENDAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Market News */}
        <div className="lg:col-span-6 bg-[#0B0F13] border border-[#202830] rounded-lg p-4">
          <div className="text-xs font-bold text-white mb-3 font-mono">LIVE MARKET NEWS</div>
          <div className="space-y-2 text-xs font-mono">
            <NewsCard title="Gold surges as treasury yields ease ahead of inflation data" category="FOREX" time="12m ago" impact="HIGH" />
            <NewsCard title="Federal Reserve signals cautious stance on rate trajectory" category="USD" time="28m ago" impact="HIGH" />
            <NewsCard title="Bitcoin maintains consolidation above key technical support" category="CRYPTO" time="42m ago" impact="MEDIUM" />
          </div>
        </div>

        {/* Economic Calendar */}
        <div className="lg:col-span-6 bg-[#0B0F13] border border-[#202830] rounded-lg p-4">
          <div className="text-xs font-bold text-white mb-3 font-mono">ECONOMIC CALENDAR</div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs text-slate-300">
              <thead>
                <tr className="border-b border-[#202830] text-slate-500 text-[10px]">
                  <th className="pb-2">TIME</th>
                  <th className="pb-2">CURR</th>
                  <th className="pb-2">EVENT</th>
                  <th className="pb-2 text-right">IMPACT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#151C25]">
                <tr>
                  <td className="py-2 text-slate-400">19:30</td>
                  <td className="font-bold text-white">USD</td>
                  <td>Non-Farm Employment Change</td>
                  <td className="text-right"><span className="text-[9px] bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded font-bold">HIGH</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-400">20:00</td>
                  <td className="font-bold text-white">USD</td>
                  <td>Fed Interest Rate Decision</td>
                  <td className="text-right"><span className="text-[9px] bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded font-bold">HIGH</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-400">21:00</td>
                  <td className="font-bold text-white">USD</td>
                  <td>ISM Manufacturing PMI</td>
                  <td className="text-right"><span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold">MEDIUM</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components & Formatting
function formatPrice(val) {
  if (val === undefined || val === null) return "0.00";
  return val > 1000
    ? val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : val.toFixed(4);
}

function formatTimeUTC(date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function getSessionStatus(session, now) {
  const timeStr = new Intl.DateTimeFormat("en-GB", {
    timeZone: session.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);

  const [h] = timeStr.split(":").map(Number);
  const isOpen = h >= session.openHour && h < session.closeHour;
  return {
    isOpen,
    statusText: isOpen ? "CLOSES IN 4H 20M" : "OPENS IN 2H 15M",
  };
}

function OrderBookRow({ price, qty, type, depth }) {
  const isSell = type === "sell";
  return (
    <div className="relative flex justify-between items-center px-2 py-1 rounded overflow-hidden">
      <div
        className={`absolute inset-y-0 ${isSell ? "right-0 bg-rose-500/10" : "left-0 bg-emerald-500/10"}`}
        style={{ width: `${depth}%` }}
      />
      <span className={`relative font-bold ${isSell ? "text-rose-400" : "text-emerald-400"}`}>{price}</span>
      <span className="relative text-slate-300">{qty}</span>
    </div>
  );
}

function NewsCard({ title, category, time, impact }) {
  return (
    <div className="bg-[#05070A] p-2.5 rounded border border-[#18202A] flex justify-between items-center gap-2">
      <div>
        <div className="text-slate-200 font-bold leading-tight">{title}</div>
        <div className="text-[10px] text-slate-500 mt-1">
          {category} • {time}
        </div>
      </div>
      <span
        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
          impact === "HIGH" ? "bg-rose-500/20 text-rose-400" : "bg-amber-500/20 text-amber-400"
        }`}
      >
        {impact}
      </span>
    </div>
  );
}

// Custom Candlestick SVG Rendering Engine
function SimulatedCandlestickSvg({ basePrice }) {
  const candles = Array.from({ length: 24 }).map((_, i) => {
    const seed = Math.sin(i * 1.5) * 12;
    const open = basePrice + seed;
    const close = open + (i % 2 === 0 ? 8 : -6);
    const high = Math.max(open, close) + 4;
    const low = Math.min(open, close) - 5;
    return { open, close, high, low };
  });

  return (
    <svg className="w-full h-full" viewBox="0 0 600 300" preserveAspectRatio="none">
      {/* Grid Lines */}
      <line x1="0" y1="75" x2="600" y2="75" stroke="#151C25" strokeDasharray="3 3" />
      <line x1="0" y1="150" x2="600" y2="150" stroke="#151C25" strokeDasharray="3 3" />
      <line x1="0" y1="225" x2="600" y2="225" stroke="#151C25" strokeDasharray="3 3" />

      {/* Support / Resistance */}
      <line x1="0" y1="50" x2="600" y2="50" stroke="#EF4444" strokeDasharray="4 4" strokeWidth="1" />
      <text x="10" y="45" fill="#EF4444" fontSize="10" fontFamily="monospace">RESISTANCE: 3,420.00</text>

      <line x1="0" y1="250" x2="600" y2="250" stroke="#10B981" strokeDasharray="4 4" strokeWidth="1" />
      <text x="10" y="245" fill="#10B981" fontSize="10" fontFamily="monospace">SUPPORT: 3,385.00</text>

      {/* EMA 200 Indicator Line */}
      <path d="M 0 180 Q 150 140, 300 160 T 600 120" fill="none" stroke="#F59E0B" strokeWidth="1.5" />

      {/* Candlesticks */}
      {candles.map((c, idx) => {
        const x = idx * 24 + 12;
        const isUp = c.close >= c.open;
        const color = isUp ? "#10B981" : "#EF4444";
        const yHigh = 150 - (c.high - basePrice) * 3;
        const yLow = 150 - (c.low - basePrice) * 3;
        const yOpen = 150 - (c.open - basePrice) * 3;
        const yClose = 150 - (c.close - basePrice) * 3;

        return (
          <g key={idx}>
            <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={color} strokeWidth="1.5" />
            <rect
              x={x - 4}
              y={Math.min(yOpen, yClose)}
              width="8"
              height={Math.max(2, Math.abs(yOpen - yClose))}
              fill={color}
              rx="1"
            />
          </g>
        );
      })}
    </svg>
  );
}