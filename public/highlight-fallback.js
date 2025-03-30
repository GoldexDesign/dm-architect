console.log("➡ highlight-fallback.js LOADED");

function runFallbackHighlighter() {
  console.log("➡ highlight-fallback.js RUNNING");

  const regex = /[čćžšđČĆŽŠĐ]/g;

  const walk = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const matches = node.nodeValue.match(regex);
      if (!matches) return;

      const frag = document.createDocumentFragment();
      const parts = node.nodeValue.split(regex);
      const chars = node.nodeValue.match(regex);

      parts.forEach((part, i) => {
        frag.appendChild(document.createTextNode(part));
        if (chars && chars[i]) {
          const span = document.createElement("span");
          span.className = "fallback-char";
          span.textContent = chars[i];
          frag.appendChild(span);
        }
      });

      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (
        ["SCRIPT", "STYLE", "NOSCRIPT", "IFRAME", "IMG"].includes(node.tagName)
      )
        return;
      for (let child of [...node.childNodes]) {
        walk(child);
      }
    }
  };

  walk(document.body);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", runFallbackHighlighter);
} else {
  runFallbackHighlighter();
}
