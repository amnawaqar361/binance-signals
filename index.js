<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Binance USDT Coins</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    table { border-collapse: collapse; width: 100%; margin-top: 20px; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
    th { background: #333; color: #fff; }
    tr:nth-child(even) { background: #f2f2f2; }
  </style>
</head>
<body>
  <h2>Binance USDT Pairs (Live)</h2>
  <table id="cryptoTable">
    <thead>
      <tr>
        <th>Symbol</th>
        <th>Current Price</th>
        <th>Entry Price</th>
        <th>Exit Price</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <script>
    async function fetchData() {
      try {
        const res = await fetch("https://binance-signals.onrender.com/api/binance-data");
        const data = await res.json();

        const tbody = document.querySelector("#cryptoTable tbody");
        tbody.innerHTML = "";

        data.forEach(item => {
          const row = `<tr>
            <td>${item.symbol}</td>
            <td>${item.currentPrice}</td>
            <td>${item.entryPrice}</td>
            <td>${item.exitPrice}</td>
          </tr>`;
          tbody.innerHTML += row;
        });
      } catch (err) {
        console.error("Error fetching data", err);
      }
    }

    fetchData();
    setInterval(fetchData, 5000); // auto refresh every 5s
  </script>
</body>
</html>
