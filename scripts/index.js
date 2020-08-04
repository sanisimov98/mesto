import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';

const popupProfile = document.querySelector('.popup_type_profile'); // всплывающее окно
const popupProfileElOpen = document.querySelector('.profile__edit-button'); // кнопка правки
const popupProfileElClose = document.querySelector('.popup__form-close_type_profile'); // кнопка закрытия всплывающего окна
const profileName = document.querySelector('.profile__title'); // имя пользователя
const profileText = document.querySelector('.profile__text'); // текст профиля
const formName = document.querySelector('.popup__form-item_el_name'); // поле редактирования имени 
const formText = document.querySelector('.popup__form-item_el_text'); // поле редактирования информации о работе
const popupAddButton = document.querySelector('.profile__add-button'); // кнопка для добавления карточек
const popupAdd = document.querySelector('.popup_type_add-card'); // попап с формой для добавления карточек
const formCardTitle = document.querySelector('.popup__form-item_el_card-title'); // название карточки
const formCardImage = document.querySelector('.popup__form-item_el_card-image'); // картинка в карточке
const popupAddElClose = document.querySelector('.popup__form-close_type_card');
export const cardFullscreen = document.querySelector('.popup__fullscreen-image');
export const fullscreen = document.querySelector('.popup__fullscreen'); //во весь экран
export const fullscreenElClose = document.querySelector('.popup__fullscreen-close'); //кнопка закрытия изображения во весь экран
export const cards = document.querySelector('.elements');
export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const initialObject = {
    formSelector: '.popup',
    inputSelector: '.popup__form-item',
    submitButtonSelector: '.popup__form-button',
    inactiveButtonClass: 'popup__form-button_disabled',
    inputErrorClass: 'popup__form-item_type_error',
    errorClass: 'popup__form-error_active'
}

const formList = Array.from(document.querySelectorAll(initialObject.formSelector)); // все формы

// функция, добавляющая в пустые поля формы изменения профиля имеющиеся значения
function openPopupProfile() {
    openPopup(popupProfile, 'popup_opened');
    formName.value = profileName.textContent;
    formText.value = profileText.textContent;
}

// кнопка "добавить"
function openPopupAddCard() {
    const popupAddButton = popupAdd.querySelector('.popup__form-button');
    formCardTitle.value = '';
    formCardImage.value = '';
    openPopup(popupAdd);
    formValidationAdd.disableButton(popupAddButton, 'popup__form-button_disabled')
}

// обработчик формы изменения профиля
function handlerProfileFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = formName.value;
    profileText.textContent = formText.value;

    closePopup(popupProfile);
}

function handlerCardFormSubmit(evt) {
    evt.preventDefault();

    const newCardValues = {};
    newCardValues['name'] = formCardTitle.value;
    newCardValues['link'] = formCardImage.value;
    const card = new Card(newCardValues);
    const cardElement = card.generateCard();
    //добавление собранной карточки в html
    cards.append(cardElement);
    closePopup(popupAdd);
}


const addCards = () => {
    initialCards.forEach((element) => {
        const card = new Card(element);
        const cardElement = card.generateCard();
        cards.append(cardElement);
    })
}

fullscreenElClose.addEventListener('click', () => closePopup(fullscreen));
popupProfileElOpen.addEventListener('click', openPopupProfile);
popupProfile.addEventListener('submit', handlerProfileFormSubmit);
popupProfileElClose.addEventListener('click', () => closePopup(popupProfile, 'popup_opened'));

popupAddButton.addEventListener('click', openPopupAddCard); // нажатие на "добавить"
popupAdd.addEventListener('submit', handlerCardFormSubmit); // отправка формы с новой карточкой
popupAddElClose.addEventListener('click', () => closePopup(popupAdd)); // закрытие формы

addCards();

const formValidationProfile = new FormValidator(initialObject, formList[0]);
const formValidationAdd = new FormValidator(initialObject, formList[1]);
formValidationProfile.enableValidation();
formValidationAdd.enableValidation();

