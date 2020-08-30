import { Popup } from "./Popup.js";
import { fullscreenImage, fullscreenCaption } from "../pages/index.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open()
    fullscreenCaption.textContent = name;
    fullscreenImage.src = link;
    fullscreenImage.alt = name;
  }
}
