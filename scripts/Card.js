import {openPopup} from './Utils.js';
import {fullscreen, cardFullscreen} from './index.js';

export class Card {
    constructor(cardInfo) {
        this._cardInfo = cardInfo;
        this._name = this._cardInfo.name;
        this._link = this._cardInfo.link;
    }

    _getTemplate() {
        const card = document.querySelector('#element').content.querySelector('.element').cloneNode(true);
        return card;
    }

    _setEventListeners(element) {
        element.querySelector('.element__delete').addEventListener('click', function () {
            const deletedOne = element.querySelector('.element__delete').closest('.element');
            deletedOne.remove();
        });
        element.querySelector('.element__like').addEventListener('click', function () {
            element.querySelector('.element__like').classList.toggle('element__like_active');
        });

        //изображение во весь экран
        element.querySelector('.element__image').addEventListener('click', function () {
            document.querySelector('.popup__fullscreen-caption').textContent = element.querySelector('.element__image').alt;
            cardFullscreen.src = element.querySelector('.element__image').src;
            cardFullscreen.alt = element.querySelector('.element__image').alt;
            openPopup(fullscreen);
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__caption').textContent = this._name;
        this._setEventListeners(this._element);
        return this._element;
    }
}