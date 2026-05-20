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

    title: "Picao Caldense",
    story: "Born from Colombian kitchens where food is shared, remembered, and felt.",

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

    title: "Picao Caldense",
    story: "Né des cuisines colombiennes où la nourriture est partagée, mémorisée et ressentie.",

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

    title: "Picao Caldense",
    story: "Nacido de cocinas colombianas donde la comida se comparte, se recuerda y se siente.",

    footer: "© 2025 Picao Caldense"
  }
};

function applyLang(lang) {
  const dict = translations[lang] || translations.en;

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) el.innerText = dict[key];
  });

  localStorage.setItem("lang", lang);
}

function initLang() {
  const saved = localStorage.getItem("lang") || "en";
  applyLang(saved);

  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", () => {
      applyLang(btn.dataset.lang);
    });
  });
}

document.addEventListener("DOMContentLoaded", initLang);

window.setLang = applyLang;
