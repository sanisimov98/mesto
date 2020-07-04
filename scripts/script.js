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

// ФУНКЦИИ

// добавление и удаление модификатора _opened
function togglePopup(popup) {
    popup.classList.toggle('popup_opened');
}

// функция, добавляющая в пустые поля формы изменения профиля имеющиеся значения
function openPopupProfile() {
    togglePopup(popupProfile);
    formName.value = profileName.textContent;
    formText.value = profileText.textContent;
}

function closePopupProfile() {
    togglePopup(popupProfile);
}

function closePopupAddCard() {
    togglePopup(popupAdd);
}

// обработчик формы изменения профиля
function handlerProfileFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = formName.value;
    profileText.textContent = formText.value;

    closePopupProfile();
}



// кнопка "добавить"
function openPopupAddCard() {
    formCardTitle.value = '';
    formCardImage.value = '';
    togglePopup(popupAdd);
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


    card.querySelector('.fullscreen__image-caption').textContent = cardInfo.name;

    //изображение во весь экран
    card.querySelector('.element__image').addEventListener('click', function () {
        const cardFullscreen = card.querySelector('.fullscreen__image-large');

        card.querySelector('.fullscreen').classList.toggle('fullscreen_opened');
        cardFullscreen.src = cardInfo.link;
        cardFullscreen.alt = cardInfo.name;
    });

    //закрыть изображение
    card.querySelector('.fullscreen__close').addEventListener('click', function () {
        const cardFullscreen = card.querySelector('.fullscreen__image-large');

        card.querySelector('.fullscreen').classList.toggle('fullscreen_opened');
        cardFullscreen.src = cardInfo.link;
        cardFullscreen.alt = cardInfo.name;
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
    togglePopup(popupAdd);
}


popupProfileElOpen.addEventListener('click', openPopupProfile);
popupProfile.addEventListener('submit', handlerProfileFormSubmit);
popupProfileElClose.addEventListener('click', closePopupProfile);

popupAddButton.addEventListener('click', openPopupAddCard); // нажатие на "добавить"
popupAdd.addEventListener('submit', handlerCardFormSubmit); // отправка формы с новой карточкой
popupAddElClose.addEventListener('click', closePopupAddCard); // закрытие формы


// Добавление карточек при загрузке страницы
renderCards(initialCards);
