export class FormValidator {

  setForm(form) {
    this.form = form;
    this.setEventListeners();
  }

  checkInputValidity(element, errorElement) {
    if (element.value.length === 0) {
      // Можно лучше: обычно названия, для примера 'Должно быть от 2 до 30 символов' 
      // выносят в отдельный объект. Допустим может появится задача сделать многоязычный сайт
      // Для примера : const words = { validationLenght: 'Должно быть от 2 до 30 символов'	} 
      // Далее words передаётся в функцию и используется.
      errorElement.textContent = 'Это поле обязательно';
      return false;
    }

    if (['name', 'about'].includes(element.name) &&
      ((element.value.length < 2) || (element.value.length > 30))) {
      errorElement.textContent = 'Должно быть от 2 до 30 символов';
      return false;
    }
    if ((element.name === 'link') && (!this.isLink(element.value))) {
      errorElement.textContent = 'Здесь должна быть ссылка';
      return false
    }
    errorElement.textContent = '';
    return true;
  }

  setSubmitButtonState(event) {
    const form = event.currentTarget;
    const name = form.elements.name;
    const data = form.querySelector('.popup__input_type_data');

    let checkForm = true;

    checkForm &= this.checkInputValidity(name, form.querySelector('.popup__error-name-line'));
    checkForm &= this.checkInputValidity(data, form.querySelector('.popup__error-data-line'));

    if (!checkForm) {
      form.querySelector('.popup__button').setAttribute('disabled', '');
    } else {
      form.querySelector('.popup__button').removeAttribute('disabled');
    }
  }

  setEventListeners() {
    this.setSubmitButtonStateHandler = this.setSubmitButtonState.bind(this);
    this.form.addEventListener('input', this.setSubmitButtonStateHandler);
  }

  removeEventListeners() {
    if (this.form !== undefined) {
      this.form.removeEventListener('input', this.setSubmitButtonStateHandler);
    }
  }

  isLink(value) {
    return value.startsWith('http://') || value.startsWith('https://');
  }
}