import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
    }

    _getInputValues = () => {
        const inputs = Array.from(this._popup.querySelectorAll('.popup__form-item'));
        const values = {}
        inputs.forEach((input) => { values[input.name] = input.value; });
        return values;
    }

    setEventListeners = (closeButton) => {
        closeButton.addEventListener('click', () => this.close());
        this._popup.addEventListener('submit', (evt) => {
            evt.stopImmediatePropagation()
            const values = this._getInputValues();
            this._submitCallback(evt, values);
            this.close()
        });
    }

    close = () => {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('click', this._handleOverlayClose);
        this._popup.reset();
    }
}