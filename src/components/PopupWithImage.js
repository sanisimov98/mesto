import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open()
    document.querySelector(".popup__fullscreen-caption").textContent = name;
    document.querySelector(".popup__fullscreen-image").src = link;
    document.querySelector(".popup__fullscreen-image").alt = name;
  }
}
