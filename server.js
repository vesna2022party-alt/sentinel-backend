import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.get("/api/ai", async (req, res) => {
  res.json({
    summary: "⚠️ Зростання напруги",
    risk: Math.random()
  });
});

app.post("/api/alert", async (req, res) => {
  const { message } = req.body;

  const token = process.env.TELEGRAM_TOKEN;
  const chat_id = process.env.TELEGRAM_CHAT_ID;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ chat_id, text: message })
  });

  res.json({ ok: true });
});

app.listen(3000);
