// функция для отображения ошибки
const showError = (form, input, errorMessage, initialObject) => {
    const error = form.querySelector(`#${input.id}-error`);
    input.classList.add(initialObject.inputErrorClass);
    error.classList.add(initialObject.errorClass);
    error.textContent = errorMessage;
};

// функция для сокрытия ошибки
const hideError = (form, input, initialObject) => {
    const error = form.querySelector(`#${input.id}-error`);
    input.classList.remove(initialObject.inputErrorClass);
    error.classList.remove(initialObject.errorClass);
    error.textContent = '';
};

// проверка введённых значений в нескольких полях для ввода данных
const invalidValue = (inputList) => {
    return inputList.some((input) => {
        return !input.validity.valid;
    })
}

// проверка одного поля и отображение/сокрытие ошибки в соответствии с его валидностью
const validate = (form, input, initialObject) => {
    if (!input.validity.valid) {
        showError(form, input, input.validationMessage, initialObject);
    } else {
        hideError(form, input, initialObject);
    }
};

const disableButton = (button, inactiveButton) => {
    button.classList.add(inactiveButton);
    button.disabled = true;
}

const enableButton = (button, inactiveButton) => {
    button.classList.remove(inactiveButton);
    button.disabled = false;
}

// функция включающая или выключающая кнопки отправки форм
const toggleButton = (inputList, button, initialObject) => {
    const inactiveButton = initialObject.inactiveButtonClass;
    if (invalidValue(inputList)) {
        disableButton(button, inactiveButton);
    }
    else {
        enableButton(button, inactiveButton);
    }
};

// функция, в которой назначаются слушатели
const setEventListeners = (form, initialObject) => {
    const inputList = Array.from(form.querySelectorAll(initialObject.inputSelector)); // список всех полей для ввода
    const button = form.querySelector(initialObject.submitButtonSelector);
    toggleButton(inputList, button, initialObject); // выключение кнопки при открытии формы
    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            validate(form, input, initialObject); // проверка на валидность
            toggleButton(inputList, button, initialObject);  // переключение состояния кнопки
        });
    });
};

// функция, включающая валидацию
const enableValidation = (initialObject) => {
    const formList = Array.from(document.querySelectorAll(initialObject.formSelector)); // все формы
    formList.forEach((form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault(); // отмена стандартного поведения
        });
        setEventListeners(form, initialObject); // назначение слушателей
    });
};

// вызов валидации
enableValidation({
    formSelector: '.popup',
    inputSelector: '.popup__form-item',
    submitButtonSelector: '.popup__form-button',
    inactiveButtonClass: 'popup__form-button_disabled',
    inputErrorClass: 'popup__form-item_type_error',
    errorClass: 'popup__form-error_active'
});