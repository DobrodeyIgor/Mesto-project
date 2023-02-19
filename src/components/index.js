import "../pages/index.css";
import { enableValidation, disabledButton } from "./validate.js";
import { createCard } from "./card.js";
import { closePopup, openPopup } from "./modal.js";
import {
  getInitialCards,
  getMe,
  editMe,
  createNewCard,
  editAvatar,
} from "./api.js";

const createPopupHTML = document.querySelector(".popup[data-type=create]");
const editPopupHTML = document.querySelector(".popup[data-type=edit]");
const imagePopupHTML = document.querySelector(".popup[data-type=img]");
const avatarPopupHTML = document.querySelector(".popup[data-type=avatar]");

const saveCardButton = createPopupHTML.querySelector(".form__submit-button");

const userNameHTML = document.querySelector(".profile__name");
const userNameInput = document.querySelector("input[name=user-name");
const userStatusHTML = document.querySelector(".profile__status");
const userStatusInput = document.querySelector("input[name=user-status");

const userAvatarHTML = document.querySelector(".profile__image");
const userAvatarInput = document.querySelector("input[name=avatar-link]");

const elementsHTML = document.querySelector(".elements");

const meId = [];

getMe()
  .then((me) => {
    userNameHTML.textContent = me.name;
    userStatusHTML.textContent = me.about;
    userAvatarHTML.src = me.avatar;
    meId[0] = me._id;
    getInitialCards()
      .then((initialCards) => {
        initialCards.forEach((card) => {
          const isOwner = me._id === card.owner._id;
          const cardHTML = createCard(
            card.name,
            card.link,
            imagePopupHTML,
            card._id,
            me._id,
            card.likes,
            isOwner
          );
          elementsHTML.append(cardHTML);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

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
const avatarPopupButtonHTML = document.querySelector(".profile__image-wrapper");
const avatarPopupExitButtonHTML = document.querySelector(
  ".popup__exit-button[data-type=avatar]"
);

editPopupButtonHTML.addEventListener("click", () => {
  openPopup(editPopupHTML);
  userNameInput.value = userNameHTML.textContent;
  userStatusInput.value = userStatusHTML.textContent;
});
editPopupExitButtonHTML.addEventListener("click", () =>
  closePopup(editPopupHTML)
);

createPopupButtonHTML.addEventListener("click", () => {
  openPopup(createPopupHTML);
  disabledButton(saveCardButton, "form__submit-button_inactive");
});

createPopupExitButtonHTML.addEventListener("click", () =>
  closePopup(createPopupHTML)
);

imagePopupExitButtonHTML.addEventListener("click", () =>
  closePopup(imagePopupHTML)
);

avatarPopupButtonHTML.addEventListener("click", () =>
  openPopup(avatarPopupHTML)
);

avatarPopupExitButtonHTML.addEventListener("click", () =>
  closePopup(avatarPopupHTML)
);

const userFormHTML = document.querySelector("form[data-type=edit]");
userFormHTML.addEventListener("submit", handleUserFormSubmit);

const userFormSubmitButton = userFormHTML.querySelector(".form__submit-button");

const cardNameInput = document.querySelector("input[name=place-name]");
const cardLinkInput = document.querySelector("input[name=place-image]");

const cardFormHTML = document.querySelector("form[data-type=create]");
cardFormHTML.addEventListener("submit", handleCardFormSubmit);

const cardFormSubmitButton = cardFormHTML.querySelector(".form__submit-button");

const avatarFormHTML = document.querySelector("form[data-type=avatar]");
avatarFormHTML.addEventListener("submit", handleAvatarFormSubmit);

const avatarFormSubmitButton = avatarFormHTML.querySelector(
  ".form__submit-button"
);

function makeButtonDownloadable(button) {
  button.disabled = true;
  button.textContent = "Сохранение...";
  button.classList.add("form__submit-button_inactive");
}

function makeButtonLoaded(button) {
  button.disabled = false;
  button.textContent = "Сохранить";
  button.classList.remove("form__submit-button_inactive");
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__text-field",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__text-field_type_error",
  errorClass: "form__text-field-error_active",
});

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  makeButtonDownloadable(avatarFormSubmitButton);
  const body = { avatar: userAvatarInput.value };
  editAvatar(body)
    .then(() => {
      userAvatarHTML.src = userAvatarInput.value;
      closePopup(avatarPopupHTML);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      makeButtonLoaded(avatarFormSubmitButton);
    });
}

function handleUserFormSubmit(evt) {
  evt.preventDefault();
  makeButtonDownloadable(userFormSubmitButton);
  const body = { name: userNameInput.value, about: userStatusInput.value };
  editMe(body)
    .then((res) => {
      userNameHTML.textContent = res.name;
      userStatusHTML.textContent = res.about;
      closePopup(editPopupHTML);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      makeButtonLoaded(userFormSubmitButton);
    });
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  makeButtonDownloadable(cardFormSubmitButton);
  const body = { name: cardNameInput.value, link: cardLinkInput.value };
  createNewCard(body)
    .then((res) => {
      const name = res.name;
      const link = res.link;
      const newCard = createCard(name, link, imagePopupHTML, res._id, meId[0]);
      elementsHTML.prepend(newCard);
      cardFormHTML.reset();
      closePopup(createPopupHTML);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      makeButtonLoaded(cardFormSubmitButton);
    });
}
