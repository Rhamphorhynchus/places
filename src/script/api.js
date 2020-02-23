class Api {
    constructor(token, group, ip) {
        this.token = token;
        this.group = group;
        this.ip = ip;
        this.url = `http://${this.ip}/${this.group}`;
        this.headers = {
            authorization: this.token,
            'Content-Type': 'application/json'
        };
    }

    _apiCall(url, method, body) {
        return fetch(url, {
            method,
            headers: this.headers,
            body
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((result) => {
            return Promise.resolve(result);
        });
    }

    getUserInfo() {
        return this._apiCall(`${this.url}/users/me`, 'GET');
    }

    setUserInfo(name, about) {
        return this._apiCall(`${this.url}/users/me`, 'PATCH', JSON.stringify({
            name: name,
            about: about
        }));
    }
    
    getCards() {
        return this._apiCall(`${this.url}/cards`, 'GET');
    }

    saveCard(name, url) {
        return this._apiCall(`${this.url}/cards`, 'POST', JSON.stringify({
            name: name,
            link: url
          }));
    }

    deleteCard(id) {
        return this._apiCall(`${this.url}/cards/${id}`, 'DELETE');
    }

    saveLike(cardId) {
        return this._apiCall(`${this.url}/cards/like/${cardId}`, 'PUT');
    }

    deleteLike(cardId) {
        return this._apiCall(`${this.url}/cards/like/${cardId}`, 'DELETE');
    }
    

    /*
    getUserInfo() {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((result) => {
            //console.log(result);
            return Promise.resolve(result);
        })
    }
    */

    /*
    setUserInfo(name, about) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((result) => {
            //console.log(result);
            return Promise.resolve(result);
        })
    }
    */

    /*
    getCards() {
        return fetch(`${this.url}/cards`, {
            method: 'GET',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((result) => {
            return Promise.resolve(result);
        })
    }
    */

    /*
    saveCard(name, url) {
        return fetch(`${this.url}/cards`, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({
            name: name,
            link: url
          })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((result) => {
            return Promise.resolve(result);
        })
    }
    */

    /*
    deleteCard(id) {
        return fetch(`${this.url}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((result) => {
            return Promise.resolve(result);
        })
    }
    */

    /*
    saveLike(cardId) {
        return fetch(`${this.url}/cards/like/${cardId}`, {
            method: 'PUT',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((result) => {
            return Promise.resolve(result);
        })
    }
    */

    /*
    deleteLike(cardId) {
        return fetch(`${this.url}/cards/like/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((result) => {
            return Promise.resolve(result);
        })
    }
    */
}