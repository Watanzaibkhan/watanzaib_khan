const intro = document.getElementById("intro");
const site = document.getElementById("site");
const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {
  intro.classList.add("hidden");
  site.classList.remove("hidden");
});