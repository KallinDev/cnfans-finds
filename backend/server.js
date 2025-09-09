import express from "express";
import fetch from "node-fetch"; // Node 18+ has fetch built-in
import cors from "cors";

const app = express();
app.use(cors());

const PORT = 3001; // Or any port you like

const apiKey = "AIzaSyAZSPLrCggG9aQazsLtZjuSPQSVrWHumV0";
const cx = "e16ffaa0601744911";

app.get("/api/image", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing query" });

  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(q)}&cx=${cx}&searchType=image&key=${apiKey}&num=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const image = data.items?.[0]?.link || null;
    res.json({ image });
  } catch {
    res.status(500).json({ error: "Image fetch failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});