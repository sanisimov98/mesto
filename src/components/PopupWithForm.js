import { Popup } from "./Popup.js";
import { renderLoading } from "../pages/index.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popupButton = this._popup.querySelector(".popup__form-button");
    this._popupButtonText = this._popupButton.textContent;
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
      renderLoading(true, this._popupButton, this._popupButtonText);
      const values = this._getInputValues();
      this._submitCallback(evt, values);
    });
  };

  close = () => {
    super.close();
    renderLoading(false, this._popupButton, this._popupButtonText);
    this._popup.reset();
  };
}
