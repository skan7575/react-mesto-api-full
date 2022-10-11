import {useHistory} from "react-router-dom";
import {useState} from "react";

const Register = ({onRegister, regStatus}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(email, password)
    }

    function goToLogin () {
        history.push('/sign-in')
    }

    return (
        <div className="login">
            <div className="login__content">
                <h2 className="login__title">Регистрация</h2>
                <form className="login__form" noValidate onSubmit={handleSubmit}>
                    <fieldset className="login__form-fieldset">
                        <label className="login__form-label">
                            <input
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                minLength="2"
                                maxLength="40"
                                className='login__form-input'
                            />
                            <span className='login__form-error'> </span>
                        </label>

                        <label className="login__form-label">
                            <input
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                required
                                minLength="2"
                                maxLength="200"
                                className='login__form-input'
                            />
                            <span className='login__form-error'> </span>
                        </label>
                        <button className='login__form-submit' type="submit">
                            Зарегистрироваться
                        </button>
                    </fieldset>
                </form>
                <div className="login__sub-container">
                    <p className='login__sub-container-text'>Уже зарегистрированы?</p>
                    <button className='login__sub-container-button' onClick={goToLogin}>Войти</button>
                </div>
            </div>
        </div>
    )
}

export default Register