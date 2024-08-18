
// функция открытия попапа c добавлением обработчика, запускаемого по нажатию клавиши:

export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    document.addEventListener('keydown', closePopupByPressEsc);
};


// функция закрытия любого попапа со снятием слушателя события:

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByPressEsc);
};


// функция закрытия попапа по нажатию клавишы Escape:

export function closePopupByPressEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    }
};


