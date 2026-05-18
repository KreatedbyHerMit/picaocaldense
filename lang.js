const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_order: "Order",
    nav_contact: "Contact",
    footer: "© 2025 Picao Caldense"
  },

  fr: {
    nav_home: "Accueil",
    nav_about: "À propos",
    nav_order: "Commander",
    nav_contact: "Contact",
    footer: "© 2025 Picao Caldense"
  },

  es: {
    nav_home: "Inicio",
    nav_about: "Acerca de",
    nav_order: "Ordenar",
    nav_contact: "Contacto",
    footer: "© 2025 Picao Caldense"
  }
};

function setLanguage(lang){
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");

    if(translations[lang] && translations[lang][key]){
      el.textContent = translations[lang][key];
    }
  });

  localStorage.setItem("lang",lang);
}

document.addEventListener("DOMContentLoaded",()=>{
  setLanguage(localStorage.getItem("lang") || "en");
});

window.setLanguage = setLanguage;
