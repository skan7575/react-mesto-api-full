import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import * as auth from "../utils/auth";

const Login = ({onLogin}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.email || !formData.password) {
            return
        }
        {
            auth.authorize(formData.email, formData.password)
                .then((data) => {
                    if (!data) {
                        return console.log('ошибка авторизации')
                    }
                    if (data.token) {
                        onLogin(data.token, formData.email)
                        setFormData({
                            email: '',
                            password: ''
                        })
                        history.push('/')
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    return (
        <div className="login">
            <div className="login__content">
                <h2 className="login__title">Вход</h2>
                <form className="login__form" onSubmit={handleSubmit}>
                    <fieldset className="login__form-fieldset">
                        <label className="login__form-label">
                            <input
                                value={formData.email}
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                minLength="2"
                                maxLength="40"
                                className='login__form-input'
                                onChange={handleChange}
                            />
                            <span className='login__form-error'> </span>
                        </label>

                        <label className="login__form-label">
                            <input
                                value={formData.password}
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                required
                                minLength="2"
                                maxLength="200"
                                className='login__form-input'
                                onChange={handleChange}
                            />
                            <span className='login__form-error'> </span>
                        </label>
                        <button className='login__form-submit' type="submit">
                            Войти
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}
export default Login