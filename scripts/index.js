// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


// получение содержимого template через свойство content
const cardTemplate = document.querySelector('#card-template').content;

// функция создания карточки с установкой значений вложенных элементов и обработчика клика
function createCard(name, link, deleteCardFn) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').src = link; 
    cardElement.querySelector('.card__image').alt = name;
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCardFn);

    return cardElement;
};

//добавление на страницу всех карточек из исходного массива методом .forEach
initialCards.forEach((card) => {
    const cardElement = createCard(card.name, card.link, removeCard);
    const placesList = document.querySelector('.places__list'); 
    placesList.append(cardElement);
});

//функция удаления для передачи в функцию создания карточки и вызова из обработчика клика
function removeCard(evt) {
    const eventTarget = evt.target;
    const card = eventTarget.closest('.card');
    card.remove();
};
