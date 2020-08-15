export class UserInfo {
    constructor({userNameSelector, userInfoSelector}){
        this._profileName = document.querySelector(userNameSelector); // имя пользователя
        this._profileText = document.querySelector(userInfoSelector); // текст профиля
    }

    getUserInfo(){
        const userData = {};
        userData['username'] = this._profileName.textContent;
        userData['text'] = this._profileText.textContent;
        return userData;
    }   

    setUserInfo(values){
        this._profileName.textContent = values['username'];
        this._profileText.textContent = values['text'];
    }
}