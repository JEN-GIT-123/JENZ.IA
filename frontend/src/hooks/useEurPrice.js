import { useEffect, useState } from "react";

// Use your own Finnhub API key
const FINNHUB_API_KEY = "daae8r9r01qvosod8gn0daae8r9r01qvosod8gng";

export function useEurPrice(initialPrice = "1.17000") {
  const [eurData, setEurData] = useState({
    price: initialPrice,
    change: "+0.00%",
    up: true,
    prevPrice: parseFloat(String(initialPrice).replace(/,/g, "")),
  });

  useEffect(() => {
    const socket = new WebSocket(
      `wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`
    );

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "subscribe",
          symbol: "OANDA:EUR_USD",
        })
      );
    };

    socket.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);

        if (
          response.type === "trade" &&
          response.data &&
          response.data.length > 0
        ) {
          const lastTrade =
            response.data[response.data.length - 1];

          const newNumericPrice = Number(lastTrade.p);

          if (!Number.isFinite(newNumericPrice)) return;

          setEurData((prev) => {
            const previousPrice = Number.isFinite(prev.prevPrice)
              ? prev.prevPrice
              : newNumericPrice;

            const diff = newNumericPrice - previousPrice;

            const percentChange =
              previousPrice !== 0
                ? ((diff / previousPrice) * 100).toFixed(2)
                : "0.00";

            const isUp = diff >= 0;

            return {
              price: newNumericPrice.toLocaleString("en-US", {
                minimumFractionDigits: 5,
                maximumFractionDigits: 5,
              }),

              change: `${isUp ? "+" : ""}${percentChange}%`,

              up: isUp,

              prevPrice: newNumericPrice,
            };
          });
        }
      } catch (error) {
        console.error("EUR WebSocket Parse Error:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("EUR/USD WebSocket Error:", error);
    };

    socket.onclose = () => {
      console.log("EUR/USD WebSocket disconnected");
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: "unsubscribe",
            symbol: "OANDA:EUR_USD",
          })
        );
      }

      if (
        socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING
      ) {
        socket.close();
      }
    };
  }, []);

  return eurData;
}