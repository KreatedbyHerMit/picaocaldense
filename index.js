import express from "express";

const app = express();
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

// chatbot
app.post("/chat", (req, res) => {
  const msg = (req.body?.message || "").toLowerCase();

  let reply = "I didn't understand that.";

  if (msg.includes("hello")) reply = "Hello 👋 Welcome to Picao Caldense!";
  else if (msg.includes("menu")) reply = "We offer traditional Colombian sauces 🇨🇴";
  else if (msg.includes("order")) reply = "Go to the Order page to place your order 🛒";
  else if (msg.includes("help")) reply = "Ask me about products, orders, or tradition!";

  res.json({ reply });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve static files (HTML/CSS/JS)
app.use(express.static(__dirname));