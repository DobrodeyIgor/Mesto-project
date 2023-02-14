function escapeVisior(evt, popup) {
  if (evt.code === "Escape") {
    closePopup(popup);
  }
}

function handelClickPopupOverlay(popup) {
  closePopup(popup);
}

function handelStopPropagation(evt) {
  evt.stopPropagation();
}

function closePopup(popupHTML) {
  popupHTML.classList.remove("popup_opened");
  const popupContainer = popupHTML.querySelector(".popup__container");
  popupContainer.removeEventListener("click", handelStopPropagation);
  popupHTML.removeEventListener("click", () =>
    handelClickPopupOverlay(popupHTML)
  );
  window.removeEventListener("keyup", (evt) => escapeVisior(evt, popupHTML));
}

function openPopup(popupHTML) {
  popupHTML.classList.add("popup_opened");
  const popupContainer = popupHTML.querySelector(".popup__container");
  popupContainer.addEventListener("click", handelStopPropagation);
  popupHTML.addEventListener("click", () => handelClickPopupOverlay(popupHTML));
  window.addEventListener("keyup", (evt) => escapeVisior(evt, popupHTML));
}

export { escapeVisior, handelClickPopupOverlay, closePopup, openPopup };
