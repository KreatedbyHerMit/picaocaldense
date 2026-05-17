const translations = {
  en: {
    title: "Picao Caldense",
    story: "Born from Colombian kitchens where food is shared, remembered, and felt."
  },
  fr: {
    title: "Picao Caldense",
    story: "Né des cuisines colombiennes où la nourriture est partagée, mémorisée et ressentie."
  },
  es: {
    title: "Picao Caldense",
    story: "Nacido de cocinas colombianas donde la comida se comparte, se recuerda y se siente."
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
  const dict = translations[lang] || translations.en;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.innerText = dict[key];
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyLang(getLang());

  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", () => {
      setLang(btn.dataset.lang);
    });
  });
});
