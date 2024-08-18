// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../pages/index.css';
import { initialCards } from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;  // получение содержимого template через свойство content
const placesList = document.querySelector('.places__list');             // элемент галереи для последующего вывода в него готовых карточек

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');

const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_type_new-card');

const popups = document.querySelectorAll('.popup');

                                                                        // функция создания карточки с установкой соотв. значений вложенных элементов и обработчика клика:
function createCard(name, link, deleteCardFn, likeCardFn, openImageFn) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = name;
    const cardImage = cardElement.querySelector('.card__image');        // запись элемента в переменную во избежание повторного его поиска в DOM для указания значений атрибутов.
    cardImage.src = link; 
    cardImage.alt = name;
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCardFn);

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeCardFn);

    cardImage.addEventListener('click', openImageFn);

    return cardElement;
};

                                                                        //последовательное добавление в элемент галереи карточек, заполненных из исходного массива:
initialCards.forEach((card) => {
    const cardElement = createCard(card.name, card.link, removeCard, likeCard, openImagePopup);
    placesList.append(cardElement);
});

                                                                        //функция удаления для передачи в функцию создания карточки и вызова из обработчика клика:
function removeCard(evt) {
    const eventTarget = evt.target;
    const card = eventTarget.closest('.card');
    card.remove();
};

                                                                        //функция лайка для передачи в функцию создания карточки и вызова из обработчика клика:
function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};


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

                                                                        //функция открытия попапа c добавлением обработчика, запускаемого по нажатию клавиши:
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    document.addEventListener('keydown', closePopupByPressEsc);
};


                                                                        //функция заполнения полей формы в попапе редактирования профиля текущими значениями
function fillEditFormFields() {
    const formEditProfile = document.forms['edit-profile'];
    const inputName = formEditProfile.elements.name;
    const inputDescription = formEditProfile.elements.description;

    const name = document.querySelector('.profile__title').textContent;
    const description = document.querySelector('.profile__description').textContent;

    inputName.value = name;
    inputDescription.value = description;
}

                                                                        //обработчики кликов по кнопкам редактирования профиля/добавления карточки:
                                                                       
profileEditButton.addEventListener('click', () => {
    openPopup(profileEditPopup);
    fillEditFormFields();
});

cardAddButton.addEventListener('click', () => {
    openPopup(cardAddPopup);
})

                                                                        //функция закрытия любого попапа со снятием слушателя события:
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByPressEsc);
};

                                                                        //функция закрытия попапа по нажатию клавишы Escape:
function closePopupByPressEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    }
};

                                                                        //закрытие любого попапа кликом по кнопке или оверлею:
popups.forEach((item) => {
    item.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
            closePopup(item);
        };
    });
});

//обработка события submit при отправке формы редактирования профиля

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


//обработка события submit при отправке формы добавления карточки

const formCard = cardAddPopup.querySelector('.popup__form');
const placeName = formCard.querySelector('.popup__input_type_card-name');
const placeLink = formCard.querySelector('.popup__input_type_url');
                                                                        //функция обработчик "отправки" формы:
function handleCardFormSubmit(evt) {
    evt.preventDefault();                                               //отмена стандартной отправки формы.
                                                                        //получение значений полей:
    const nameValue = placeName.value;
    const linkValue = placeLink.value;
                                                                        //создание новой карточки путём передачи функции createCard новых значений через аргументы:
    const cardElement = createCard(nameValue, linkValue, removeCard, likeCard, openImagePopup);
    placesList.prepend(cardElement);                                    //добавление новой карточки в начало, перед остальными карточками.
    formCard.reset();                                                   //сброс, очистка полей формы.
    closePopup(cardAddPopup);                                           //закрытие попапа после отправки формы: 
}
                                                                        //прикрепление обработчика к форме, слушатель события submit:
formCard.addEventListener('submit', handleCardFormSubmit);
