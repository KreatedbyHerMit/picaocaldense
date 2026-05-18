const translations = {

  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_order: "Order",
    nav_contact: "Contact",

    home_title: "Picao Caldense",
    home_tagline: "Luxury Colombian sauce tradition refined through generations.",

    about_title: "About",
    about_text: "Picao Caldense is inspired by authentic Colombian culinary tradition crafted in small batches with bold flavor and refined character.",

    order_title: "Order",
    contact_title: "Contact",

    footer: "© 2025 Picao Caldense"
  },

  fr: {
    nav_home: "Accueil",
    nav_about: "À propos",
    nav_order: "Commander",
    nav_contact: "Contact",

    home_title: "Picao Caldense",
    home_tagline: "Une tradition de sauce colombienne de luxe raffinée à travers les générations.",

    about_title: "À propos",
    about_text: "Picao Caldense est inspiré de la tradition culinaire colombienne authentique fabriquée en petites quantités avec une saveur raffinée.",

    order_title: "Commander",
    contact_title: "Contact",

    footer: "© 2025 Picao Caldense"
  },

  es: {
    nav_home: "Inicio",
    nav_about: "Acerca de",
    nav_order: "Ordenar",
    nav_contact: "Contacto",

    home_title: "Picao Caldense",
    home_tagline: "Tradición de salsa colombiana de lujo refinada a través de generaciones.",

    about_title: "Acerca de",
    about_text: "Picao Caldense está inspirado en la auténtica tradición culinaria colombiana elaborada en pequeños lotes con sabor refinado.",

    order_title: "Ordenar",
    contact_title: "Contacto",

    footer: "© 2025 Picao Caldense"
  }

};

function setLanguage(lang){

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {

    const key = el.getAttribute("data-i18n");

    if(translations[lang] && translations[lang][key]){
      el.textContent = translations[lang][key];
    }

  });

  localStorage.setItem("lang", lang);

}

document.addEventListener("DOMContentLoaded", () => {

  const savedLang = localStorage.getItem("lang") || "en";

  setLanguage(savedLang);

});

window.setLanguage = setLanguage;
