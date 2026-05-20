const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_order: "Order",
    nav_contact: "Contact",

    title: "Picao Caldense",
    story: "Born from Colombian kitchens where flavor is memory and tradition.",

    about_title: "About Us",
    about_text: "A Colombian heritage brand built on tradition and craftsmanship.",

    order_heading: "Order",
    order_intro: "Premium handcrafted Colombian sauces.",
    order_signature_text: "Signature Blend",
    flavour_classic: "Classic Salsa",
    flavour_jalapeno: "Jalapeño Heat",
    flavour_thai: "Thai Fusion",
    place_order: "Place Order",

    contact_title: "Contact",

    footer: "© 2025 Picao Caldense"
  },

  fr: {
    nav_home: "Accueil",
    nav_about: "À propos",
    nav_order: "Commander",
    nav_contact: "Contact",

    title: "Picao Caldense",
    story: "Cuisine colombienne artisanale.",

    about_title: "À propos",
    about_text: "Marque colombienne artisanale.",

    order_heading: "Commande",
    order_intro: "Sauces colombiennes premium.",
    order_signature_text: "Mélange signature",
    flavour_classic: "Classique",
    flavour_jalapeno: "Jalapeño",
    flavour_thai: "Thaï",
    place_order: "Commander",

    contact_title: "Contact",

    footer: "© 2025 Picao Caldense"
  },

  es: {
    nav_home: "Inicio",
    nav_about: "Acerca de",
    nav_order: "Ordenar",
    nav_contact: "Contacto",

    title: "Picao Caldense",
    story: "Sabor colombiano artesanal.",

    about_title: "Acerca de",
    about_text: "Marca colombiana artesanal.",

    order_heading: "Pedido",
    order_intro: "Salsas premium colombianas.",
    order_signature_text: "Mezcla exclusiva",
    flavour_classic: "Clásica",
    flavour_jalapeno: "Jalapeño",
    flavour_thai: "Tailandesa",
    place_order: "Ordenar",

    contact_title: "Contacto",

    footer: "© 2025 Picao Caldense"
  }
};

/* =========================
   LANGUAGE SYSTEM
========================= */

function applyLang(lang = "en") {
  const dict = translations[lang] || translations.en;

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = dict[key] || el.textContent;
  });

  localStorage.setItem("lang", lang);
}

window.setLanguage = applyLang;

/* =========================
   PAGE CHAT BOT (SAFE SIMPLE VERSION)
   - Works without backend
========================= */

function sendMessage() {
  const input = document.getElementById("msg");
  const box = document.getElementById("chatbox");

  if (!input || !box) return;

  const text = input.value.trim();
  if (!text) return;

  box.innerHTML += `<div><b>You:</b> ${text}</div>`;

  let reply = "Thanks for your message.";

  if (text.toLowerCase().includes("order")) {
    reply = "You can place your order using the Order page.";
  }

  setTimeout(() => {
    box.innerHTML += `<div><b>Bot:</b> ${reply}</div>`;
    box.scrollTop = box.scrollHeight;
  }, 400);

  input.value = "";
}

window.send = sendMessage;

/* =========================
   ORDER EMAIL BUTTON
========================= */

function placeOrderEmail() {
  window.location.href =
    "mailto:orders@picaocaldense.com?subject=Picao Caldense Order Request";
}

window.placeOrder = placeOrderEmail;

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  applyLang(localStorage.getItem("lang") || "en");
});
