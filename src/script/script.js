(function () {
  const token = '8505cab2-eccb-4b77-b668-43fd01724287';
  const group = 'cohort7';
  const ip = '95.216.175.5';

  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
      name: 'Нургуш',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
    },
    {
      name: 'Тулиновка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
    },
    {
      name: 'Остров Желтухина',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
    },
    {
      name: 'Владивосток',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
    }
  ];

  const api = new Api(token, group, ip);

  const addButton = document.querySelector('.user-info__button');
  const editUserButton = document.querySelector('.user-info__edit-button');

  const userInfo = new UserInfo('', '', api);
  userInfo.getUserInfo();

  const card = new Card(api);
  const cardList = new CardList(document.querySelector('.places-list'), [], card, userInfo, api);
  cardList.getCards();

  const popupUserValidator = new FormValidator();
  const popupUser = new PopupUser(document.querySelector('.popup'), popupUserValidator);

  const popupCardValidator = new FormValidator();
  const popupCard = new PopupNew(document.querySelector('.popup'), cardList, popupCardValidator);

  editUserButton.addEventListener('click', popupUser.open.bind(popupUser, userInfo));
  addButton.addEventListener('click', popupCard.open.bind(popupCard));

})();

/**
* Здравствуйте.
* --------------------------------------------------------------------
* Весь функционал работает корректно
* Код чистый и хорошо читается
* Вы используете логические группировки операций
* У вас нет дублирование кода
*  Вы не используете небезопасный innerHtml
*  Вы используете делегирование
* --------------------------------------------------------------------
*
* Здравствуйте
*  initialCards можно удалить, вам он больше не ннужен
* Если код не используется, лучше его удалить, чтобы в будущем не заострять на нём внимание
*
* Вы молодцы что вынесли всё в метод _apiCall. Этим вы убрали дублирование кода, но туда стоить добавить catch,
* так как любые проблемы с сетью должны обрабатываться именно в этом классе. Есправьте пожалуйста до следующего спринта
*
*/