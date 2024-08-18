
const cardTemplate = document.querySelector('#card-template').content;  // получение содержимого template через свойство content


// функция создания карточки с установкой соотв. значений вложенных элементов и обработчика клика:

export function createCard(name, link, deleteCardFn, likeCardFn, openImageFn) {
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


// функция удаления для передачи в функцию создания карточки и вызова из обработчика клика:

export function removeCard(evt) {
    const eventTarget = evt.target;
    const card = eventTarget.closest('.card');
    card.remove();
};


//функция лайка для передачи в функцию создания карточки и вызова из обработчика клика:

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};

