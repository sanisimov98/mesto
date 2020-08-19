export class Card {
  constructor(cardInfo, handleCardClick) {
    this._cardInfo = cardInfo;
    this._handleCardClick = handleCardClick;
    this._name = this._cardInfo.name;
    this._link = this._cardInfo.link;
  }

  _getTemplate() {
    const card = document
      .querySelector("#element")
      .content.querySelector(".element")
      .cloneNode(true);
    return card;
  }

  _setEventListeners(element) {
    const elementImage = element.querySelector(".element__image");
    element
      .querySelector(".element__delete")
      .addEventListener("click", function () {
        const deletedOne = element
          .querySelector(".element__delete")
          .closest(".element");
        deletedOne.remove();
      });
    element
      .querySelector(".element__like")
      .addEventListener("click", function () {
        element
          .querySelector(".element__like")
          .classList.toggle("element__like_active");
      });
    const imageData = { name: this._name, link: this._link };
    //изображение во весь экран)
    elementImage.addEventListener("click", () =>
      this._handleCardClick(imageData.name, imageData.link)
    );
  }

  generateCard() {
    this._element = this._getTemplate();
    const elementImage = this._element.querySelector(".element__image");
    elementImage.src = this._link;
    elementImage.alt = this._name;
    this._element.querySelector(".element__caption").textContent = this._name;
    this._setEventListeners(this._element);
    return this._element;
  }
}
