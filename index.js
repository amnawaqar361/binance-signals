```js
// index.js
import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("✅ Server is running. Use /price to check data.");
});

app.get("/price", async (req, res) => {
  try {
    const response = await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");
    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error("❌ Binance API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch Binance data", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```
