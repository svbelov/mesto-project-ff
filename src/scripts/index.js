import '../pages/index.css';
// import { initialCards } from './cards.js';
import { createCard, removeCard, likeCard } from './card.js';
import { openPopup, closePopup, closePopupByPressEsc } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUserData, getCards, updateProfile, addNewCard, deleteCard, changeAvatar} from './api.js';


// последовательное добавление начальных карточек в элемент галереи:

const placesList = document.querySelector('.places__list');             // элемент галереи для последующего вывода в него готовых карточек

function renderInitialCards(cards, userId) {
    cards.forEach((data) => {
        const cardElement = createCard(data, userId, removeCard, likeCard, openImagePopup);
        placesList.append(cardElement);
        });
};


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


// обработка кликов по аватару профиля

const profileAvatarButton = document.querySelector('.profile__image');
const profileAvatarPopup = document.querySelector('.popup_type_new-avatar');
const formAvatar = profileAvatarPopup.querySelector('.popup__form');

profileAvatarButton.addEventListener('click', () => {
    openPopup(profileAvatarPopup);
    formAvatar.reset();
   
    clearValidation(formAvatar, validationConfig);
});


// обработка события submit при отправке формы изменения аватара

                                                                        //функция обработчик "отправки" формы:
function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
                                                   //отмена стандартной отправки формы.
    const avatarInput = formAvatar.querySelector('.popup__input_type_url');
    const avatarLink = avatarInput.value;
    const submitButton = formAvatar.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...'
                                                                        // обновление данных на сервере и вставка новых значений на страницу:    
    changeAvatar(avatarLink)
    .then(() => {
        avatarProfile.style.backgroundImage = `url(${avatarLink})`;
        closePopup(profileAvatarPopup);                                 //закрытие попапа после отправки формы:
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        submitButton.textContent = 'Сохранить';
    });
};
                                                                        //прикрепление обработчика к форме, слушатель события submit:
formAvatar.addEventListener('submit', handleAvatarFormSubmit);


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


// закрытие любого попапа кликом по кнопке или оверлею:

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
    const submitButton = formProfile.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...'
                                                                        // обновление данных на сервере и вставка новых значений на страницу:    
    updateProfile(nameValue, jobValue)
    .then(() => {
        nameProfile.textContent = nameValue;
        descriptionProfile.textContent = jobValue;
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        submitButton.textContent = 'Сохранить';
    });
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
    
    const submitButton = formProfile.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...'

                                                                        //получение значений полей:
    const nameValue = placeName.value;
    const linkValue = placeLink.value;

    addNewCard(nameValue, linkValue)
    .then((data) => {
        // const cardElement = createCard(nameValue, linkValue, removeCard, likeCard, openImagePopup);
        console.log(data);                                                  //создание новой карточки путём передачи функции createCard новых значений через параметры:
        const cardElement = createCard(data, removeCard, likeCard, openImagePopup);
        placesList.prepend(cardElement);                                    //добавление новой карточки в начало, перед остальными карточками.
        formCard.reset();                                                   //сброс, очистка полей формы.
        closePopup(cardAddPopup);                                           //закрытие попапа после отправки формы:        
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        submitButton.textContent = 'Сохранить';
    });
 
}
                                                                        //прикрепление обработчика к форме, слушатель события submit:
formCard.addEventListener('submit', handleCardFormSubmit);


// настройки валидации

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };
  
enableValidation(validationConfig);                                     // включение валидации всех форм

clearValidation(formProfile, validationConfig);                         // очистка ошибок валидации 


//API

const nameProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');
const avatarProfile = document.querySelector('.profile__image');

Promise.all([getUserData(), getCards()])
    .then(([user, cards]) => {
        nameProfile.textContent = user.name;
        descriptionProfile.textContent = user.about;
        avatarProfile.style.backgroundImage = `url(${user.avatar})`;
        // let idProfile = user._id;
        let userId = user._id;
        console.log(user);

        renderInitialCards(cards, userId);
    })
    .catch((err) => {
        console.log(err);
    })

