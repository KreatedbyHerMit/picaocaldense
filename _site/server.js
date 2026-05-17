app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body?.message;

    // -------------------------
    // Validation (stricter)
    // -------------------------
    if (typeof userMessage !== "string" || !userMessage.trim()) {
      return res.status(400).json({
        reply: "Please send a valid message."
      });
    }

    const cleanMessage = userMessage.trim().slice(0, 1000); // prevents abuse

    // -------------------------
    // OpenAI request
    // -------------------------
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.6,
      messages: [
        {
          role: "system",
          content: `
You are Picao Assistant for Picao Caldense.

Tone:
- warm
- elegant
- professional
- short and clear

You help with:
- sauce flavors
- order placement
- wholesale inquiries
- shipping questions
- ingredient questions

Products:
- Classic Pique
- Jalapeño Special
- Spicy Thai Delight

Bottle size: 355ml

Rules:
- Never invent products not listed
- If unsure, ask a follow-up question
- Keep responses under 4 sentences
          `
        },
        {
          role: "user",
          content: cleanMessage
        }
      ]
    });

    const reply = completion?.choices?.[0]?.message?.content?.trim();

    // -------------------------
    // Final fallback safety
    // -------------------------
    if (!reply) {
      return res.status(200).json({
        reply: "Sorry, I couldn't generate a response. Please try again."
      });
    }

    res.json({ reply });

  } catch (error) {
    console.error("Chat error:", error);

    res.status(500).json({
      reply: "Sorry, Picao Assistant is temporarily unavailable."
    });
  }
});