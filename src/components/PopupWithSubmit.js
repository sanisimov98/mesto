import { Popup } from "./Popup";

export class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.open = this.open.bind(this);
    this._submitCallback = submitCallback;
  }

  open = (element, id) => {
      super.open();
      this._element = element;
      this._id = id;
  }

  setEventListeners(closeButton) {
      console.log(this._element, this._id)
    super.setEventListeners(closeButton);
    this._popup
      .querySelector(".popup__confirmation-button")
      .addEventListener("click", (evt) => {
        evt.preventDefault();
        this._submitCallback(this._element, this._id);
      });
  }
}
