function handleEscape(evt) {
  if (evt.code === "Escape") {
    closeAllPopups();
  }
}

function handleStopPropagation(evt) {
  evt.stopPropagation();
}

function closePopup(popupHTML) {
  popupHTML.classList.remove("popup_opened");
  const popupContainer = popupHTML.querySelector(".popup__container");
  popupContainer.addEventListener("click", handleStopPropagation);
  popupHTML.addEventListener("click", closeAllPopups);
  window.addEventListener("keyup", handleEscape);
}

function openPopup(popupHTML) {
  popupHTML.classList.add("popup_opened");
  const popupContainer = popupHTML.querySelector(".popup__container");
  popupContainer.addEventListener("click", handleStopPropagation);
  popupHTML.addEventListener("click", closeAllPopups);
  window.addEventListener("keyup", handleEscape);
}

function findOpenedPopups() {
  const openedPopups = document.querySelectorAll(".popup_opened");
  return Array.from(openedPopups);
}

function closeAllPopups() {
  const openedPopups = findOpenedPopups();
  openedPopups.forEach((popup) => {
    closePopup(popup);
  });
}

export { handleEscape, closeAllPopups, closePopup, openPopup };
