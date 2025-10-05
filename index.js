import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

const BINANCE_API = "https://api.binance.com/api/v3/ticker/24hr";

async function fetchCoins() {
  const res = await fetch(BINANCE_API);
  const data = await res.json();
  return data.slice(0, 50); // abhi 50 coins, extend kar sakte ho
}

app.get("/", async (req, res) => {
  try {
    const coins = await fetchCoins();
    res.json({ status: "ok", coins });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Binance data" });
  }
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
