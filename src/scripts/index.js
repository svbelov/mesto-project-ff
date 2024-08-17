// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../pages/index.css';
import { initialCards } from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;  // получение содержимого template через свойство content
const placesList = document.querySelector('.places__list');             // элемент галереи для последующего вывода в него готовых карточек

                                                                        // функция создания карточки с установкой соотв. значений вложенных элементов и обработчика клика:
function createCard(name, link, deleteCardFn) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = name;
    const cardImage = cardElement.querySelector('.card__image');        // запись элемента в переменную во избежание повторного его поиска в DOM для указания значений атрибутов
    cardImage.src = link; 
    cardImage.alt = name;
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCardFn);

    return cardElement;
};

                                                                        //последовательное добавление в элемент галереи карточек, заполненных из исходного массива:
initialCards.forEach((card) => {
    const cardElement = createCard(card.name, card.link, removeCard);
    placesList.append(cardElement);
});

                                                                        //функция удаления для передачи в функцию создания карточки и вызова из обработчика клика:
function removeCard(evt) {
    const eventTarget = evt.target;
    const card = eventTarget.closest('.card');
    card.remove();
};

                                                                        // функция открытия попапа c добавлением обработчика, запускаемого по нажатию клавиши
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByPressEsc);
};

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');

const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_type_new-card');

                                                                        //обработчики кликов по кнопкам редактирования профиля/добавления карточки:

profileEditButton.addEventListener('click', () => {
    openPopup(profileEditPopup);
});

cardAddButton.addEventListener('click', () => {
    openPopup(cardAddPopup);
})

                                                                        //функция закрытия попапа со снятием слушателя события:
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
const popups = document.querySelectorAll('.popup');

popups.forEach((item) => {
    item.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
            closePopup(item);
        };
    });
});






