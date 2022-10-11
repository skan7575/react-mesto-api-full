import React, {useEffect, useState} from 'react';
import {api} from "../utils/api";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="user">
                <div className="user__profile">
                    <div className="user__picture-edit">
                        <img
                            src={currentUser.avatar}
                            alt="Фотография профиля"
                            className="user__picture"
                        />
                        <button
                            title="Редактировать изображение"
                            id="button-edit-image"
                            className="user__picture-button"
                            onClick={props.onEditAvatar}
                        />
                    </div>
                    <div className="user__profile-text">
                        <h1 className={"user__profile-name"}>
                            {currentUser.name}
                        </h1>
                        <p className="user__profile-about"
                        >
                            {currentUser.about}

                        </p>
                        <button
                            id="button__profile"
                            type="button"
                            title="Редактировать профиль"
                            className="user__profile-button"
                            onClick={props.onEditProfile}
                        />
                    </div>
                </div>
                <button
                    type="button"
                    title="Добавить в ленту"
                    className="user__add-button"
                    id="btnAdd"
                    onClick={props.onAddPlace}
                />
            </section>
            <section className="gallery">
                <ul className="gallery__items">
                    {props.cards.map((card) => (
                        <Card
                            onCardLike={props.onCardLike}
                            card={card}
                            key={card._id}
                            id={card._id}
                            name={card.name}
                            link={card.link}
                            likes={card.likes}
                            onCardClick={props.onImagePopup}
                            onCardDelete={props.onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main;