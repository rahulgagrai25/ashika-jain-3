(function () {
  function blockEvent(e) {
    if (!e) return false;
    if (typeof e.preventDefault === "function") e.preventDefault();
    if (typeof e.stopPropagation === "function") e.stopPropagation();
    if (typeof e.stopImmediatePropagation === "function")
      e.stopImmediatePropagation();
    return false;
  }

  // Block all anchor navigations (including http(s), mailto, tel, hash, fragments)
  document.addEventListener(
    "click",
    function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
      if (!a) return;
      return blockEvent(e);
    },
    true
  );

  // Block form submissions
  document.addEventListener(
    "submit",
    function (e) {
      return blockEvent(e);
    },
    true
  );

  // Neutralize programmatic navigation attempts
  try {
    window.open = function () {
      return null;
    };
  } catch (_) {}
  try {
    var noop = function () {};
    history.pushState = noop;
    history.replaceState = noop;
  } catch (_) {}
  try {
    if (window.location) {
      window.location.assign = function () {};
      window.location.replace = function () {};
    }
  } catch (_) {}
})();
