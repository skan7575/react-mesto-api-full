import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (

        `gallery__button-remove ${isOwn
            ? 'gallery__button-remove_visible'
            : 'gallery__button-remove_disabled'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = isLiked
        ? 'gallery__like-button gallery__like-button_active'
        : 'gallery__like-button'
    ;

    function handleCardClick() {
        props.onCardClick(props.name, props.link);
    }

    function handleCardDelete() {
        props.onCardDelete(props.id)
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    return (
        <li className="card-item">
            <img
                src={props.link}
                alt={props.name}
                className="gallery__pic"
                onClick={handleCardClick}
            />
            <button className={cardDeleteButtonClassName}
                    onClick={handleCardDelete}
            />
            <div className="gallery__about">
                <h2 className="gallery__title">{props.name}</h2>
                <div className="galley__like-items">
                    <button
                        type="button"
                        title="поставить лайк"
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}
                    />
                    <span className="gallery__like-counter">
                        {props.likes.length}
                    </span>
                </div>
            </div>
        </li>
    )
}

export default Card;