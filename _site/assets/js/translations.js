const translations = {

  en: {
    title: "Picao Caldense",
    story:
      "Born from Colombian kitchens where food is shared, remembered, and felt.",

    nav_home: "Home",
    nav_about: "About",
    nav_order: "Order",
    nav_contact: "Contact",

    chatbot_title: "Chatbot Assistant",
    order_button: "Send Order"
  },

  fr: {
    title: "Picao Caldense",
    story:
      "Inspiré des cuisines colombiennes où les saveurs se partagent et les souvenirs se créent.",

    nav_home: "Accueil",
    nav_about: "À propos",
    nav_order: "Commander",
    nav_contact: "Contact",

    chatbot_title: "Assistant Chatbot",
    order_button: "Envoyer la commande"
  },

  es: {
    title: "Picao Caldense",
    story:
      "Inspirado en las cocinas colombianas donde la comida une, emociona y deja recuerdos.",

    nav_home: "Inicio",
    nav_about: "Nosotros",
    nav_order: "Ordenar",
    nav_contact: "Contacto",

    chatbot_title: "Asistente Virtual",
    order_button: "Enviar Pedido"
  }

};

function getLang() {
  return localStorage.getItem("lang") || "en";
}

function setLang(lang) {

  localStorage.setItem("lang", lang);

  applyLang(lang);

}

function applyLang(lang) {

  const dict =
    translations[lang] || translations.en;

  document
    .querySelectorAll("[data-i18n]")
    .forEach(el => {

      const key =
        el.getAttribute("data-i18n");

      if (dict[key]) {
        el.textContent = dict[key];
      }

    });

}

document.addEventListener("DOMContentLoaded", () => {

  applyLang(getLang());

  document
    .querySelectorAll("[data-lang]")
    .forEach(btn => {

      btn.addEventListener("click", () => {

        setLang(btn.dataset.lang);

      });

    });

});
