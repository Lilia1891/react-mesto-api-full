export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }


  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(this.baseUrl + "/users/me", {
      headers: {
        authorization: localStorage.getItem('jwt'),
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(this.baseUrl + "/cards", {
      headers: {
        authorization: localStorage.getItem('jwt'),
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  editProfile(data) {
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: localStorage.getItem('jwt'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponseData);
  }

  addNewCard(item) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: {
        authorization: localStorage.getItem('jwt'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(this.baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem('jwt'),
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  toggleLike(cardId, isLiked) {
    return fetch(this.baseUrl + "/cards/" + cardId + "/likes", {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        authorization: localStorage.getItem('jwt'),
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  changeAvatar(item) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: localStorage.getItem('jwt'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: item.avatar,
      }),
    }).then(this._getResponseData);
  }
}

const api = new Api({
  baseUrl: "https://api.mesto-praktikum.nomoredomains.icu"
});

export default api;
