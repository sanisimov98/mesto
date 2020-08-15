import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor({ name, link }, popupSelector) {
        super(popupSelector);
        this._name = name;
        this._link = link;
    }

    open = () => {
        const cardFullscreen = document.querySelector('.popup__fullscreen-image');
        document.querySelector('.popup__fullscreen-caption').textContent = this._name;
        this._popup.classList.add('popup_opened');
        cardFullscreen.src = this._link;
        cardFullscreen.alt = this._name;
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', this._handleOverlayClose);
    }
}