import React from "react";
import success from "../images/Union.svg";
import error from "../images/Union _error.svg"

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container popup__container_tooltip">
                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
                {InfoTooltipIcon(props.icon)}

                {/* {*/}
                {/*    props.icon*/}
                {/*        ? (<img src={success} alt="удача" className="info-tooltip__image"/>)*/}
                {/*        : (<img src={error} alt="неудача" className="info-tooltip__image"/>)*/}
                {/*}*/}
                <h3 className="popup__text popup__text_tooltip">{props.title}</h3>
            </div>
        </div>
    )
}

function InfoTooltipIcon(icon) {
    switch (icon) {
        case true:
            return <img src={success} alt="удача" className="info-tooltip__image"/>
        case false:
            return <img src={error} alt="неудача" className="info-tooltip__image"/>
        default:
            return <img/>
    }
}

export default InfoTooltip