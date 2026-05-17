app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage || typeof userMessage !== 'string') {
      return res.status(400).json({
        reply: "Please send a valid message."
      });
    }

    const completion = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      temperature: 0.6,
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

    const reply =
      completion?.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    res.json({ reply });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: 'Sorry, Picao Assistant is temporarily unavailable.'
    });
  }
});