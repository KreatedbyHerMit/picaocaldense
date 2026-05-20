const STORAGE_KEY = "picao_chat_memory";

/* =========================
   MEMORY
   ========================= */

function loadMemory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      lang: "en",
      name: null,
      lastTopic: null
    };
  } catch {
    return { lang: "en", name: null, lastTopic: null };
  }
}

function saveMemory(mem) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mem));
}

/* =========================
   BOT RESPONSES (FALLBACK)
   ========================= */

const botResponses = {
  en: {
    hello: "Welcome to Picao Caldense 🌶️ How can I help you today?",
    order: "You can place orders on the Order page 🥘",
    story: "Picao Caldense is inspired by Colombian kitchens where food is shared, remembered, and felt.",
    default: "I can help with orders, story, or navigation."
  },
  fr: {
    hello: "Bienvenue chez Picao Caldense 🌶️ Comment puis-je vous aider ?",
    order: "Vous pouvez commander sur la page Commande 🥘",
    story: "Picao Caldense s’inspire des cuisines colombiennes où les saveurs se partagent.",
    default: "Je peux vous aider avec les commandes ou l’histoire."
  },
  es: {
    hello: "Bienvenido a Picao Caldense 🌶️ ¿Cómo puedo ayudarte?",
    order: "Puedes hacer pedidos en la página de pedidos 🥘",
    story: "Picao Caldense nace de cocinas colombianas donde la comida se comparte.",
    default: "Puedo ayudarte con pedidos o historia."
  }
};

/* =========================
   CORE BOT LOGIC (LOCAL)
   ========================= */

function localBotReply(msg, mem) {
  const text = msg.toLowerCase();

  const nameMatch = msg.match(/my name is (.+)/i);
  if (nameMatch) {
    mem.name = nameMatch[1].trim();
    saveMemory(mem);
    return `Nice to meet you, ${mem.name} 👋`;
  }

  if (text.includes("hello") || text.includes("hi")) {
    return botResponses[mem.lang]?.hello;
  }

  if (text.includes("order")) {
    return botResponses[mem.lang]?.order;
  }

  if (text.includes("story")) {
    return botResponses[mem.lang]?.story;
  }

  return botResponses[mem.lang]?.default;
}

/* =========================
   OPTIONAL BACKEND CALL
   ========================= */

async function backendReply(message) {
  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    if (!res.ok) throw new Error("No backend");

    const data = await res.json();
    return data.reply;
  } catch {
    return null; // fallback to local bot
  }
}

/* =========================
   UI
   ========================= */

function addMessage(chat, text, type) {
  const div = document.createElement("p");
  div.className = type;
  div.innerHTML = `<b>${type === "user" ? "You" : "Bot"}:</b> ${text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

/* =========================
   INIT
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const chat = document.getElementById("chatbox");
  const input = document.getElementById("input");
  const btn = document.getElementById("sendBtn");

  if (!chat || !input || !btn) return;

  const memory = loadMemory();

  async function send() {
    const message = input.value.trim();
    if (!message) return;

    addMessage(chat, message, "user");
    input.value = "";

    // typing indicator
    const typing = document.createElement("p");
    typing.innerHTML = "<b>Bot:</b> typing...";
    chat.appendChild(typing);

    btn.disabled = true;

    // 1. Try backend (if exists)
    const backend = await backendReply(message);

    let reply;

    if (backend) {
      reply = backend;
    } else {
      // 2. fallback to local bot
      reply = localBotReply(message, memory);
    }

    typing.innerHTML = `<b>Bot:</b> ${reply}`;

    btn.disabled = false;
  }

  btn.addEventListener("click", send);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") send();
  });
});