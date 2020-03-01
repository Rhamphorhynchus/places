import {PopupPreview} from './popuppreview.js';

export class Card {
  constructor(api) {
    this.api = api;
  }

  create(title, url, id, likes, isLikedByMe, isMine) {
    const placeCard = document.createElement('div');
    placeCard.classList.add('place-card');
    
    const placeCardImage = document.createElement('div');
    placeCardImage.classList.add('place-card__image');
    placeCardImage.style.backgroundImage = `url(${url})`;
    placeCardImage.addEventListener('click', this.showPreview);
    
    const placeCardDescription = document.createElement('div');
    placeCardDescription.classList.add('place-card__description');
    
    const placeCardName = document.createElement('h3');
    placeCardName.classList.add('place-card__name');
    placeCardName.textContent = title;

    const placeCardLikeContainer = document.createElement('div');
    placeCardLikeContainer.classList.add('place-card__like-container');
    
    const placeCardLikeIcon = document.createElement('button');
    placeCardLikeIcon.classList.add('place-card__like-icon');
    if (isLikedByMe) {
      placeCardLikeIcon.classList.add('place-card__like-icon_liked');
    }
    placeCardLikeIcon.addEventListener('click', this.like.bind(this));

    const placeCardLikeCounter = document.createElement('p');
    placeCardLikeCounter.classList.add('place-card__like-count');
    placeCardLikeCounter.textContent = `${likes}`;

    placeCard.appendChild(placeCardImage);
    if (isMine) {
      const placeCardDeleteIcon = document.createElement('button');
      placeCardDeleteIcon.classList.add('place-card__delete-icon');
      placeCardDeleteIcon.addEventListener('click', this.remove.bind(this));
      placeCardImage.appendChild(placeCardDeleteIcon);
    }

    placeCard.appendChild(placeCardDescription);
    placeCardDescription.appendChild(placeCardName);
    placeCardLikeContainer.appendChild(placeCardLikeIcon);
    placeCardLikeContainer.appendChild(placeCardLikeCounter);
    placeCardDescription.appendChild(placeCardLikeContainer);

    placeCard.dataset.id = id;

    return placeCard;
  }

  like(event) {
    const cardId = event.target.parentNode.parentNode.parentNode.dataset.id;
    if (event.target.classList.contains('place-card__like-icon_liked')) {
      this.api.deleteLike(cardId).then((card) => {
        event.target.classList.remove('place-card__like-icon_liked');
        event.target.parentNode.querySelector('.place-card__like-count').textContent = `${card.likes.length}`;
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      this.api.saveLike(cardId).then((card) => {
        event.target.classList.add('place-card__like-icon_liked');
        event.target.parentNode.querySelector('.place-card__like-count').textContent = `${card.likes.length}`;
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  remove(event) {
    if (confirm('Вы дейстыительно хотите удалить карточку')) {
      this.api.deleteCard(event.target.parentNode.parentNode.dataset.id)
        .then(() => {
          event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  showPreview(event) {
    if (event.target.classList.contains('place-card__image')) {
      let url = event.target.style.backgroundImage
      url = url.slice(url.indexOf('"') + 1, url.lastIndexOf('"'));
      const preview = new PopupPreview(document.querySelector('.popup-preview'), url);
      preview.open();
    }
  }

  isCardLikedByMe(card, id) {
    return card.likes.some(function(user) {
        return user._id === id;
      });
  }
}