import { Popup } from "./Popup";

export class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this.setEventListeners = this.setEventListeners.bind(this);
    this._submitCallback = submitCallback;
  }

  setEventListeners(closeButton, element, id) {
    super.setEventListeners(closeButton);
    this._popup
      .querySelector(".popup__confirmation-button")
      .addEventListener("click", (evt) => {
        evt.preventDefault();
        this._submitCallback(element, id);
      });
  }
}
