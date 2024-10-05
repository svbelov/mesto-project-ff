// Конфигурация(идентификатор группы и токен)

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-23',
  headers: {
    authorization: '86aef1fc-61a0-4414-a6ed-93c12d4379af',
    'Content-Type': 'application/json'
  }
};


// Проверка ответа сервера

function checkResponse(res) {
  if(res.ok) {
    return res.json();                              //преобразование ответа в формат JSON при успешном статусе
  } else {
    return Promise.reject(`Ошибка: ${res.status}`); //отклонение промиса с ошибкой
  }
}

// Загрузка информации о пользователе с сервера

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then(checkResponse)
};


// Загрузка карточек с сервера

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
  })
  .then(checkResponse)
};


// Редактирование профиля

export const updateProfile = (nameProfile, aboutProfile) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameProfile,
      about: aboutProfile 
    })
   })
  .then(checkResponse)
};


// Добавление новой карточки

export const addNewCard = (nameCard, linkCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard 
    })
   })
  .then(checkResponse)
};


// Удаление карточки

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
   })
   .then(checkResponse)
  };


// Постановка и снятие лайка

export const addLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
   })
   .then(checkResponse)
  }; 

export const dislikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
    })
    .then(checkResponse)
  };


// Обновление аватара пользователя

export const changeAvatar = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: data
    })
  })
  .then(checkResponse)
};