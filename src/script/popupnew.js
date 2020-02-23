import {PopupValidated} from './popupvalidated.js';

export class PopupNew extends PopupValidated {
    constructor(popup, cardList, formValidator) {
        super(popup, formValidator);
        this.cardList = cardList;
    }

    open() {
        // Можно лучше: обычно названия, для примера 'Должно быть от 2 до 30 символов' 
        // выносят в отдельный объект. Допустим может появится задача сделать многоязычный сайт
        // Для примера : const words = { validationLenght: 'Должно быть от 2 до 30 символов'	} 
        // Далее words передаётся в функцию и используется.
        this.popup.querySelector('.popup__title').textContent = 'Новое место';
        this.popup.querySelector('.popup__input_type_name').placeholder = 'Название';
        this.popup.querySelector('.popup__input_type_data').placeholder = 'Ссылка на картинку';
        this.popup.querySelector('.popup__input_type_data').name = 'link';
        this.popup.querySelector('.popup__error-name-line').textContent = 'Это поле обязательно';
        this.popup.querySelector('.popup__error-data-line').textContent = 'Это поле обязательно';
        this.popup.querySelector('.popup__button').classList.add('popup__button_add');
        this.popup.querySelector('.popup__button').textContent = '+';
        this.popup.querySelector('.popup__button').setAttribute('disabled', '');
        this.popup.querySelector('.popup__input_type_name').value = '';
        this.popup.querySelector('.popup__input_type_data').value = '';
        this.saveNewCardHandler = this.saveNewCard.bind(this);
        this.popup.querySelector('.popup__form').addEventListener('submit', this.saveNewCardHandler);
        super.open();
    }

    close() {
        this.popup.querySelector('.popup__form').removeEventListener('submit', this.saveNewCardHandler);
        super.close();
    }

    saveNewCard(event) {
        const form = event.currentTarget;
        const name = form.elements.name.value;
        const data = form.elements.link.value;
        event.preventDefault();
        this.popup.querySelector('.popup__button').classList.remove('popup__button_add');
        this.popup.querySelector('.popup__button').textContent = 'Загрузка...';
        this.cardList.saveCard(name, data)
        .finally(() => {
            this.close();
        });
    }
}