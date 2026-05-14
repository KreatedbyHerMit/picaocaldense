const chatToggle = document.getElementById("chat-toggle");
const chatWidget = document.getElementById("chat-widget");
const closeChat = document.getElementById("close-chat");

chatToggle.onclick = () => {
  chatWidget.classList.remove("hidden");
};

closeChat.onclick = () => {
  chatWidget.classList.add("hidden");
};

function sendMessage() {
  const input = document.getElementById("userInput");
  const box = document.getElementById("chat-box");

  const msg = input.value.trim();
  if (!msg) return;

  box.innerHTML += `<div class="user-msg">${msg}</div>`;

  let reply = "I can help with shipping, flavours, and quantities.";

  const text = msg.toLowerCase();

  if (text.includes("flavour") || text.includes("flavors")) {
    reply = "We offer: Classic Pique, Jalapeño Special, and Spicy Thai Delight.";
  }

  if (text.includes("shipping")) {
    reply = "Shipping takes 2–5 business days depending on your location.";
  }

  if (text.includes("quantity")) {
    reply = "We sell 355ml bottles individually or by the dozen.";
  }

  setTimeout(() => {
    box.innerHTML += `<div class="bot-msg">${reply}</div>`;
    box.scrollTop = box.scrollHeight;
  }, 300);

  input.value = "";
}
