import { useEffect, useState } from "react";

// អាចចុះឈ្មោះយក API Key ឥតគិតថ្លៃពី Finnhub.io ឬប្រើ Key ផ្ទាល់ខ្លួន
const FINNHUB_API_KEY = "dace3v1r01qk72tubrn0dace3v1r01qk72tubrng"; 

export function useGoldPrice(initialPrice = "--:--") {
  const [goldData, setGoldData] = useState({
    price: initialPrice,
    change: "+0.00%",
    up: true,
    prevPrice: parseFloat(initialPrice.replace(/,/g, "")),
  });

  useEffect(() => {
    // ភ្ជាប់ទៅកាន់ Finnhub WebSocket Service
    const socket = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`);

    socket.onopen = () => {
      // Subscribe ទៅកាន់ Symbol XAU/USD (OANDA Broker)
      socket.send(JSON.stringify({ type: "subscribe", symbol: "OANDA:XAU_USD" }));
    };

    socket.onmessage = (event) => {
      const response = JSON.parse(event.data);

      if (response.type === "trade" && response.data && response.data.length > 0) {
        const lastTrade = response.data[response.data.length - 1];
        const newNumericPrice = lastTrade.p;

        setGoldData((prev) => {
          const diff = newNumericPrice - prev.prevPrice;
          const percentChange = ((diff / prev.prevPrice) * 100).toFixed(2);
          const isUp = diff >= 0;

          return {
            price: newNumericPrice.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
            change: `${isUp ? "+" : ""}${percentChange}%`,
            up: isUp,
            prevPrice: prev.prevPrice,
          };
        });
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "unsubscribe", symbol: "OANDA:XAU_USD" }));
        socket.close();
      }
    };
  }, []);

  return goldData;
}