import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { API } from "../components/API.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit.js";
import "./index.css";

const popupProfileElOpen = document.querySelector(".profile__edit-button"); // кнопка правки
const popupProfileElClose = document.querySelector(
  ".popup__form-close_type_profile"
); // кнопка закрытия всплывающего окна
const popupAddButton = document.querySelector(".profile__add-button"); // кнопка для добавления карточек
const formCardTitle = document.querySelector(".popup__form-item_el_card-title"); // название карточки
const formCardImage = document.querySelector(".popup__form-item_el_card-image"); // картинка в карточке
const popupAddElClose = document.querySelector(".popup__form-close_type_card");
const userData = {
  userNameSelector: ".profile__title",
  userInfoSelector: ".profile__text",
  userImageSelector: ".profile__picture",
};
const formName = document.querySelector(".popup__form-item_el_name"); // поле редактирования имени
const formText = document.querySelector(".popup__form-item_el_text"); // поле редактирования информации о себе
const profilePicture = document.querySelector(".profile__picture");
const profilePictureContainer = document.querySelector(
  ".profile__picture-container"
);
const profilePictureFormElClose = document.querySelector(
  ".popup__form-close_type_profile-image"
);

export const userInfo = new UserInfo(userData);
const popupProfile = new PopupWithForm(
  ".popup_type_profile",
  handlerFormProfileSubmit
);
const popupAddCard = new PopupWithForm(
  ".popup_type_add-card",
  handlerCardFormSubmit
);
const popupProfileImage = new PopupWithForm(
  ".popup_type_profile-image",
  handlerProfileImageFormSubmit
);
const popupConfirmation = new PopupWithSubmit(
  ".popup__confirmation",
  confirmDelete
);
const popupConfirmationElClose = document.querySelector(
  ".popup__form-close_type_confirmation"
);

const fullscreenPopup = new PopupWithImage(".popup__fullscreen");
export const api = new API({
  baseURL: "https://mesto.nomoreparties.co/v1/cohort-14",
  headers: {
    authorization: "57c05f36-a8d9-486d-bc00-4738c3850df5",
    "Content-Type": "application/json",
  },
});

export const popupProfileName = document.querySelector(".profile__title");
export const popupProfileText = document.querySelector(".profile__text");
export const fullscreen = document.querySelector(".popup__fullscreen"); //во весь экран
export const fullscreenElClose = document.querySelector(
  ".popup__fullscreen-close"
); //кнопка закрытия изображения во весь экран
export const cards = document.querySelector(".elements");
export const confirmationPopup = document.querySelector(
  ".popup_type_confirmation"
);
const confirmationSubmit = document.querySelector(
  ".popup__confirmation-button"
);
export const userDataFromServer = api
  .getUserData()
  .catch((err) => console.log(err));

const popupAddFormButton = document.querySelector(
  ".popup__form-button_type_add"
);
export const fullscreenImage = document.querySelector(
  ".popup__fullscreen-image"
);
export const fullscreenCaption = document.querySelector(
  ".popup__fullscreen-caption"
);

const initialObject = {
  formSelector: ".popup",
  inputSelector: ".popup__form-item",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_disabled",
  inputErrorClass: "popup__form-item_type_error",
  errorClass: "popup__form-error_active",
};

const formList = Array.from(
  document.querySelectorAll(initialObject.formSelector)
); // все формы

// кнопка "добавить"
function openPopupAddCard() {
  formCardTitle.value = "";
  formCardImage.value = "";
  popupAddCard.open();
  formValidationAdd.disableButton(
    popupAddFormButton,
    "popup__form-button_disabled"
  );
}

function openPopupProfile() {
  const userData = userInfo.getUserInfo();
  formName.value = userData["username"];
  formText.value = userData["text"];
  popupProfile.open();
}

function openPopupProfileImage() {
  popupProfileImage.open();
}

export function createCard(element) {
  const card = new Card(
    element,
    handlerCardClick,
    handlerLikeClick,
    handlerDeleteClick,
    userDataFromServer
  );
  const cardElement = card.generateCard();
  return cardElement;
}

function handlerFormProfileSubmit(evt, values) {
  evt.preventDefault();
  api
    .setProfileData(values)
    .then((res) => {
      userInfo.setUserInfo({
        username: res.name,
        text: res.about,
        avatar: res.avatar,
      });
      popupProfile.close();
    })
    .catch((err) => console.log(err));
}
const initialCards = [];
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".elements"
);

function handlerCardFormSubmit(evt, values) {
  evt.preventDefault();
  const newCardValues = {};
  newCardValues["name"] = values["image__title"];
  newCardValues["link"] = values["image__link"];
  api
    .sendNewCard(newCardValues)
    .then((res) => {
      const newCard = createCard(res);
      cardsSection.addItem(newCard);
      popupAddCard.close();
    })
    .catch((err) => console.log(err));
}

function handlerProfileImageFormSubmit(evt, value) {
  evt.preventDefault();
  api
    .setProfileImage(value["profile-image"])
    .then((res) => {
      profilePicture.src = res.avatar;
      popupProfileImage.close();
    })
    .catch((err) => console.log(err));
}

fullscreenPopup.setEventListeners(fullscreenElClose);

function handlerCardClick(name, link) {
  fullscreenPopup.open(name, link);
}

function handlerLikeClick(likeButton, cardID, elementLikesCounter) {
  likeButton.addEventListener("click", function () {
    if (likeButton.classList.contains("element__like_active")) {
      api
        .dislikeButton(cardID)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          likeButton.classList.remove("element__like_active");
          elementLikesCounter.textContent = `${res.likes.length}`;
        })
        .catch((err) => console.log(err));
    } else {
      api
        .likeButton(cardID)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          likeButton.classList.add("element__like_active");
          elementLikesCounter.textContent = `${res.likes.length}`;
        })
        .catch((err) => console.log(err));
    }
  });
}

function handlerDeleteClick(deleteButton, element, id) {
  deleteButton.addEventListener("click", function () {
    popupConfirmation.open();
    popupConfirmation.setEventListeners(popupConfirmationElClose, element, id);
  });
}

function confirmDelete(element, id) {
  api
    .deleteCard(id)
    .then((res) => {
      element.remove();
      popupConfirmation.close();
    })
    .catch((err) => console.log(err));
}

export function renderLoading(isLoading, button, buttonText) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = buttonText;
  }
}

popupAddCard.setEventListeners(popupAddElClose);
popupProfile.setEventListeners(popupProfileElClose);
popupProfileImage.setEventListeners(profilePictureFormElClose);
popupProfileElOpen.addEventListener("click", openPopupProfile);
popupAddButton.addEventListener("click", openPopupAddCard); // нажатие на "добавить"
profilePictureContainer.addEventListener("click", openPopupProfileImage);

const formValidationProfile = new FormValidator(initialObject, formList[0]);
const formValidationAdd = new FormValidator(initialObject, formList[1]);
const formValidationProfileImage = new FormValidator(
  initialObject,
  formList[2]
);
formValidationProfile.enableValidation();
formValidationAdd.enableValidation();
formValidationProfileImage.enableValidation();

Promise.all([
  api.getInitialCards().catch((err) => console.log(err)),
  userDataFromServer,
]).then(([initialCards, userData]) => {
  userInfo.setUserInfo({
    username: userData.name,
    text: userData.about,
    avatar: userData.avatar,
  });
  const cardsSection = new Section(
    {
      items: initialCards,
      renderer: createCard,
    },
    ".elements"
  );
  cardsSection.renderItems();
});
