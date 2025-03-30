// public/font-fallback.js

document.fonts.ready.then(() => {
  const kesslerLoaded = [...document.fonts].some((font) =>
    font.family.includes("KesslerSuperDisplay")
  );
  if (!kesslerLoaded) {
    document.body.classList.add("use-light-fallback");
  }
});
