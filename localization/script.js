const backButton = document.querySelector(".back-button");

backButton?.addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "../";
  }
});

for (const button of document.querySelectorAll("[data-download]")) {
  button.addEventListener("click", () => {
    const label = button.querySelector("span");
    if (!label) return;

    const originalLabel = label.textContent;
    button.classList.add("is-starting");
    label.textContent = "Загрузка началась…";

    window.setTimeout(() => {
      button.classList.remove("is-starting");
      label.textContent = originalLabel;
    }, 2600);
  });
}
