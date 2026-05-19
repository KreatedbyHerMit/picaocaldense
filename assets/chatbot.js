const chat = document.getElementById("chatbox");
const input = document.getElementById("input");
const btn = document.getElementById("sendBtn");

function addMessage(sender, text) {
  const p = document.createElement("p");
  p.innerHTML = `<b>${sender}:</b> ${text}`;
  chat.appendChild(p);
  chat.scrollTop = chat.scrollHeight;
}

async function send() {
  const message = input.value.trim();
  if (!message) return;

  addMessage("You", message);
  input.value = "";

  const bot = document.createElement("p");
  bot.innerHTML = "<b>Bot:</b> typing...";
  chat.appendChild(bot);

  btn.disabled = true;

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    if (!res.ok) throw new Error("Server error: " + res.status);

    const data = await res.json();
    bot.innerHTML = `<b>Bot:</b> ${data.reply}`;

  } catch (err) {
    console.error(err);
    bot.innerHTML = "<b>Bot:</b> server not running or /chat missing";
  }

  btn.disabled = false;
}

btn.addEventListener("click", send);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") send();
});