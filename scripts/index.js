// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const cardTemplate = document.querySelector('#card-template').content;  // получение содержимого template через свойство content
const placesList = document.querySelector('.places__list');             // элемент галереи для последующего вывода в него готовых карточек

                                                                        // функция создания карточки с установкой значений вложенных элементов и обработчика клика:
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
