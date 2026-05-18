/****************************************************
 * 1. TRANSLATION DATABASE
 ****************************************************/
const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_order: "Order",
    nav_contact: "Contact",

    story:
      "Our Colombian Heritage — a generational recipe carried through time, refined, remembered, and reimagined into every bottle today.",

    philosophy_title: "A Recipe Passed Through Generations",
    philosophy_text:
      "Picao Caldense began long before it became a brand. It started as a family recipe, born in Colombian kitchens where nothing was written down—only remembered. The sauce was passed from hand to hand, generation to generation, each one preserving its essence while quietly adding its own touch.",

    craft_title: "From Home Kitchens to a Signature Sauce",
    craft_text:
      "What once belonged to everyday family meals has evolved into a signature creation. Picao Caldense stays rooted in its origins while embracing craft and precision—honoring the bold, fresh, and vibrant character of Colombian cuisine, refined for today’s table.",

    heritage_title: "Crafted in the Present, Rooted in the Past",
    heritage_text:
      "Each bottle exists between two worlds: memory and modernity. We preserve the soul of the original recipe while elevating its consistency, balance, and depth. The result is a sauce that feels familiar, yet unmistakably refined.",

    identity_title: "Our Identity",
    identity_text:
      "Picao Caldense is more than a condiment—it is heritage made tangible. A story of family, culture, and continuity, transformed into a modern Société des sauces built on authenticity, pride, and craft."
  },

  fr: {
    nav_home: "Accueil",
    nav_about: "À propos",
    nav_order: "Commander",
    nav_contact: "Contact",

    story:
      "Notre héritage colombien — une recette générationnelle transmise à travers le temps, affinée, mémorisée et réinventée dans chaque bouteille aujourd’hui.",

    philosophy_title: "Une recette transmise de génération en génération",
    philosophy_text:
      "Picao Caldense est né bien avant de devenir une marque. C’était une recette familiale, issue des cuisines colombiennes où rien n’était écrit—seulement mémorisé. La sauce passait de main en main, de génération en génération, chacun préservant son essence tout en y apportant subtilement sa touche.",

    craft_title: "Des cuisines familiales à une sauce signature",
    craft_text:
      "Autrefois réservée aux repas du quotidien, elle est devenue une création signature. Picao Caldense reste fidèle à ses origines tout en intégrant savoir-faire et précision—honorant le caractère audacieux et vibrant de la cuisine colombienne, raffiné pour la table d’aujourd’hui.",

    heritage_title: "Façonné dans le présent, enraciné dans le passé",
    heritage_text:
      "Chaque bouteille existe entre mémoire et modernité. Nous préservons l’âme de la recette originale tout en améliorant sa constance, son équilibre et sa profondeur. Le résultat est une sauce familière, mais clairement raffinée.",

    identity_title: "Notre identité",
    identity_text:
      "Picao Caldense est plus qu’un condiment—c’est un héritage rendu tangible. Une histoire de famille, de culture et de continuité transformée en une Société des sauces moderne fondée sur l’authenticité, la fierté et le savoir-faire."
  },

  es: {
    nav_home: "Inicio",
    nav_about: "Acerca de",
    nav_order: "Ordenar",
    nav_contact: "Contacto",

    story:
      "Nuestra herencia colombiana — una receta generacional transmitida a través del tiempo, refinada, recordada y reinventada en cada botella hoy en día.",

    philosophy_title: "Una receta transmitida de generación en generación",
    philosophy_text:
      "Picao Caldense nació mucho antes de convertirse en una marca. Comenzó como una receta familiar en cocinas colombianas donde nada se escribía—solo se recordaba. La salsa pasaba de mano en mano, generación tras generación, cada una preservando su esencia mientras añadía su propio toque.",

    craft_title: "De cocinas familiares a una salsa insignia",
    craft_text:
      "Lo que antes pertenecía a las comidas cotidianas se convirtió en una creación insignia. Picao Caldense se mantiene fiel a sus raíces mientras adopta técnica y precisión—honrando el carácter vibrante y audaz de la cocina colombiana, refinada para la mesa de hoy.",

    heritage_title: "Creado en el presente, arraigado en el pasado",
    heritage_text:
      "Cada botella existe entre memoria y modernidad. Preservamos el alma de la receta original mientras mejoramos su equilibrio, consistencia y profundidad. El resultado es una salsa familiar, pero claramente refinada.",

    identity_title: "Nuestra identidad",
    identity_text:
      "Picao Caldense es más que un condimento—es patrimonio hecho tangible. Una historia de familia, cultura y continuidad transformada en una Société des sauces moderna basada en autenticidad, orgullo y oficio."
  }
};

/****************************************************
 * 2. LANGUAGE SWITCH FUNCTION (SAFE)
 ****************************************************/
function setLanguage(lang) {
  const dict = translations[lang];

  if (!dict) return;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");

    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // optional: store preference
  localStorage.setItem("site-language", lang);
}

/****************************************************
 * 3. INIT + BUTTON HANDLING (SAFE WINDOW BOOT)
 ****************************************************/
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("[data-lang]");

  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
    });
  });

  /****************************************************
   * 4. AUTO RESTORE SAVED LANGUAGE
   ****************************************************/
  const savedLang = localStorage.getItem("site-language") || "en";
  setLanguage(savedLang);
});