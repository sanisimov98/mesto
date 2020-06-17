let popup = document.querySelector('.popup');
let popupElOpen = document.querySelector('.profile__edit-button');
let popupElClose = document.querySelector('.popup__form-close');
let profileName = document.querySelector('.profile__title');
let profileText = document.querySelector('.profile__text');
let formName = document.querySelector('.popup__form-item_el_name');
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
    let nameInput = document.querySelector('.popup__form-item_el_name'); 
    let jobInput = document.querySelector('.popup__form-item_el_text'); 

    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__text').textContent = jobInput.value;

    popupHide()
}

popupElOpen.addEventListener('click', popupOpen);
popupElClose.addEventListener('click', popupHide);
formElement.addEventListener('submit', formSubmitHandler);
