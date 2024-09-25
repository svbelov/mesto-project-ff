
import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, removeCard, likeCard } from './card.js';
import { openPopup, closePopup, closePopupByPressEsc } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';


// последовательное добавление в элемент галереи карточек, заполненных из исходного массива:

const placesList = document.querySelector('.places__list');             // элемент галереи для последующего вывода в него готовых карточек

initialCards.forEach((card) => {
    const cardElement = createCard(card.name, card.link, removeCard, likeCard, openImagePopup);
    placesList.append(cardElement);
});


// функция заполнения полей формы в попапе редактирования профиля текущими значениями:

function fillEditFormFields() {
    const formEditProfile = document.forms['edit-profile'];
    const inputName = formEditProfile.elements.name;
    const inputDescription = formEditProfile.elements.description;

    const name = document.querySelector('.profile__title').textContent;
    const description = document.querySelector('.profile__description').textContent;

    inputName.value = name;
    inputDescription.value = description;
}


// обработка кликов по кнопке редактирования профиля:

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
                                                                       
profileEditButton.addEventListener('click', () => {
    openPopup(profileEditPopup);
    fillEditFormFields();

    clearValidation(formProfile, validationConfig);
});


// обработка кликов по кнопке  добавления карточки:

const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_type_new-card');

cardAddButton.addEventListener('click', () => {
    openPopup(cardAddPopup);
    formCard.reset();
   
    clearValidation(formCard, validationConfig);
})


//закрытие любого попапа кликом по кнопке или оверлею:

const popups = document.querySelectorAll('.popup');

popups.forEach((item) => {
    item.addEventListener('mousedown', (evt) => {
        if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
            closePopup(item);
        };
    });
});


// функция открытия попапа с изображением:

function openImagePopup(evt) {
    const cardImagePopup = document.querySelector('.popup_type_image');
    if (evt.target.classList.contains('card__image')) {
        const popupImage = document.querySelector('.popup__image');
        const popupCaption = document.querySelector('.popup__caption');
        popupImage.src = evt.target.src; 
        popupImage.alt = evt.target.alt;
        popupCaption.textContent = evt.target.alt;
        openPopup(cardImagePopup);
    }
};


// обработка события submit при отправке формы редактирования профиля

const formProfile = profileEditPopup.querySelector('.popup__form');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
                                                                        //функция обработчик "отправки" формы:
function handleProfileFormSubmit(evt) {
    evt.preventDefault();                                               //отмена стандартной отправки формы.
                                                                        //получение значений полей:
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
                                                                        //выбор элементов для вставки значений:      
    const nameProfile = document.querySelector('.profile__title');
    const descriptionProfile = document.querySelector('.profile__description');
                                                                        //вставка новых значений:    
    nameProfile.textContent = nameValue;
    descriptionProfile.textContent = jobValue;
                                                                        //закрытие попапа после отправки формы: 
    closePopup(profileEditPopup);
}
                                                                        //прикрепление обработчика к форме, слушатель события submit:
formProfile.addEventListener('submit', handleProfileFormSubmit);


// обработка события submit при отправке формы добавления карточки

const formCard = cardAddPopup.querySelector('.popup__form');
const placeName = formCard.querySelector('.popup__input_type_card-name');
const placeLink = formCard.querySelector('.popup__input_type_url');
                                                                        //функция обработчик "отправки" формы:
function handleCardFormSubmit(evt) {
    evt.preventDefault();                                               //отмена стандартной отправки формы.
                                                                        //получение значений полей:
    const nameValue = placeName.value;
    const linkValue = placeLink.value;
                                                                        //создание новой карточки путём передачи функции createCard новых значений через параметры:
    const cardElement = createCard(nameValue, linkValue, removeCard, likeCard, openImagePopup);
    placesList.prepend(cardElement);                                    //добавление новой карточки в начало, перед остальными карточками.
    formCard.reset();                                                   //сброс, очистка полей формы.
    closePopup(cardAddPopup);                                           //закрытие попапа после отправки формы: 
}
                                                                        //прикрепление обработчика к форме, слушатель события submit:
formCard.addEventListener('submit', handleCardFormSubmit);


//ВАЛИДАЦИЯ ФОРМ *****************************************

// настройки валидации

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };


// включение валидации всех форм
  
enableValidation(validationConfig);


// очистка ошибок валидации

clearValidation(formProfile, validationConfig); 

//********************************************************

