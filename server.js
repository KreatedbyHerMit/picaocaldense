require('dotenv').config();

const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static('.'));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/chat', async (req, res) => {

  try {

    const userMessage = req.body.message;

    const completion = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: `
You are Picao Assistant for Picao Caldense.

You help customers with:
- sauce flavors
- order placement
- wholesale inquiries
- shipping questions
- ingredient questions

Available flavors:
- Classic Pique
- Jalapeño Special
- Spicy Thai Delight

Bottle size:
355ml

Always answer warmly and professionally.
          `
        },
        {
          role: 'user',
          content: userMessage
        }
      ]
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      reply: 'Sorry, Picao Assistant is temporarily unavailable.'
    });

  }

});

app.listen(3000, () => {
  console.log('Picao Assistant running on http://localhost:3000');
});
