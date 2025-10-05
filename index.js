import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

const BINANCE_API = "https://api.binance.com/api/v3/ticker/24hr";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(BINANCE_API, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"
      }
    });

    // Sirf 20 coins test ke liye bhej rahe hain
    res.json({
      status: "ok",
      coins: response.data.slice(0, 20)
    });
  } catch (err) {
    console.error("Error fetching Binance data:", err.message);
    res.status(500).json({ error: "Failed to fetch Binance data" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
