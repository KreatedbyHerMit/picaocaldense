const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_order: "Order",
    nav_contact: "Contact",
    footer: "© 2025 Picao Caldense",
    tagline: "Luxury Colombian sauce tradition refined through heritage, craftsmanship, and flavor."
  },
  fr: {
    nav_home: "Accueil",
    nav_about: "À propos",
    nav_order: "Commander",
    nav_contact: "Contact",
    footer: "© 2025 Picao Caldense",
    tagline: "Une tradition de sauce colombienne de luxe raffinée par l’héritage, le savoir-faire et la saveur."
  },
  es: {
    nav_home: "Inicio",
    nav_about: "Acerca de",
    nav_order: "Ordenar",
    nav_contact: "Contacto",
    footer: "© 2025 Picao Caldense",
    tagline: "Tradición de salsa colombiana de lujo refinada a través de la herencia, la artesanía y el sabor."
  }
};

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang]?.[key]) {
      el.textContent = translations[lang][key];
    }
  });

  localStorage.setItem("lang", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  setLanguage(localStorage.getItem("lang") || "en");
});
