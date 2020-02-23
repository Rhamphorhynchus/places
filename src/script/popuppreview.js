class PopupPreview extends Popup {
  constructor(popup, url) {
    super(popup);
    this.url = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg';
    this.popup.querySelector('.popup__preview').src = url;
  }

  open() {
    super.open();
  }
}