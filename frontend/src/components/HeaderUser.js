import {Link, Route, Switch, useHistory} from "react-router-dom";

function HeaderUser({HeaderEmail, onSignOut}) {
    return (
        <div className="header__bar">
            <Switch>
                <Route exact path="/">
                    <div className="header__container">
                        <p className="header__text">{HeaderEmail}</p>
                        <Link to="/sign-in" className="header__link" onClick={onSignOut}>
                            Выйти
                        </Link>
                    </div>
                </Route>
                <Route path="/sign-in">
                    <Link to="/sign-up" className="header__link">
                        Регистрация
                    </Link>
                </Route>

                <Route path="/sign-up">
                    <Link to="/sign-in" className="header__link">
                        Войти
                    </Link>
                </Route>
            </Switch>
        </div>
    )
}

export default HeaderUser