class Popup {
    constructor(popup) {
        this.popup = popup;
        this.popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
        this.popup.addEventListener('click', this.clickHandler.bind(this));
    }

    open () {
        this.keyDownHandler = this.keyDown.bind(this);
        document.addEventListener('keydown', this.keyDownHandler);
        this.popup.classList.add('popup_is-opened');
    }

    close () {
        document.removeEventListener('keydown', this.keyDownHandler);
        this.popup.classList.remove('popup_is-opened');
    }

    isOpen() {
        return this.popup.classList.contains('popup_is-opened');
    }

    keyDown(event) {
        if (event.key === 'Escape') {
        this.close();
        }
    }

    clickHandler(event) {
        if (event.target === this.popup) {
            this.close();
        }
    }
}