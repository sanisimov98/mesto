import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import './index.css';


//const popupProfile = document.querySelector('.popup_type_profile'); // всплывающее окно
const popupProfileElOpen = document.querySelector('.profile__edit-button'); // кнопка правки
const popupProfileElClose = document.querySelector('.popup__form-close_type_profile'); // кнопка закрытия всплывающего окна
const popupAddButton = document.querySelector('.profile__add-button'); // кнопка для добавления карточек
//const popupAdd = document.querySelector('.popup_type_add-card'); // попап с формой для добавления карточек
const formCardTitle = document.querySelector('.popup__form-item_el_card-title'); // название карточки
const formCardImage = document.querySelector('.popup__form-item_el_card-image'); // картинка в карточке
const popupAddElClose = document.querySelector('.popup__form-close_type_card');
const userData = {
    userNameSelector: '.profile__title',
    userInfoSelector: '.profile__text'
}
const formName = document.querySelector('.popup__form-item_el_name'); // поле редактирования имени 
const formText = document.querySelector('.popup__form-item_el_text'); // поле редактирования информации о себе

const userInfo = new UserInfo(userData);
const popupProfile = new PopupWithForm('.popup_type_profile', handlerFormProfileSubmit);
const popupAddCard = new PopupWithForm('.popup_type_add-card', handlerCardFormSubmit);

export const popupProfileName = document.querySelector('.profile__title');
export const popupProfileText = document.querySelector('.profile__text');
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

// кнопка "добавить"
function openPopupAddCard() {
    const popupAddButton = document.querySelector('.popup__form-button');
    formCardTitle.value = '';
    formCardImage.value = '';
    popupAddCard.open();
    popupAddCard.setEventListeners(popupAddElClose);
    formValidationAdd.disableButton(popupAddButton, 'popup__form-button_disabled');
}

function openPopupProfile(){
    const userData = userInfo.getUserInfo()
    formName.value = userData['username'];
    formText.value = userData['text'];
    popupProfile.setEventListeners(popupProfileElClose);
    popupProfile.open();
}

function handlerFormProfileSubmit(evt, values) {
    evt.preventDefault();
    userInfo.setUserInfo(values);
}

function handlerCardFormSubmit(evt, values) {
    evt.preventDefault();
    const newCardValues = {};
    newCardValues['name'] = values['image__title'];
    newCardValues['link'] = values['image__link'];
    const card = new Card(newCardValues, handlerCardClick);
    const cardElement = card.generateCard();
    cardsSection.addItem(cardElement);
}

function handlerCardClick(fullscreenPopup){
    fullscreenPopup.open()
    fullscreenPopup.setEventListeners(fullscreenElClose)
}

const cardsSection = new Section({
    items: initialCards, renderer: (element) => {
        const card = new Card(element, handlerCardClick);
        const cardElement = card.generateCard();
        return cardElement;
    }
}, '.elements')

popupProfileElOpen.addEventListener('click', openPopupProfile);
//popupProfile.addEventListener('submit', handlerProfileFormSubmit);
//popupProfileElClose.addEventListener('click', () => closePopup(popupProfile));

popupAddButton.addEventListener('click', openPopupAddCard); // нажатие на "добавить"

//addCards();
cardsSection.renderItems();

const formValidationProfile = new FormValidator(initialObject, formList[0]);
const formValidationAdd = new FormValidator(initialObject, formList[1]);
formValidationProfile.enableValidation();
formValidationAdd.enableValidation();

