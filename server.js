const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Fetch all USDT pairs and add entry/exit prices
app.get("/api/binance-data", async (req, res) => {
  try {
    // Step 1: Get all symbols from Binance
    const infoRes = await fetch("https://api.binance.com/api/v3/exchangeInfo");
    const infoData = await infoRes.json();
    const usdtPairs = infoData.symbols
      .filter(s => s.symbol.endsWith("USDT"))
      .map(s => s.symbol);

    // Step 2: Get live prices
    const priceRes = await fetch("https://api.binance.com/api/v3/ticker/price");
    const priceData = await priceRes.json();

    // Filter only USDT pairs
    const filtered = priceData.filter(item => usdtPairs.includes(item.symbol));

    // Step 3: Add entry & exit price
    const withEntryExit = filtered.map(item => ({
      symbol: item.symbol,
      currentPrice: parseFloat(item.price).toFixed(4),
      entryPrice: (parseFloat(item.price) * 0.98).toFixed(4), // Example: -2%
      exitPrice: (parseFloat(item.price) * 1.05).toFixed(4)   // Example: +5%
    }));

    res.json(withEntryExit);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Binance data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
