(() => {
  const pixelId = "625951054642771";
  const storageKey = "unika_marketing_consent";
  const banner = document.getElementById("consent-banner");

  function loadMetaPixel() {
    if (window.fbq) return;
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", pixelId);
    fbq("track", "PageView");
    document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
      link.addEventListener("click", () => fbq("track", "Contact", { content_name: "Primera sesión MEGAN 3 en 1 · 45 €" }));
    });
  }

  const consent = localStorage.getItem(storageKey);
  if (consent === "accepted") loadMetaPixel();
  else if (consent !== "rejected") banner.hidden = false;

  document.querySelector(".consent-accept")?.addEventListener("click", () => {
    localStorage.setItem(storageKey, "accepted");
    banner.hidden = true;
    loadMetaPixel();
  });
  document.querySelector(".consent-reject")?.addEventListener("click", () => {
    localStorage.setItem(storageKey, "rejected");
    banner.hidden = true;
  });
})();
