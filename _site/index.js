
// -------------------------
// EMAIL ORDER SYSTEM
// -------------------------
const nodemailer = require("nodemailer");

app.post("/order", async (req, res) => {
  try {
    const { name, product, quantity, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Picao Caldense Order",
      text: `
New Order:

Name: ${name}
Product: ${product}
Quantity: ${quantity}
Message: ${message || "None"}
      `
    });

    res.json({ reply: "Order received! We'll contact you shortly." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Order failed to send." });
  }
});
