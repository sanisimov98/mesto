export function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', () => closeOnOverlay(popup));
    document.addEventListener('keydown', () => closeOnEscape(popup));
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', closeOnOverlay);
    document.removeEventListener('keydown', closeOnEscape);
}

export function closeOnEscape(popup) {
    if (event.key === 'Escape') {
        closePopup(popup);
    }
}

export function closeOnOverlay(popup) {
    if (event.target.classList.contains('popup_opened')) {
        closePopup(popup);
    }
}
const aa = [1]