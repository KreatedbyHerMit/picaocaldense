import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));

app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname,"index.html"));
});

app.post("/chat",(req,res)=>{

  const msg = (req.body?.message || "").toLowerCase();

  let reply = "I didn't understand that.";

  if(msg.includes("hi") || msg.includes("hello")){
    reply = "Welcome to Picao Caldense 🇨🇴";
  }
  else if(msg.includes("order")){
    reply = "Visit the Order page to place your order.";
  }
  else if(msg.includes("sauce")){
    reply = "Our sauces are inspired by Colombian tradition.";
  }
  else if(msg.includes("help")){
    reply = "Ask me about products or ordering.";
  }

  res.json({reply});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log("Server running on http://localhost:" + PORT);
});
