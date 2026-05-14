const responses = {
  shipping: "Shipping is available based on location and order size.",
  flavours: "Available flavours include the Signature Blend and seasonal variations.",
  quantities: "Orders can be discussed directly through the contact assistant.",
  hello: "Welcome to Salsa Picao Caldense 🌶️"
};

function sendMessage() {
  const input = document.getElementById("userInput");
  const box = document.getElementById("chat-box");

  const msg = input.value.trim();
  if (!msg) return;

  box.innerHTML += `
    <div class="user-msg"><strong>You:</strong> ${msg}</div>
  `;

  let reply = "Please contact us directly for more details.";

  const lower = msg.toLowerCase();

  if (lower.includes("shipping")) {
    reply = responses.shipping;
  } else if (lower.includes("flavour") || lower.includes("flavor")) {
    reply = responses.flavours;
  } else if (lower.includes("quantity")) {
    reply = responses.quantities;
  } else if (lower.includes("hello") || lower.includes("hi")) {
    reply = responses.hello;
  }

  box.innerHTML += `
    <div class="bot-msg"><strong>Picao Assistant:</strong> ${reply}</div>
  `;

  input.value = "";
  box.scrollTop = box.scrollHeight;
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("send-btn");

  if (btn) {
    btn.onclick = sendMessage;
  }
});
