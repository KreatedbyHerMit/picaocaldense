function sendMessage() {

  const input = document.getElementById("userInput");
  const box = document.getElementById("chat-box");

  const msg = input.value.trim();

  if (!msg) return;

  box.insertAdjacentHTML("beforeend", `
    <div class="user-msg">
      <strong>You:</strong> ${msg}
    </div>
  `);

  let reply =
    "Thank you for contacting Picao Caldense.";

  const text = msg.toLowerCase();

  if (text.includes("shipping")) {

    reply =
      "Shipping is available depending on location and order size.";

  }

  else if (
    text.includes("flavour") ||
    text.includes("flavor")
  ) {

    reply =
      "Our signature Salsa Picao Caldense offers balanced Colombian-inspired heat and depth.";

  }

  else if (text.includes("quantity")) {

    reply =
      "Please tell us your desired quantity and we will respond with availability.";

  }

  else if (
    text.includes("hello") ||
    text.includes("hi")
  ) {

    reply =
      "Welcome to Salsa Picao Caldense 🌶️";

  }

  box.insertAdjacentHTML("beforeend", `
    <div class="bot-msg">
      <strong>Picao Assistant:</strong> ${reply}
    </div>
  `);

  input.value = "";

  box.scrollTop = box.scrollHeight;

}

document.addEventListener("DOMContentLoaded", () => {

  document
    .getElementById("send-btn")
    .addEventListener("click", sendMessage);

  document
    .getElementById("userInput")
    .addEventListener("keypress", (e) => {

      if (e.key === "Enter") {
        sendMessage();
      }

    });

});
