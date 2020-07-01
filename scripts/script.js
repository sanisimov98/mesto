const page = document.querySelector('.page');
const popupProfile = document.querySelector('.popup_type_profile'); // всплывающее окно
const popupProfileElOpen = document.querySelector('.profile__edit-button'); // кнопка правки
const popupProfileElClose = document.querySelector('.popup__form-close_type_profile'); // кнопка закрытия всплывающего окна
const profileName = document.querySelector('.profile__title'); // имя пользователя
const profileText = document.querySelector('.profile__text'); // текст профиля
const formName = document.querySelector('.popup__form-item_el_name'); // поле редактирования имени 
const formText = document.querySelector('.popup__form-item_el_text'); // поле редактирования информации о работе
const formButton = document.querySelector('.popup__form-button'); 
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

function popupProfileToggle() { // функция, добавляющая в пустые поля формы изменения профиля имеющиеся значения
    popupProfile.classList.toggle('popup_opened');
    formName.value = profileName.textContent;
    formText.value = profileText.textContent;
} 


function profileFormSubmitHandler (evt) { // обработчик формы изменения профиля
    evt.preventDefault();
    
    profileName.textContent = formName.value;
    profileText.textContent = formText.value;

    popupProfileToggle();
}

popupProfileElOpen.addEventListener('click', popupProfileToggle); 
popupProfile.addEventListener('submit', profileFormSubmitHandler);
popupProfileElClose.addEventListener('click', popupProfileToggle);

//функция для добавления новых карточек
function addCard(element) { 
    // создание "тела" карточки и присвоение ей класса "element"
    const card = document.createElement('div');
    const cardImage = document.createElement('img');
    const cardContainer = document.createElement('div')
    const cardLike = document.createElement('button')
    const cardTitle = document.createElement('p');
    const cardDelete = document.createElement('button');
    card.classList = 'element';
    
    // картинка
    cardImage.classList = 'element__image';
    cardImage.setAttribute('src', element.link);
    cardImage.setAttribute('alt', element.name);

    // иконка "удалить"
    cardDelete.classList = 'element__delete';
    cardDelete.addEventListener('click', function () {
        const deletedOne = cardDelete.closest('.element');
        deletedOne.remove();
        });
    
    
    // контейнер с кнопкой "нравится" и подписью
    cardContainer.classList = 'element__container';
    cardLike.classList = 'element__like';
    cardLike.addEventListener('click', function (){
        cardLike.classList.toggle('element__like_active')});
    cardTitle.classList = 'element__caption';
    cardTitle.textContent = element.name;
    cardContainer.append(cardTitle, cardLike); //название места и кнопка "нравится"

    // картинка во весь экран
    const fullscreenImagePopup = document.createElement('div');
    const fullscreenImage = document.createElement('img');
    const fullscreenImageCaption = document.createElement('p');
    const fullscreenImagePopupContainer = document.createElement('div');
    const fullscreenClose = document.createElement('button');

    fullscreenImagePopup.classList = 'fullscreen';
    fullscreenImagePopupContainer.classList = 'fullscreen__image-container';

    fullscreenClose.classList = 'fullscreen__close';
    fullscreenClose.addEventListener('click', function(){
        fullscreenImagePopup.classList.toggle('fullscreen_opened')})

    fullscreenImage.classList = 'fullscreen__image-large';
    fullscreenImage.setAttribute('src', element.link);
    fullscreenImage.setAttribute('alt', element.name);

    fullscreenImageCaption.textContent = element.name;
    
    fullscreenImagePopupContainer.append(fullscreenImage, fullscreenClose, fullscreenImageCaption);  
    fullscreenImagePopup.append(fullscreenImagePopupContainer);


    card.append(cardImage, cardDelete, cardContainer, fullscreenImagePopup); //картинка и контейнер, созданный выше
    cardImage.addEventListener('click', function (){
        fullscreenImagePopup.classList.toggle('fullscreen_opened');})
    cards.append(card); //добавляем карточку

    }

//функция, добавляющая карточки в HTML
function renderCards(Cards) { 
    Cards.forEach(element => {
        addCard(element);
    });
}

//делаем карточки из списка initialCards при загрузке страницы
renderCards(initialCards); 

// кнопка "добавить"
function popupAddCardToggle() { 
    formCardTitle.value = '';
    formCardImage.value = '';
    popupAdd.classList.toggle('popup_opened');
}

// обработчик формы добавления карточки
function cardFormSubmitHandler (evt) { 
    evt.preventDefault();
    
    const newCards = {};
    newCards['name'] = formCardTitle.value;
    newCards['link'] = formCardImage.value;
    console.log(newCards)
    addCard(newCards);
    popupAddCardToggle();
}

popupAddButton.addEventListener('click', popupAddCardToggle); // нажатие на "добавить"
popupAdd.addEventListener('submit', cardFormSubmitHandler); // отправка формы с новой карточкой
popupAddElClose.addEventListener('click', popupAddCardToggle); // закрытие формы

