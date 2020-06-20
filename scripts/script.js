let popup = document.querySelector('.popup'); // всплывающее окно
let popupElOpen = document.querySelector('.profile__edit-button'); // кнопка правки
let popupElClose = document.querySelector('.popup__form-close'); // кнопка закрытия всплывающего окна
let profileName = document.querySelector('.profile__title'); // имя пользователя
let profileText = document.querySelector('.profile__text'); // текст профиля
let formName = document.querySelector('.popup__form-item_el_name'); // редактирования во в
let formText = document.querySelector('.popup__form-item_el_text');
let formElement = document.querySelector('.popup');
let formButton = document.querySelector('.popup__form-button');

function popupOpen() {
    formName.value = profileName.textContent;
    formText.value = profileText.textContent;
    popup.classList.toggle('popup_opened');
}

function popupHide() {
    popup.classList.toggle('popup_opened');
}


function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
    document.querySelector('.profile__title').textContent = formName.value;
    document.querySelector('.profile__text').textContent = formText.value;

    popupHide()
}

popupElOpen.addEventListener('click', popupOpen);
popupElClose.addEventListener('click', popupHide);
formElement.addEventListener('submit', formSubmitHandler);
