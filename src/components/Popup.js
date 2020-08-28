export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.addEventListener("click", this._handleOverlayClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.removeEventListener("click", this._handleOverlayClose);
  }

  _handleEscClose() {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose() {
    if (event.target.classList.contains("popup_opened")) {
      this.close();
    }
  }

  setEventListeners(closeButton) {
    closeButton.addEventListener("click", this.close);
  }
}
