function ImagePopup(props) {
    return (
    <div id="popup__picture" className={`popup popup-opacity ${(props.link != null) && 'popup_opened'}`}>
        <div className="popup__container popup__container_photo">
            <button
                id="clouse__button"
                className="popup__close-button"
                type="button"
                onClick={props.onClose}
            />
            <img className="popup__picture-caption" alt={props.title} src={props.link}/>
            <h3 className="popup__text popup__text_picture" >
                {props.title}
            </h3>
        </div>
    </div>
    )
}

export default ImagePopup;