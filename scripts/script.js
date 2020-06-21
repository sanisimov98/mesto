let popup = document.querySelector('.popup'); // всплывающее окно
let popupElOpen = document.querySelector('.profile__edit-button'); // кнопка правки
let popupElClose = document.querySelector('.popup__form-close'); // кнопка закрытия всплывающего окна
let profileName = document.querySelector('.profile__title'); // имя пользователя
let profileText = document.querySelector('.profile__text'); // текст профиля
let formName = document.querySelector('.popup__form-item_el_name'); // поле редактирования имени 
let formText = document.querySelector('.popup__form-item_el_text'); // поле редактирования информации о работе
let formButton = document.querySelector('.popup__form-button');

function popupToggle() {
    popup.classList.toggle('popup_opened');
    formName.value = profileName.textContent;
    formText.value = profileText.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
    profileName.textContent = formName.value;
    profileText.textContent = formText.value;

    popupToggle()
}

popupElOpen.addEventListener('click', popupToggle);
popupElClose.addEventListener('click', popupToggle);
popup.addEventListener('submit', formSubmitHandler);
