/****************************************************
 * 0. SAFETY CHECK (prevents runtime crashes)
 ****************************************************/
function getEl(id) {
  return document.getElementById(id);
}

/****************************************************
 * 1. MAIN MESSAGE FUNCTION
 ****************************************************/
function sendMessage() {
  const input = getEl("userInput");
  const box = getEl("chat-box");

  // Safety guard (prevents "null error" crashes)
  if (!input || !box) return;

  const msg = input.value.trim();
  if (!msg) return;

  const text = msg.toLowerCase();

  /****************************************************
   * 2. USER MESSAGE (SAFE DOM BUILD)
   ****************************************************/
  const userDiv = document.createElement("div");
  userDiv.className = "user-msg";

  const userStrong = document.createElement("strong");
  userStrong.textContent = "You: ";

  const userText = document.createTextNode(msg);

  userDiv.appendChild(userStrong);
  userDiv.appendChild(userText);
  box.appendChild(userDiv);

  /****************************************************
   * 3. BOT LOGIC (RULE ENGINE)
   ****************************************************/
  let reply = "Thank you for contacting Picao Caldense.";

  const rules = [
    {
      keywords: ["shipping"],
      reply: "Shipping is available depending on location and order size."
    },
    {
      keywords: ["flavour", "flavor"],
      reply:
        "Our signature Salsa Picao Caldense offers balanced Colombian-inspired heat and depth."
    },
    {
      keywords: ["quantity"],
      reply:
        "Please tell us your desired quantity and we will respond with availability."
    },
    {
      keywords: ["hello", "hi"],
      reply: "Welcome to Salsa Picao Caldense 🌶️"
    }
  ];

  for (const rule of rules) {
    if (rule.keywords.some(k => text.includes(k))) {
      reply = rule.reply;
      break;
    }
  }

  /****************************************************
   * 4. BOT MESSAGE (SAFE DOM BUILD)
   ****************************************************/
  const botDiv = document.createElement("div");
  botDiv.className = "bot-msg";

  const botStrong = document.createElement("strong");
  botStrong.textContent = "Picao Assistant: ";

  const botText = document.createTextNode(reply);

  botDiv.appendChild(botStrong);
  botDiv.appendChild(botText);
  box.appendChild(botDiv);

  /****************************************************
   * 5. CLEANUP + UX
   ****************************************************/
  input.value = "";
  input.focus();
  box.scrollTop = box.scrollHeight;
}

/****************************************************
 * 6. WINDOW INIT (SAFE BINDING)
 ****************************************************/
window.addEventListener("DOMContentLoaded", () => {
  const btn = getEl("send-btn");
  const input = getEl("userInput");

  // Safety checks (prevents null listener crashes)
  if (!btn || !input) return;

  btn.addEventListener("click", sendMessage);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
});