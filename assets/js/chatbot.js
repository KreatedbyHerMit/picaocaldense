/* =========================
   PICAO CALDENSE CHATBOT + MEMORY
   ========================= */

const STORAGE_KEY = "picao_chat_memory";

const botResponses = {
  en: {
    hello: "Hello 👋 I’m your Picao assistant. How can I help you?",
    order: "You can place orders on the Order page 🥘",
    story: "Picao Caldense is inspired by Colombian kitchens where food is shared, remembered, and felt.",
    repeat: "Got it — I’ll remember that.",
    default: "I can help with orders, story, or navigation."
  },
  fr: {
    hello: "Bonjour 👋 Je suis votre assistant Picao.",
    order: "Vous pouvez commander sur la page Commande 🥘",
    story: "Picao Caldense s’inspire des cuisines colombiennes où la nourriture est partagée et ressentie.",
    repeat: "D’accord — je vais m’en souvenir.",
    default: "Je peux vous aider avec les commandes ou l’histoire."
  },
  es: {
    hello: "Hola 👋 Soy tu asistente Picao.",
    order: "Puedes hacer pedidos en la página de pedidos 🥘",
    story: "Picao Caldense nace de cocinas colombianas donde la comida se comparte y se siente.",
    repeat: "Entendido — lo recordaré.",
    default: "Puedo ayudarte con pedidos o historia."
  }
};

/* ---------- MEMORY ---------- */

function loadMemory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      lang: "en",
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

/* ---------- CORE ---------- */

function botReply(msg, mem) {
  const text = msg.toLowerCase();

  if (text.includes("my name is")) {
    const name = msg.split("is")[1]?.trim();
    mem.name = name;
    saveMemory(mem);
    return `Nice to meet you, ${name} 👋`;
  }

  if (text.includes("hello") || text.includes("hi")) {
    mem.lastTopic = "greeting";
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

/* ---------- UI ---------- */

function addMessage(container, text, type) {
  const div = document.createElement("div");
  div.className = type;
  div.innerText = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

/* ---------- INIT ---------- */

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
