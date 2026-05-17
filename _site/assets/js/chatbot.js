const STORAGE_KEY = "picao_chat_memory";

/* =========================
   BOT RESPONSES
   ========================= */

const botResponses = {
  en: {
    hello: "Welcome to Picao Caldense 🌶️ How may I assist you today?",
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
   MEMORY
   ========================= */

function loadMemory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      lang: localStorage.getItem("lang") || "en",
      lastTopic: null,
      name: null
    };
  } catch {
    return { lang: "en", lastTopic: null, name: null };
  }
}

function saveMemory(mem) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mem));
}

/* =========================
   BOT LOGIC
   ========================= */

function botReply(msg, mem) {

  const text = msg.toLowerCase();

  // NAME DETECTION (FIXED)
  const nameMatch = msg.match(/my name is (.+)/i);
  if (nameMatch) {
    const name = nameMatch[1].trim();
    mem.name = name;
    saveMemory(mem);
    return `Nice to meet you, ${name} 👋`;
  }

  if (text.includes("hello") || text.includes("hi")) {
    mem.lastTopic = "hello";
    saveMemory(mem);
    return botResponses[mem.lang].hello;
  }

  if (text.includes("order")) {
    mem.lastTopic = "order";
    saveMemory(mem);
    return botResponses[mem.lang].order;
  }

  if (text.includes("story")) {
    mem.lastTopic = "story";
    saveMemory(mem);
    return botResponses[mem.lang].story;
  }

  return botResponses[mem.lang].default;
}

/* =========================
   UI
   ========================= */

function addMessage(box, text, type) {
  const div = document.createElement("div");
  div.className = type;
  div.textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

/* =========================
   INIT
   ========================= */

document.addEventListener("DOMContentLoaded", () => {

  const input = document.querySelector("#chatInput");
  const sendBtn = document.querySelector("#chatSend");
  const box = document.querySelector("#chatBox");

  if (!input || !sendBtn || !box) return;

  const memory = loadMemory();

  sendBtn.addEventListener("click", () => {
    const msg = input.value.trim();
    if (!msg) return;

    addMessage(box, msg, "user");
    input.value = "";

    setTimeout(() => {
      addMessage(box, botReply(msg, memory), "bot");
    }, 400);
  });

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
  });

});
