export class API {
  constructor(options) {
    this._options = options;
  }

  getData() {
    return fetch(`${this._options.baseURL}/users/me`, {
      headers: this._options.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => console.log(err));
  }

  getInitialCards() {
    return fetch(`${this._options.baseURL}/cards`, {
      headers: this._options.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => console.log(err));
  }

  setProfileData(values) {
    fetch(`${this._options.baseURL}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        name: values["username"],
        about: values["text"],
      }),
    }).catch((err) => console.log(err));
  }

  sendNewCard(values) {
    return fetch(`${this._options.baseURL}/cards`, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        name: values["name"],
        link: values["link"],
      }),
    }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => console.log(err));
  }

  likeButton(cardId) {
    fetch(`${this._options.baseURL}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._options.headers,
    }).catch((err) => console.log(err));
  }

  dislikeButton(cardId) {
    fetch(`${this._options.baseURL}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._options.headers,
    }).catch((err) => console.log(err));
  }

  setProfileImage(value){
    fetch(`${this._options.baseURL}/users/me/avatar`, {
        method: "PATCH",
        headers: this._options.headers,
        body: JSON.stringify({
            avatar: value,
          }),
      }).catch((err) => console.log(err));
  }

  deleteCard(cardId){
    fetch(`${this._options.baseURL}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._options.headers,
      }).catch((err) => console.log(err));
  }
}
