import express from "express";
import axios from "axios";
import cors from "cors";   // new

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());  // allow frontend access

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://data-api.binance.vision/api/v3/ticker/price", {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Binance Fetch Error:", error.message);
    res.status(500).json({ error: "Failed to fetch Binance data" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
