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
const cardFullscreen = document.querySelector('.popup__fullscreen-image');
const fullscreenElClose = document.querySelector('.popup__fullscreen-close'); //кнопка закрытия изображения во весь экран
const fullscreen = document.querySelector('.popup__fullscreen'); //во весь экран

// ФУНКЦИИ

// добавление и удаление модификатора _opened
function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', () => closeOnOverlay(popup));
    document.addEventListener('keydown', () => closeOnEscape(popup));
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', closeOnOverlay);
    document.removeEventListener('keydown', closeOnEscape);
}

function closeOnEscape(popup) {
    if (event.key === 'Escape') {
        closePopup(popup);
    }
}

function closeOnOverlay(popup) {
    if (event.target.classList.contains('popup_opened')) {
        closePopup(popup);
    }
}


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
    disableButton(popupAddButton, 'popup__form-button_disabled')
}

// обработчик формы изменения профиля
function handlerProfileFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = formName.value;
    profileText.textContent = formText.value;

    closePopup(popupProfile);
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
        document.querySelector('.popup__fullscreen-caption').textContent = cardInfo.name;
        cardFullscreen.src = cardInfo.link;
        cardFullscreen.alt = cardInfo.name;
        openPopup(fullscreen);
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
    closePopup(popupAdd);
}


popupProfileElOpen.addEventListener('click', openPopupProfile);
popupProfile.addEventListener('submit', handlerProfileFormSubmit);
popupProfileElClose.addEventListener('click', () => closePopup(popupProfile, 'popup_opened'));

popupAddButton.addEventListener('click', openPopupAddCard); // нажатие на "добавить"
popupAdd.addEventListener('submit', handlerCardFormSubmit); // отправка формы с новой карточкой
popupAddElClose.addEventListener('click', () => closePopup(popupAdd)); // закрытие формы
fullscreenElClose.addEventListener('click', () => closePopup(fullscreen));

// Добавление карточек при загрузке страницы
renderCards(initialCards)