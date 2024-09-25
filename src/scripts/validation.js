// Настройки валидации

// const validationConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// };


// Функция, которая добавляет класс с ошибкой

const showInputError = (formElement, formInput, errorMessage, validationConfig) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add(validationConfig.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(validationConfig.errorClass);
};


// Функция, которая удаляет класс с ошибкой

const hideInputError = (formElement, formInput, validationConfig) => {

  const formError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove(validationConfig.inputErrorClass);
  formError.classList.remove(validationConfig.errorClass);
  formError.textContent = '';
};


// Функция проверки валидности поля и показа или скрытия ошибки

const isValid = (formElement, formInput, validationConfig) => {
  if (formInput.validity.patternMismatch) {
      formInput.setCustomValidity(formInput.dataset.errorMessage);    //здесь имя атрибута в camelCase соответсвует имени в HTML, указанном в kebab-case.
  } else {
      formInput.setCustomValidity("");
  }
    
  if (!formInput.validity.valid) {
      showInputError(formElement, formInput, formInput.validationMessage, validationConfig);
  } else {
      hideInputError(formElement, formInput, validationConfig);
  }
};


// Функция, которая добавляет обработчиков всем полям формы

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
          isValid(formElement, formInput, validationConfig);

          toggleButtonState(inputList, buttonElement, validationConfig);
      });
  });
};


// Функция включения валидации всех форм

export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
      setEventListeners(formElement, validationConfig);
  });
};


// Функция проверки наличия невалидного поля

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
      return !formInput.validity.valid;
  });
};


// Функция меняет состояние кнопки в зависимости от валидности полей

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if(hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};


// Функция, которая очищает ошибки валидации формы

export const clearValidation = (formProfile, validationConfig) => {

  const inputList = Array.from(formProfile.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formProfile.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((formInput) => {
    hideInputError(formProfile, formInput, validationConfig);
  });

  toggleButtonState(inputList, buttonElement, validationConfig);
};

