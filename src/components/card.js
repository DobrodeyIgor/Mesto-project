import { closePopup, openPopup } from "./modal.js";

const templateCard = document.querySelector("#card");

function createCard(name, link, imagePopupHTML) {
  const element = templateCard.content.cloneNode(true).querySelector("div");
  const nameHTML = element.querySelector(".elements__item-title");
  nameHTML.title = name;
  nameHTML.textContent = name;
  const imgHTML = element.querySelector(".elements__image");
  imgHTML.alt = name;
  imgHTML.src = link;
  imgHTML.addEventListener("click", () => {
    fillFigure(name, link);
    openPopup(imagePopupHTML);
  });
  const favoriteButtonHTML = element.querySelector(
    ".elements__favorite-button"
  );
  favoriteButtonHTML.addEventListener("click", switchFavoriteCard);
  const delButtonHTML = element.querySelector(".elements__remove-button");
  delButtonHTML.addEventListener("click", removeCard);
  return element;
}

function switchFavoriteCard(evt) {
  const button = evt.target;
  const activeClass = "elements__favorite-button_active";
  button.classList.toggle(activeClass);
}

function removeCard(evt) {
  evt.stopPropagation();
  const parent = evt.target.closest(".elements__item");
  parent.remove();
}

function fillFigure(title, link) {
  const figure = document.querySelector(".popup__figure");
  const figureCaption = figure.querySelector(".popup__figure-caption");
  figureCaption.textContent = title;
  const figureImage = figure.querySelector(".popup__figure-image");
  figureImage.alt = title;
  figureImage.src = link;
}

export { createCard, switchFavoriteCard, removeCard, fillFigure };
