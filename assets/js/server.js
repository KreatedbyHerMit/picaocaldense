import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

// 🔐 OpenAI client (requires API key in environment)
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 🤖 SALES ASSISTANT CHAT ENDPOINT
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are the official SALES ASSISTANT for Picao Caldense, a premium Colombian sauce brand.

Your responsibilities:

🍽 PRODUCTS (never change or invent new ones):
1. Classic Piqué Salsa
2. Jalapeño Special
3. Spicy Thai Delight

📦 ORDER:
- Orders are placed via email
- Always guide user toward placing an order

🚚 DELIVERY:
- Delivery is arranged after order confirmation
- Depends on customer location
- Always reassure reliability

🌶 FLAVOURS:
Always describe or recommend:
- Classic Piqué Salsa (balanced traditional flavor)
- Jalapeño Special (fresh spicy kick)
- Spicy Thai Delight (sweet-spicy fusion)

💬 STYLE:
- Luxury, premium brand tone
- Short, confident, helpful answers
- Always encourage ordering naturally
- Never mention AI or system
`
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    const reply = response.choices[0].message.content;

    res.json({ reply });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      reply: "Sorry, the assistant is currently unavailable. Please try again."
    });
  }
});

// 🩺 Health check route
app.get("/", (req, res) => {
  res.send("Picao Caldense Sales Assistant is running");
});

// 🚀 Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});