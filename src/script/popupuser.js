//class PopupUser extends Popup {
class PopupUser extends PopupValidated {
    constructor(popup, formValidator) {
        super(popup, formValidator);
    }

    open(userInfo) {
        this.userInfo = userInfo;
        this.popup.querySelector('.popup__title').textContent = 'Редактировать профиль';
        this.popup.querySelector('.popup__input_type_name').placeholder = 'Имя';
        this.popup.querySelector('.popup__input_type_data').placeholder = 'О себе';
        this.popup.querySelector('.popup__input_type_data').name = 'about';
        this.popup.querySelector('.popup__error-name-line').textContent = '';
        this.popup.querySelector('.popup__error-data-line').textContent = '';
        this.popup.querySelector('.popup__button').classList.add('popup__button_save');
        this.popup.querySelector('.popup__button').textContent = 'Сохранить';
        this.popup.querySelector('.popup__button').setAttribute('disabled', '');
        this.popup.querySelector('.popup__input_type_name').value = this.userInfo.name;
        this.popup.querySelector('.popup__input_type_data').value = this.userInfo.about;
        this.popup.querySelector('.popup__button').removeAttribute('disabled');
        //newForm.type = 'user';
        this.editUserHandler = this.editUser.bind(this);
        this.popup.querySelector('.popup__form').addEventListener('submit', this.editUserHandler);
        super.open();
    }

    close() {
        this.popup.querySelector('.popup__form').removeEventListener('submit', this.editUserHandler);
        super.close();
    }

    editUser(event) {
        const form = event.currentTarget;
        const name = form.elements.name.value;
        const data = form.elements.about.value;
        // Правильно что используете  event.preventDefault();
        event.preventDefault();
        this.popup.querySelector('.popup__button').textContent = 'Загрузка...';
        this.userInfo.setUserInfo(name, data)
        .finally(() => {
            this.close();
        });
        this.close();
    }
}