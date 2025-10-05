import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("✅ Binance API is running. Use /api/binance-data to get data.");
});

app.get("/api/binance-data", async (req, res) => {
  try {
    const response = await fetch("https://api.binance.com/api/v3/ticker/price");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Binance fetch error:", error.message);
    res.json({ error: "Failed to fetch Binance data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
