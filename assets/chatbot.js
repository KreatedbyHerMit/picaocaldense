async function sendMessage() {
  const input = document.getElementById("userInput");
  const box = document.getElementById("chat-box");

  const msg = input.value.trim();
  if (!msg) return;

  box.innerHTML += `<div><b>You:</b> ${msg}</div>`;
  input.value = "";

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();

    box.innerHTML += `<div><b>Picao Assistant:</b> ${data.reply}</div>`;
    box.scrollTop = box.scrollHeight;

  } catch (e) {
    box.innerHTML += `<div><b>Picao Assistant:</b> Offline</div>`;
  }
}
