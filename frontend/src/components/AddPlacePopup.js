import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {

    const [description, setDescription] = React.useState('')
    const [name, setName] = React.useState('')

    function handleChangeName(e) {
        setName(e.target.value)
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.onCardAdd({
                name,
                link: description
            },
        );
    }

    React.useEffect(()=> {
        setName('')
        setDescription('')
    },[props.isOpen])

    return(
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name="place"
            title="Новое место"
            submitText="Сохранить"
            onSubmit={handleSubmit}
        >
            <div className="popup__inputs">
                <label className="popup__label">
                    <input
                        placeholder="Название"
                        type="text"
                        required=""
                        minLength={2}
                        maxLength={30}
                        className="popup__input"
                        id="input__place"
                        value={name || ""}
                        onChange={handleChangeName}
                    />
                    <span id="input__place-error" className="error"/>
                </label>
                <label className="popup__label">
                    <input
                        placeholder="Ссылка на картинку"
                        required=""
                        type="url"
                        className="popup__input"
                        id="input__href"
                        onChange={handleChangeDescription}
                        value={description || ""}
                    />
                    <span id="input__href-error" className="error"/>
                </label>
            </div>
        </PopupWithForm>
    )
}
export default AddPlacePopup;