// ПЕРЕМЕННЫЕ
const popupProfile = document.querySelector('.popup_type_profile'); // всплывающее окно
const popupProfileElOpen = document.querySelector('.profile__edit-button'); // кнопка правки
const popupProfileElClose = document.querySelector('.popup__form-close_type_profile'); // кнопка закрытия всплывающего окна
const profileName = document.querySelector('.profile__title'); // имя пользователя
const profileText = document.querySelector('.profile__text'); // текст профиля
const formName = document.querySelector('.popup__form-item_el_name'); // поле редактирования имени 
const formText = document.querySelector('.popup__form-item_el_text'); // поле редактирования информации о работе
const initialCards = [
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
const cards = document.querySelector('.elements'); //секция с карточками
const popupAddButton = document.querySelector('.profile__add-button'); // кнопка для добавления карточек
const popupAdd = document.querySelector('.popup_type_add-card'); // попап с формой для добавления карточек
const formCardTitle = document.querySelector('.popup__form-item_el_card-title'); // название карточки
const formCardImage = document.querySelector('.popup__form-item_el_card-image'); // картинка в карточке
const popupAddElClose = document.querySelector('.popup__form-close_type_card'); // закрытие формы добавления карточки
const cardFullscreen = document.querySelector('.fullscreen__image-large');
const fullscreenElClose = document.querySelector('.fullscreen__close'); //кнопка закрытия изображения во весь экран
const fullscreen = document.querySelector('.fullscreen'); //во весь экран

// ФУНКЦИИ

// добавление и удаление модификатора _opened
function openPopup(popup, toggledClass) {
    popup.classList.add(toggledClass);
    popup.addEventListener('click', function (evt) {
        if (evt.target.classList.contains(toggledClass)) {
            closePopup(popup, toggledClass);
        }});
    popup.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            closePopup(popup, toggledClass);
        }});
}

function closePopup(popup, toggledClass) {
    popup.classList.remove(toggledClass);
    popup.removeEventListener('click', function (evt) {
        if (evt.target.classList.contains(toggledClass)) {
            closePopup(popup, toggledClass);
        }});
    popup.removeEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            closePopup(popup, toggledClass);
        }});
}


// функция, добавляющая в пустые поля формы изменения профиля имеющиеся значения
function openPopupProfile() {
    openPopup(popupProfile, 'popup_opened');
    formName.value = profileName.textContent;
    formText.value = profileText.textContent;
}

// кнопка "добавить"
function openPopupAddCard() {
    formCardTitle.value = '';
    formCardImage.value = '';
    openPopup(popupAdd, 'popup_opened');
}

// обработчик формы изменения профиля
function handlerProfileFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = formName.value;
    profileText.textContent = formText.value;

    closePopup(popupProfile, 'popup_opened');
}

// функция добавления новой карточки
function addCard(cardInfo) {
    const cardTemplate = document.querySelector('#element').content;
    const cardItem = cardTemplate.cloneNode(true);
    const card = cardItem.querySelector('.element');
    const cardImage = card.querySelector('.element__image');

    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;

    card.querySelector('.element__caption').textContent = cardInfo.name;

    //кнопка удалить
    card.querySelector('.element__delete').addEventListener('click', function () {
        const deletedOne = card.querySelector('.element__delete').closest('.element');
        deletedOne.remove();
    });

    //кнопка "мне нравится"
    card.querySelector('.element__like').addEventListener('click', function () {
        card.querySelector('.element__like').classList.toggle('element__like_active');
    });


    //изображение во весь экран
    card.querySelector('.element__image').addEventListener('click', function () {
        document.querySelector('.fullscreen__image-caption').textContent = cardInfo.name;
        fullscreen.classList.toggle('fullscreen_opened');
        cardFullscreen.src = cardInfo.link;
        cardFullscreen.alt = cardInfo.name;
        fullscreen.addEventListener('click', function (evt) {
            if (evt.target.classList.contains('fullscreen_opened')) {
                closePopup(fullscreen, 'fullscreen_opened');
            }});
    });

    return card;
}

//делаем карточки из списка initialCards при загрузке страницы

function renderCards(someCards) {
    someCards.forEach(element => {
        const card = addCard(element);
        cards.append(card);
    });
}

// обработчик формы добавления карточки
function handlerCardFormSubmit(evt) {
    evt.preventDefault();

    const newCardValues = {};
    newCardValues['name'] = formCardTitle.value;
    newCardValues['link'] = formCardImage.value;
    const newCard = addCard(newCardValues);

    //добавление собранной карточки в html
    cards.append(newCard);
    closePopup(popupAdd, 'popup_opened');
}


popupProfileElOpen.addEventListener('click', openPopupProfile);
popupProfile.addEventListener('submit', handlerProfileFormSubmit);
popupProfileElClose.addEventListener('click', () => closePopup(popupProfile, 'popup_opened'));

popupAddButton.addEventListener('click', openPopupAddCard); // нажатие на "добавить"
popupAdd.addEventListener('submit', handlerCardFormSubmit); // отправка формы с новой карточкой
popupAddElClose.addEventListener('click', () => closePopup(popupAdd, 'popup_opened')); // закрытие формы
fullscreenElClose.addEventListener('click', () => closePopup(fullscreen, 'fullscreen_opened'));

// Добавление карточек при загрузке страницы
renderCards(initialCards)