/****************************************************
 * PICAO CALDENSE - SINGLE TRANSLATION ENGINE
 ****************************************************/

const translations = {
  en: {
    title: "Picao Caldense",
    story: "Born from Colombian kitchens where food is shared, remembered, and felt.",

    nav_home: "Home",
    nav_about: "About",
    nav_order: "Order",
    nav_contact: "Contact"
  },

  fr: {
    title: "Picao Caldense",
    story: "Né des cuisines colombiennes où la nourriture est partagée, mémorisée et ressentie.",

    nav_home: "Accueil",
    nav_about: "À propos",
    nav_order: "Commander",
    nav_contact: "Contact"
  },

  es: {
    title: "Picao Caldense",
    story: "Nacido de cocinas colombianas donde la comida se comparte, se recuerda y se siente.",

    nav_home: "Inicio",
    nav_about: "Acerca de",
    nav_order: "Ordenar",
    nav_contact: "Contacto"
  }
};

/****************************************************
 * APPLY LANGUAGE (UNIFIED SYSTEM)
 ****************************************************/
function setLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = dict[key] || el.textContent;
  });

  localStorage.setItem("site-language", lang);
}

/****************************************************
 * INIT SYSTEM
 ****************************************************/
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("[data-lang]");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });

  const savedLang =
    localStorage.getItem("site-language") || "en";

  setLanguage(savedLang);
});