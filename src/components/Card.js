export class Card {
  constructor(
    cardInfo,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
    userData
  ) {
    this._cardInfo = cardInfo;
    this._userID = userData;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
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
    const likeButton = element.querySelector(".element__like");
    const deleteButton = element.querySelector(".element__delete");
    const elementLikesCounter = this._element.querySelector(
      ".element__like-counter"
    );
    elementLikesCounter.textContent = `${this._cardInfo.likes.length}`;

    this._userID.then((res) => {
      this._handleLikeClick(
        likeButton,
        this._cardInfo._id,
        elementLikesCounter
      );
      this._cardInfo.likes.forEach((element) => {
        if (element._id.includes(res._id)) {
          likeButton.classList.add("element__like_active");
        }
      });
    });

    this._userID.then((res) => {
      if (res._id === this._cardInfo.owner._id) {
        this._handleDeleteClick(
          deleteButton,
          this._element,
          this._cardInfo._id
        );
      } else {
        deleteButton.remove();
      }
    });

    const imageData = { name: this._cardInfo.name, link: this._cardInfo.link };
    //изображение во весь экран
    elementImage.addEventListener("click", () =>
      this._handleCardClick(imageData.name, imageData.link)
    );
  }

  generateCard() {
    this._element = this._getTemplate();
    const elementImage = this._element.querySelector(".element__image");
    elementImage.src = this._cardInfo.link;
    elementImage.alt = this._cardInfo.name;
    this._element.querySelector(
      ".element__caption"
    ).textContent = this._cardInfo.name;
    this._setEventListeners(this._element);
    return this._element;
  }
}
