import express from "express";
import nodemailer from "nodemailer";

const app = express();

app.use(express.json());

// -------------------------
// ORDER ROUTE
// -------------------------
app.post("/order", async (req, res) => {
  try {
    const { name, product, quantity, message } = req.body;

    res.json({
      success: true,
      message: "Order received"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// -------------------------
// CHATBOT ROUTE (optional basic)
// -------------------------
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body?.message;

    if (!userMessage) {
      return res.status(400).json({ reply: "No message provided" });
    }

    res.json({
      reply: "Chatbot received: " + userMessage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Server error" });
  }
});

// -------------------------
// SERVER START
// -------------------------
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});