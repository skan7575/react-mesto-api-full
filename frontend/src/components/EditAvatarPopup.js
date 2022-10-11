import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {

    const avatarPicture = React.useRef()

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarPicture.current.value
        })
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name="avatar"
            title="Изменить аватар"
            submitText="Сохранить"
            onSubmit={handleSubmit}
            onUpdateAvatar={props.onUpdateAvatar}
        >
            <input
                placeholder="Ссылка на картинку"
                required=""
                type="url"
                className="popup__input"
                id="input__href_avatar"
                ref={avatarPicture}
            />
            <span id="input__href_avatar-error" className="error"/>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;