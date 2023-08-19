class Api {
  constructor(basePath, token) {
    this._basePath = basePath;
    this._token = token;
  }

  _getHeaders() {
    return {
      authorization: this._token,
      "Content-Type": "application/json",
    };
  }

  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCards() {
    const p = fetch(`${this._basePath}/cards`, {
      headers: this._getHeaders(),
    });
    return p.then(this._getJson).catch((err) => {
      console.log(err);
    });
  }

  getUser() {
    const p = fetch(`${this._basePath}/users/me`, {
      headers: this._getHeaders(),
    });

    return p.then(this._getJson).catch((err) => {
      console.log(err);
    });
  }

  changeUserInfo(newItems) {
    return fetch(`${this._basePath}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: newItems["profile-name"],
        about: newItems["profile-job"],
      }),
    }).then(this._getJson);
  }

  postNewCard(newItems) {
    return fetch(`${this._basePath}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: newItems["place-name"],
        link: newItems["place-src"],
      }),
    }).then(this._getJson);
  }

  likeCard(cardId) {
    return fetch(`${this._basePath}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then(this._getJson);
  }

  cardIsLiked(cardId) {
    return fetch(`${this._basePath}/cards/${cardId}/likes`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._getJson);
  }

  dislikeCard(cardId) {
    return fetch(`${this._basePath}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJson);
  }

  deleteCard(id) {
    return fetch(`${this._basePath}/cards/${id}`, {
      headers: this._getHeaders(),
      method: "DELETE",
    }).then(this._getJson);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.dislikeCard(cardId) : this.likeCard(cardId);
  }

  changeUserAvatar(src) {
    return fetch(`${this._basePath}/users/me/avatar`, {
      headers: this._getHeaders(),
      method: "PATCH",
      body: JSON.stringify({ avatar: src["avatar-src"] }),
    }).then(this._getJson);
  }
}

const api = new Api(
  "http://localhost:3001",
  `Bearer ${localStorage.jwt}`
  // "https://mesto.nomoreparties.co/v1/cohort-61",
  // "0811e36d-148a-4352-a51a-0b6cc8b0cc05"
);
export { api };
