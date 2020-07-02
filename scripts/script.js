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

// открытие попапов
function openPopup(variable) {
    variable.classList.toggle('popup_opened');
}

// функция, добавляющая в пустые поля формы изменения профиля имеющиеся значения
function togglePopupProfile() {
    openPopup(popupProfile);
    formName.value = profileName.textContent;
    formText.value = profileText.textContent;
}

// обработчик формы изменения профиля
function handlerProfileFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = formName.value;
    profileText.textContent = formText.value;

    togglePopupProfile();
}

popupProfileElOpen.addEventListener('click', togglePopupProfile);
popupProfile.addEventListener('submit', handlerProfileFormSubmit);
popupProfileElClose.addEventListener('click', togglePopupProfile);

// функция добавления новой карточки
function addCard(cardInfo) {
    const cardTemplate = document.querySelector('#element').content;
    const cardItem = cardTemplate.cloneNode(true);
    const card = cardItem.querySelector('.element');
    const cardImage = card.querySelector('.element__image');
    const cardFullscreen = card.querySelector('.fullscreen__image-large');

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
        card.querySelector('.element__like').classList.toggle('element__like_active')
    });
    cardFullscreen.src = cardInfo.link;
    cardFullscreen.alt = cardInfo.name;

    card.querySelector('.fullscreen__image-caption').textContent = cardInfo.name;

    //изображение во весь экран
    card.querySelector('.element__image').addEventListener('click', function () {
        card.querySelector('.fullscreen').classList.toggle('fullscreen_opened');
    })

    //закрыть изображение
    card.querySelector('.fullscreen__close').addEventListener('click', function () {
        card.querySelector('.fullscreen').classList.toggle('fullscreen_opened');
    })

    return card;
}

//делаем карточки из списка initialCards при загрузке страницы

function renderCards(someCards) {
    someCards.forEach(element => {
        card = addCard(element);
        cards.append(card);
    });
}
renderCards(initialCards);

// кнопка "добавить"
function togglePopupAddCard() {
    formCardTitle.value = '';
    formCardImage.value = '';
    openPopup(popupAdd);
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
    togglePopupAddCard();
}

popupAddButton.addEventListener('click', togglePopupAddCard); // нажатие на "добавить"
popupAdd.addEventListener('submit', handlerCardFormSubmit); // отправка формы с новой карточкой
popupAddElClose.addEventListener('click', togglePopupAddCard); // закрытие формы

