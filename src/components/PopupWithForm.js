import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
  }

  _getInputValues = () => {
    const inputs = Array.from(
      this._popup.querySelectorAll(".popup__form-item")
    );
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  };

  setEventListeners = (closeButton) => {
    super.setEventListeners(closeButton);
    this._popup.addEventListener("submit", (evt) => {
      evt.stopImmediatePropagation();
      const values = this._getInputValues();
      this._submitCallback(evt, values);
      this.close();
    });
  };

  close = () => {
    super.close();
    this._popup.reset();
  };
}
