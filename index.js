const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Root route (homepage)
app.get("/", (req, res) => {
  res.send("✅ Binance API is running. Use /api/binance-data to get data.");
});

// Binance USDT pairs data
app.get("/api/binance-data", async (req, res) => {
  try {
    // Get all symbols
    const infoRes = await fetch("https://api.binance.com/api/v3/exchangeInfo");
    const infoData = await infoRes.json();
    const usdtPairs = infoData.symbols
      .filter(s => s.symbol.endsWith("USDT"))
      .map(s => s.symbol);

    // Get prices
    const priceRes = await fetch("https://api.binance.com/api/v3/ticker/price");
    const priceData = await priceRes.json();

    // Filter USDT pairs
    const filtered = priceData.filter(item => usdtPairs.includes(item.symbol));

    // Add entry & exit prices
    const withEntryExit = filtered.map(item => ({
      symbol: item.symbol,
      currentPrice: parseFloat(item.price).toFixed(4),
      entryPrice: (parseFloat(item.price) * 0.98).toFixed(4), // -2%
      exitPrice: (parseFloat(item.price) * 1.05).toFixed(4)   // +5%
    }));

    res.json(withEntryExit);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Binance data" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
