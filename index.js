import express from "express";
import WebSocket from "ws";

const app = express();
const PORT = process.env.PORT || 3000;

const prices = {}; // coins data memory me store hoga

// Binance ka global ticker WebSocket
const ws = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

ws.on("message", (data) => {
  try {
    const tickers = JSON.parse(data);
    tickers.forEach(t => {
      prices[t.s] = { price: t.c, change: t.P }; // s = symbol, c = current price, P = % change
    });
  } catch (err) {
    console.error("WebSocket error:", err.message);
  }
});

app.get("/", (req, res) => {
  const list = Object.keys(prices).slice(0, 20).map(symbol => ({
    symbol,
    ...prices[symbol]
  }));
  res.json({ status: "ok", coins: list });
});

app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
