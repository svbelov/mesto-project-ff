import { deleteCard, addLikeCard, dislikeCard } from "./api";

const cardTemplate = document.querySelector('#card-template').content;  // получение содержимого template через свойство content


// функция создания карточки с установкой соотв. значений вложенных элементов и обработчика клика:

export function createCard(data, userId, deleteCardFn, likeCardFn, openImageFn) {
    
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = data.name;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = data.link;
    cardImage.alt = data.name;
    const likeCounter = cardElement.querySelector('.card__like-counter');
    likeCounter.textContent = data.likes.length;
    const deleteButton = cardElement.querySelector('.card__delete-button');

    if(userId === data.owner._id) {
        deleteButton.classList.add('card__delete-button_visible');
        deleteButton.addEventListener('click', () => {
            removeCard(cardElement, data._id);
        });
    } else {
        deleteButton.classList.remove('card__delete-button_visible');
    }

    const likeButton = cardElement.querySelector('.card__like-button');
    
    if (data.likes.some((item) => item._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }
    
    likeButton.addEventListener('click', () => {
        likeCard(likeButton, data._id, likeCounter);
    });
   
    cardImage.addEventListener('click', openImageFn);
 
    return cardElement;
};


// функция удаления для передачи в функцию создания карточки и вызова из обработчика клика:

export const removeCard = (cardElement, cardId) => {
    console.log(`Удаление карточки с ID: ${cardId}`);
    deleteCard(cardId)
    .then(() => {
        cardElement.remove();
    })
    .catch((err) => {
        console.log(err);
    });     
};


// функция лайка для передачи в функцию создания карточки и вызова из обработчика клика:

export const likeCard = (likeButton, cardId, likeCounter) => {
   if (likeButton.classList.contains('card__like-button_is-active')) {
        dislikeCard(cardId)
        .then((data) => {
            likeButton.classList.remove('card__like-button_is-active');
            likeCounter.textContent = data.likes.length;
        })
        .catch((err) => {
        console.log(err);
        });  
    } else {
        addLikeCard(cardId)
        .then((data) => {
            likeButton.classList.add('card__like-button_is-active');
            likeCounter.textContent = data.likes.length;            
        })
        .catch((err) => {
            console.log(err);
            });
    }
};