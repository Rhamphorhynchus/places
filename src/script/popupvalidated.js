class PopupValidated extends Popup {
    constructor(popup, formValidator) {
        super(popup);
        this.formValidator = formValidator;
    }

    open() {
        super.open();
        this.formValidator.setForm(this.popup.querySelector('.popup__form'));
    }

    close() {
        super.close();
        if (this.formValidator !== undefined) {
            this.formValidator.removeEventListeners();
        }
    }
}