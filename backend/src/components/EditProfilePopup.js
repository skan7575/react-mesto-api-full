import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);


    const [name, setName] = React.useState("")

    const [description, setDescription] = React.useState("")


    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
                name,
                about: description
            },
        );
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name="profile"
            title="Изменить профиль"
            submitText="Сохранить"
            onSubmit={handleSubmit}
        >
            <label className="popup__label">
                <input
                    value={name || ""}
                    onChange={handleChangeName}
                    name="name"
                    placeholder="Имя"
                    required=""
                    type="text"
                    minLength={2}
                    maxLength={40}
                    className="popup__input"
                    id="input__name"
                />
                <span id="input__name-error" className="error"/>
            </label>
            <label className="popup__label">
                <input
                    onChange={handleChangeDescription}
                    value={description || ""}
                    name="about"
                    placeholder="Описание"
                    required=""
                    minLength={2}
                    maxLength={200}
                    type="text"
                    className="popup__input"
                    id="input__about"
                />
                <span id="input__about-error" className="error"/>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup