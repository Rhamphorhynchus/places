class CardList {
  constructor(container, cards, card, user, api) {
    this.container = container;
    this.cards = cards;
    this.card = card;
    this.api = api;
    this.user = user;
  }

  getCards() {
    this.api.getCards()
    .then((cards) => {
      this.cards = cards;
      this.render();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  addCard(name, link, id, likes, likedByMe, isMine) {
    this.container.appendChild(this.card.create(name, link, id, likes, likedByMe, isMine));
  }

  saveCard(name, link) {
    return this.api.saveCard(name, link)
    .then((card) => {
      this.cards.push(card);
      this.addCard(card.name, card.link, card._id, card.likes.length, false, true);
    })
    .catch((res) => {
      console.log(res);
    })
  }

  addCardByLink(name, link) {
    this.addCard(name, link);
  }

  render() {
    for (const element of this.cards) {
      this.addCard(element.name, element.link, element._id, element.likes.length, this.card.isCardLikedByMe(element, this.user.id), element.owner._id === this.user.id);
    }
  }
}