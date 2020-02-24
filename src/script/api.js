export class Api {
    constructor(token, group, ip) {
        this.token = token;
        this.group = group;
        this.ip = ip;
        this.url = `${NODE_ENV === 'development' ? 'http://' : 'https://'}${this.ip}/${this.group}`;
        this.headers = {
            authorization: this.token,
            //credentials: "include",
            //'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin': '*',
            //'Sec-Fetch-Site': 'cross-site',
            //'Sec-Fetch-Mode': 'cors',
        };
    }

    _apiCall(url, method, body) {
        return fetch(url, {
            method,
            mode: 'cors',
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
        })
        .catch((error) => {
            console.log(error + '22222');
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
}