import "../pages/index.css";
import { hasInvalidInput, enableValidation } from "./validate.js";
import { createCard } from "./card.js";
import { closePopup, openPopup } from "./modal.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const createPopupHTML = document.querySelector(".popup[data-type=create]");
const editPopupHTML = document.querySelector(".popup[data-type=edit]");
const imagePopupHTML = document.querySelector(".popup[data-type=img]");

const editPopupButtonHTML = document.querySelector(
  ".profile__button_move_edit"
);
const editPopupExitButtonHTML = document.querySelector(
  ".popup__exit-button[data-type=edit]"
);
const createPopupButtonHTML = document.querySelector(
  ".profile__button_move_add"
);
const createPopupExitButtonHTML = document.querySelector(
  ".popup__exit-button[data-type=create]"
);
const imagePopupExitButtonHTML = document.querySelector(
  ".popup__exit-button[data-type=img]"
);

editPopupButtonHTML.addEventListener("click", () => openPopup(editPopupHTML));
editPopupExitButtonHTML.addEventListener("click", () =>
  closePopup(editPopupHTML)
);

createPopupButtonHTML.addEventListener("click", () =>
  openPopup(createPopupHTML)
);
createPopupExitButtonHTML.addEventListener("click", () =>
  closePopup(createPopupHTML)
);

imagePopupExitButtonHTML.addEventListener("click", () =>
  closePopup(imagePopupHTML)
);

const elementsHTML = document.querySelector(".elements");

initialCards.forEach((card) => {
  const cardHTML = createCard(card.name, card.link, imagePopupHTML);
  elementsHTML.append(cardHTML);
});

const userNameHTML = document.querySelector(".profile__name");
const userNameInput = document.querySelector("input[name=user-name");
const userStatusHTML = document.querySelector(".profile__status");
const userStatusInput = document.querySelector("input[name=user-status");

userNameInput.value = userNameHTML.textContent;
userStatusInput.value = userStatusHTML.textContent;

const userFormHTML = document.querySelector("form[data-type=edit]");
userFormHTML.addEventListener("submit", handleUserFormSubmit);

const cardNameInput = document.querySelector("input[name=place-name]");
const cardLinkInput = document.querySelector("input[name=place-image]");

const cardFormHTML = document.querySelector("form[data-type=create]");
cardFormHTML.addEventListener("submit", handleCardFormSubmit);

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__text-field",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__text-field_type_error",
  errorClass: "form__text-field-error_active",
});

function handleUserFormSubmit(evt) {
  evt.preventDefault();
  const inputList = Array.from(
    userFormHTML.querySelectorAll(`.form__text-field`)
  );
  const isInvalid = hasInvalidInput(inputList);
  if (!isInvalid) {
    userNameHTML.textContent = userNameInput.value;
    userStatusHTML.textContent = userStatusInput.value;
    closePopup(editPopupHTML);
  }
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const inputList = Array.from(
    cardFormHTML.querySelectorAll(`.form__text-field`)
  );
  const isInvalid = hasInvalidInput(inputList);
  if (!isInvalid) {
    const name = cardNameInput.value;
    const link = cardLinkInput.value;
    const newCard = createCard(name, link, imagePopupHTML);
    elementsHTML.prepend(newCard);
    closePopup(createPopupHTML);
    cardNameInput.value = "";
    cardLinkInput.value = "";
  }
}
