import logoPatch from "../images/Vector.svg";
import {useHistory} from "react-router-dom";
import HeaderUser from "./HeaderUser";

function Header({HeaderEmail, onSignOut}) {
    const history = useHistory()

    const handleLogo = (e) => {
        e.preventDefault();
        history.push('/')
    }

    return (
        <header className="header">
            <img
                src={logoPatch}
                alt="Логотип Место"
                className="header__logo"
                onClick={handleLogo}
            />
            <div className="header__container">
                <HeaderUser
                    onSignOut={onSignOut}
                    HeaderEmail={HeaderEmail}
                />
            </div>
        </header>
    )
}

export default Header;