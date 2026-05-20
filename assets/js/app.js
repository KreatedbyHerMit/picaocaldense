
/* =========================
   🌐 LANGUAGE SYSTEM
========================= */

const translations = {
  en: {
    home: "Home",
    about: "About",
    order: "Order",
    contact: "Contact",
    footer: "© 2025 Picao Caldense"
  },
  fr: {
    home: "Accueil",
    about: "À propos",
    order: "Commander",
    contact: "Contact",
    footer: "© 2025 Picao Caldense"
  },
  es: {
    home: "Inicio",
    about: "Acerca de",
    order: "Ordenar",
    contact: "Contacto",
    footer: "© 2025 Picao Caldense"
  }
};

function setLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang]?.[key] || el.textContent;
  });

  localStorage.setItem("lang", lang);
}


/* =========================
   🎨 THEME SYSTEM
========================= */

function setTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}


/* =========================
   🧭 NAVIGATION FIX (AUTO APPLY)
========================= */

function initNav() {
  const nav = document.querySelector("nav");
  if (!nav) return;

  nav.innerHTML = `
    <a href="index.html" data-i18n="home">Home</a>
    <a href="about.html" data-i18n="about">About</a>
    <a href="order.html" data-i18n="order">Order</a>
    <a href="contact-us.html" data-i18n="contact">Contact</a>
  `;
}


/* =========================
   🤖 CHATBOT CONNECTION FIX
========================= */

async function sendChat(message, chatbox) {
  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    return data.reply;

  } catch (err) {
    return "Server not available.";
  }
}


/* =========================
   💾 SIMPLE ORDER STORAGE (LOCAL)
========================= */

function saveOrder(order) {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
}


/* =========================
   🚀 INIT ON ALL PAGES
========================= */

document.addEventListener("DOMContentLoaded", () => {
  setLanguage(localStorage.getItem("lang") || "en");
  setTheme(localStorage.getItem("theme") || "light");
  initNav();
});

window.setLanguage = setLanguage;
window.setTheme = setTheme;
window.sendChat = sendChat;
window.saveOrder = saveOrder;
