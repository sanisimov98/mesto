export class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userImageSelector }) {
    this._profileName = document.querySelector(userNameSelector); // имя пользователя
    this._profileText = document.querySelector(userInfoSelector); // текст профиля
    this._profileImage = document.querySelector(userImageSelector);
  }

  getUserInfo() {
    const userData = {};
    userData["username"] = this._profileName.textContent;
    userData["text"] = this._profileText.textContent;
    userData["avatar"] = this._profileImage.src;
    return userData;
  }

  setUserInfo(values) {
    this._profileName.textContent = values["username"];
    this._profileText.textContent = values["text"];
    this._profileImage.src = values["avatar"];
  }
}
