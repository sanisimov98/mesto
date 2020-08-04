export class FormValidator {
    constructor(initialObject, form) {
        this._initialObject = initialObject;
        this._form = form;
    }

    disableButton = (button, inactiveButton) => {
        button.classList.add(inactiveButton);
        button.disabled = true;
    }

    enableButton = (button, inactiveButton) => {
        button.classList.remove(inactiveButton);
        button.disabled = false;
    }

    // функция для отображения ошибки
    _showError(input, errorMessage) {
        const error = this._form.querySelector(`#${input.id}-error`);
        input.classList.add(this._initialObject.inputErrorClass);
        error.classList.add(this._initialObject.errorClass);
        error.textContent = errorMessage;
    };

    // функция для сокрытия ошибки
    _hideError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        input.classList.remove(this._initialObject.inputErrorClass);
        error.classList.remove(this._initialObject.errorClass);
        error.textContent = '';
    };


    _validate(input) {
        if (!input.validity.valid) {
            this._showError(input, input.validationMessage);
        } else {
            this._hideError(input);
        }
    };


    // проверка введённых значений в нескольких полях для ввода данных
    _invalidValue(inputList) {
        return inputList.some((input) => {
            return !input.validity.valid;
        })
    }
    // функция включающая или выключающая кнопки отправки форм
    _toggleButton = (inputList, button) => {
        const inactiveButton = this._initialObject.inactiveButtonClass;
        if (this._invalidValue(inputList)) {
            this.disableButton(button, inactiveButton);
        }
        else {
            this.enableButton(button, inactiveButton);
        }
    };

    _setEventListeners() {
        const inputList = Array.from(this._form.querySelectorAll(this._initialObject.inputSelector)); // список всех полей для ввода
        const button = this._form.querySelector(this._initialObject.submitButtonSelector);
        this._toggleButton(inputList, button, this._initialObject); // выключение кнопки при открытии формы
        inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._validate(input); // проверка на валидность
                this._toggleButton(inputList, button, this._initialObject);  // переключение состояния кнопки
            });
        });
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault(); // отмена стандартного поведения
        });
        this._setEventListeners(); // назначение слушателей
    }

}