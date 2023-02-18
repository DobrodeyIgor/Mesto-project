import {
  deleteCard,
  getInitialCards,
  likeCard,
  likeCardRemove,
} from "./api.js";
import { openPopup } from "./modal.js";

const figure = document.querySelector(".popup__figure");
const figureImage = figure.querySelector(".popup__figure-image");
const figureCaption = figure.querySelector(".popup__figure-caption");

const templateCard = document.querySelector("#card");

function createCard(
  name,
  link,
  imagePopupHTML,
  id,
  meId,
  likes = [],
  isOwner = true
) {
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
  const favoriteCounterHTML = element.querySelector(
    ".elements__favorite-counter"
  );
  favoriteCounterHTML.textContent = likes.length;
  const favoriteButtonHTML = element.querySelector(
    ".elements__favorite-button"
  );
  const activeClass = "elements__favorite-button_active";
  const isLiked = isFavorite(likes, meId);
  if (isLiked) {
    makeFavoriteButtonFilled(favoriteButtonHTML, activeClass);
  } else {
    makeFavoriteButtonUnfilled(favoriteButtonHTML, activeClass);
  }
  favoriteButtonHTML.addEventListener("click", () =>
    toggleLike(
      favoriteButtonHTML,
      favoriteCounterHTML,
      activeClass,
      meId,
      id,
      likes
    )
  );
  const delButtonHTML = element.querySelector(".elements__remove-button");
  if (isOwner) {
    delButtonHTML.addEventListener("click", (evt) => removeCard(evt, id));
  } else {
    delButtonHTML.classList.add("elements__remove-button_inactive");
  }

  return element;
}

function toggleLike(button, likesCounter, activeClass, meId, cardId) {
  getInitialCards()
    .then((initialCards) => {
      const card = initialCards.find((item) => item._id === cardId);
      const isLiked = isFavorite(card.likes, meId);
      if (isLiked) {
        likeCardRemove(cardId).then((res) => {
          decrementLike(likesCounter, res);
          makeFavoriteButtonUnfilled(button, activeClass);
        });
      } else {
        likeCard(cardId).then((res) => {
          incrementLike(likesCounter, res);
          makeFavoriteButtonFilled(button, activeClass);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeCard(evt, id) {
  evt.stopPropagation();
  deleteCard(id)
    .then((res) => {
      if (res) {
        const parent = evt.target.closest(".elements__item");
        parent.remove();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function fillFigure(title, link) {
  figureCaption.textContent = title;
  figureImage.alt = title;
  figureImage.src = link;
}

function isFavorite(likes, meId) {
  return likes.findIndex((like) => like._id === meId) !== -1;
}

function incrementLike(likesCounter, res) {
  likesCounter.textContent = res.likes.length;
}

function decrementLike(likesCounter, res) {
  likesCounter.textContent = res.likes.length;
}

function makeFavoriteButtonFilled(button, activeClass) {
  button.classList.add(activeClass);
}

function makeFavoriteButtonUnfilled(button, activeClass) {
  button.classList.remove(activeClass);
}
export { createCard, toggleLike, removeCard, fillFigure };
