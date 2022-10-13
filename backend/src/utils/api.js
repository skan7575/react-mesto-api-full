import {baseLink} from "./virables";
import getResponseData from "./utils";


class Api {
    constructor({baseUrl, headers}) {
        this.bdlink = baseUrl
        this.headers = headers
    }

    getProfile() {
        return fetch(`${this.bdlink}/users/me`, {
            headers: this.headers(),
        })
            .then(getResponseData)
    }



    editProfile(name, about) {
        return fetch(`${this.bdlink}/users/me`, {
            method: 'PATCH',
            headers: this.headers(),
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(getResponseData)
    }

    editAvatar(avatar) {
        return fetch(`${this.bdlink}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers(),
            body: JSON.stringify({
                avatar,
            })
        })
            .then(getResponseData)
    }

    addCard(name, link) {
        return fetch(`${this.bdlink}/cards`, {
            method: 'POST',
            headers: this.headers(),
            body: JSON.stringify({
                name,
                link,
            })
        })
            .then(getResponseData)
    }

    getInitialCards() {
        return fetch(`${this.bdlink}/cards`, {
            headers: this.headers(),
        })
            .then(getResponseData)
    }


    deleteCard(cardId) {
        return fetch(`${this.bdlink}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers(),
        })
            .then(getResponseData)
    }

    changeLikeCardStatus(cardId, isLiked) {
        if(!isLiked) {
            return this.deleteLike(cardId)
        } else {
            return this.setLike(cardId)
        }
    }

    setLike(cardId) {
        return fetch(`${this.bdlink}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this.headers(),
        })
            .then(getResponseData)
    }


    deleteLike(cardId) {
        return fetch(`${this.bdlink}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this.headers(),
        })
            .then(getResponseData)
    }

    getInitialData() {
        return Promise.all([this.getProfile(), this.getInitialCards()]);

    }

}

export const api = new Api({
    baseUrl: baseLink,
    headers: () => {
        return {
            authorization: "Bearer " + localStorage.getItem("token"),
            'Content-Type':'application/json',
        }
    }
})