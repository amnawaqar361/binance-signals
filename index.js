import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

const BINANCE_API = "https://api.binance.com/api/v3/ticker/24hr";

app.get("/", async (req, res) => {
  try {
    const response = await fetch(BINANCE_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"   // Binance sometimes blocks if no user-agent
      }
    });

    if (!response.ok) {
      throw new Error("Binance API response not OK");
    }

    const data = await response.json();
    res.json({ status: "ok", coins: data.slice(0, 20) }); // sirf 20 coins for test
  } catch (err) {
    console.error("Error fetching Binance data:", err.message);
    res.status(500).json({ error: "Failed to fetch Binance data" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
