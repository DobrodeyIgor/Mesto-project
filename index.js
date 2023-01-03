const initialUser = { name: "Жак-Ив Кусто", status: "Исследователь океана" };

let initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    id: 1,
    favorite: false,
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    id: 2,
    favorite: false,
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    id: 3,
    favorite: false,
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    id: 4,
    favorite: false,
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    id: 5,
    favorite: false,
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    id: 6,
    favorite: false,
  },
];

const userNameElement = document.getElementById("user-name");
toggleHTMLText(userNameElement, initialUser.name);

const userStatusElement = document.getElementById("user-status");
toggleHTMLText(userStatusElement, initialUser.status);

const userEditButton = document.getElementById("edit-button");
userEditButton.addEventListener("click", openEditModal);

const userEditPopup = document.getElementById("edit-popup");

const userEditPopupCloseButton = document.getElementById(
  "edit-popup-close-button"
);
userEditPopupCloseButton.addEventListener("click", closeEditModal);

const addPlacesButton = document.getElementById("add-places-button");
addPlacesButton.addEventListener("click", openAddPlacesModal);

const addPlacesPopup = document.getElementById("add-places-popup");

const addPlacesPopupCloseButton = document.getElementById(
  "add-places-popup-close-button"
);
addPlacesPopupCloseButton.addEventListener("click", closeAddPlacesModal);

const userNameInput = document.querySelector("input[name=user-name]");
userNameInput.defaultValue = initialUser.name;

const userStatusInput = document.querySelector("input[name=user-status]");
userStatusInput.defaultValue = initialUser.status;

const userEditForm = document.getElementById("edit-user-form");
userEditForm.addEventListener("submit", handleFormSubmit);

const placeNameInput = document.querySelector("input[name=place-name]");

const placeImageInput = document.querySelector("input[name=place-image]");

const addPlaceForm = document.getElementById("add-places-form");
addPlaceForm.addEventListener("submit", handleAddPlaceFormSubmit);

const cardsElement = document.getElementById("cards");
appendCards(cardsElement);

const popupFigure = document.getElementById("popup-image-figure");

const popupImage = document.getElementById("popup-image");
const popupImageCloseButton = document.getElementById(
  "popup-image-close-button"
);
popupImageCloseButton.addEventListener("click", closeImagePopup);

function handleFormSubmit(evt) {
  evt.preventDefault();
  initialUser.name = userNameInput.value;
  initialUser.status = userStatusInput.value;
  userNameInput.defaultValue = initialUser.name;
  userStatusInput.defaultValue = initialUser.status;
  toggleHTMLText(userNameElement, initialUser.name);
  toggleHTMLText(userStatusElement, initialUser.status);
  closeEditModal();
}

function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();
  const placeElement = {
    id: initialCards.length,
    favorite: false,
    name: placeNameInput.value,
    link: placeImageInput.value,
  };
  initialCards.unshift(placeElement);
  appendCards(cardsElement);
  closeAddPlacesModal();
}

function openEditModal() {
  userEditPopup.classList.add("popup_opened");
}

function closeEditModal() {
  userEditPopup.classList.remove("popup_opened");
  resetUserInputs();
}

function resetUserInputs() {
  userEditForm.reset();
}

function openAddPlacesModal() {
  addPlacesPopup.classList.add("popup_opened");
}

function closeAddPlacesModal() {
  addPlacesPopup.classList.remove("popup_opened");
  resetPlacesInputs();
}

function resetPlacesInputs() {
  userEditForm.reset();
}

function toggleHTMLText(element, value) {
  element.textContent = value;
}

function appendCards(element) {
  element.innerHTML = "";
  initialCards.forEach((card) => {
    const cardId = card.id;
    const cardFavorite = card.favorite;
    const cardName = card.name;
    const cardLink = card.link;
    const cardsElement = createPlacesCard(
      cardName,
      cardLink,
      cardId,
      cardFavorite
    );
    element.append(cardsElement);
  });
}

function createPlacesCard(name, link, id, favorite) {
  const cardImage = document.createElement("img");
  cardImage.classList.add("elements__image");
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener("click", () =>
    openImagePopupAndFillFigure(name, link)
  );

  const cardRemoveButton = document.createElement("button");
  cardRemoveButton.classList.add("elements__remove-button");
  cardRemoveButton.type = "button";
  cardRemoveButton.dataset.id = id;
  cardRemoveButton.addEventListener("click", removeCard);

  const cardFavoriteButton = document.createElement("button");
  if (favorite) {
    cardFavoriteButton.classList.add("elements__favorite-button_active");
  }
  cardFavoriteButton.classList.add("elements__favorite-button");
  cardFavoriteButton.type = "button";
  cardFavoriteButton.dataset.id = id;
  cardFavoriteButton.addEventListener("click", makeFavoriteCard);

  const cardTitle = document.createElement("h2");
  cardTitle.classList.add("elements__item-title");
  cardTitle.title = name;
  cardTitle.textContent = name;

  const cardDescription = document.createElement("div");
  cardDescription.classList.add("elements__item-description");
  cardDescription.append(cardTitle, cardFavoriteButton);

  const cardBody = document.createElement("div");
  cardBody.classList.add("elements__item");
  cardBody.append(cardImage, cardRemoveButton, cardDescription);

  return cardBody;
}

function removeCard(evt) {
  evt.stopPropagation();
  const element = evt.target;
  const elementId = element.dataset.id;
  const filteredCards = initialCards.filter((card) => card.id != elementId);
  initialCards = filteredCards;
  appendCards(cardsElement);
}

function makeFavoriteCard(evt) {
  evt.stopPropagation();
  const element = evt.target;
  const isFavorite = element.classList.contains(
    "elements__favorite-button_active"
  );
  const elementId = element.dataset.id;
  const updatedCards = initialCards.map((card) => {
    if (card.id != elementId) {
      return card;
    }
    return { ...card, favorite: isFavorite ? false : true };
  });
  initialCards = updatedCards;
  appendCards(cardsElement);
}

function openImagePopupAndFillFigure(title, link) {
  openImagePopup();
  fillFigure(title, link);
}

function openImagePopup() {
  popupImage.classList.add("popup_opened");
}

function closeImagePopup() {
  popupImage.classList.remove("popup_opened");
}

function fillFigure(title, link) {
  popupFigure.innerHTML = "";
  const figureCaption = createFigureCaption(title);
  const figureImage = createFigureImage(title, link);
  popupFigure.append(figureImage, figureCaption);
}

function createFigureCaption(title) {
  const figureCaption = document.createElement("figurecaption");
  figureCaption.classList.add("popup__figure-caption");
  figureCaption.textContent = title;
  return figureCaption;
}

function createFigureImage(title, link) {
  const figureImage = document.createElement("img");
  figureImage.classList.add("popup__figure-image");
  figureImage.src = link;
  figureImage.alt = title;
  return figureImage;
}
