const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_order: "Order",
    nav_contact: "Contact",

    home_title: "Welcome",
    about_title: "About Us",
    order_title: "Order",
    contact_title: "Contact",

    home_text: "Welcome to Picao Caldense",
    about_text: "Our story is built on Colombian heritage",
    order_text: "Place your order below",
    contact_text: "Get in touch with us",

    send: "Send",
    checkout: "Checkout",
    place_order: "Place Order",

    footer: "© 2025 Picao Caldense"
  },

  fr: {
    nav_home: "Accueil",
    nav_about: "À propos",
    nav_order: "Commander",
    nav_contact: "Contact",

    home_title: "Bienvenue",
    about_title: "À propos de nous",
    order_title: "Commande",
    contact_title: "Contact",

    home_text: "Bienvenue chez Picao Caldense",
    about_text: "Notre histoire est ancrée dans l'héritage colombien",
    order_text: "Passez votre commande ci-dessous",
    contact_text: "Contactez-nous",

    send: "Envoyer",
    checkout: "Paiement",
    place_order: "Commander",

    footer: "© 2025 Picao Caldense"
  },

  es: {
    nav_home: "Inicio",
    nav_about: "Acerca de",
    nav_order: "Ordenar",
    nav_contact: "Contacto",

    home_title: "Bienvenido",
    about_title: "Sobre nosotros",
    order_title: "Pedido",
    contact_title: "Contacto",

    home_text: "Bienvenido a Picao Caldense",
    about_text: "Nuestra historia está basada en la herencia colombiana",
    order_text: "Haz tu pedido abajo",
    contact_text: "Contáctanos",

    send: "Enviar",
    checkout: "Pago",
    place_order: "Hacer pedido",

    footer: "© 2025 Picao Caldense"
  }
};

function setLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");

    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    } else {
      // safe fallback (prevents missing text)
      el.textContent = el.textContent;
    }
  });

  localStorage.setItem("lang", lang);
}

// auto-load saved language on every page
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "en";
  setLanguage(savedLang);
});

// expose globally
window.setLanguage = setLanguage;