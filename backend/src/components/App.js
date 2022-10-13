import React, {useEffect, useState} from 'react';
import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import {BrowserRouter as Router, Redirect, Route, Switch, useHistory} from "react-router-dom";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";


function App() {

    const [userData, setUserData] = useState({email: 'EMAIL'});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [tooltip, setTooltip] = useState(false)
    const [selectedCard, setSelectedCard] = useState({});
    const [isOpenPopupDeleteCard, setIsOpenPopupDeleteCard] = useState(false);
    const [currentUser, setCurrentUser] = useState({})
    const [regStatus, setRegStatus] = useState(false)
    const [cards, setCards] = useState([])
    const [loggedIn, setLoggedIn] = useState(false);
    const [infoToolTipData, setInfoToolTipData] = React.useState({
        title: '',
        icon: null
    })
    const history = useHistory()
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link || infoToolTipData

    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen])


    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.error(err);
            });

    }

    //проверяем токен при загрузке Апп
    useEffect(() => {
        tokenCheck();
    },[]);

    useEffect(() => {
        api.getInitialData()
            .then((data) => {
                const [userData, cardsData] = data
                setCards(cardsData)
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [history, loggedIn])

    function handleUpdateUser(newUserData) {
        api.editProfile(newUserData.name, newUserData.about)
            .then(
                (onUpdateUser) => {
                    setCurrentUser(onUpdateUser);
                    closeAllPopups();
                },
            )
            .catch((err) => {
                console.error(err);
            });
    }

    function handleCardClick(name, link) {
        setSelectedCard({title: name, link: link});
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);

    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardDelete(card) {
        api.deleteCard(card)
            .then(
                () => {
                    setCards(prevState => prevState.filter((e) => e._id !== card));
                }
            )
            .catch((err) => {
                console.error(err);
            })
    }

    function handleAddPlaceSubmit(card) {
        api.addCard(card.name, card.link)
            .then(
                (newCard) => {
                    setCards([newCard, ...cards]);
                    closeAllPopups();
                }
            )

            .catch((err) => {
                console.error(err);
            })

    }

    function handleUpdateAvatar(newAvatar) {

        api.editAvatar(newAvatar.avatar)
            .then((onUpdateAvatar) => {
                setCurrentUser(onUpdateAvatar)
                closeAllPopups();
            })
            .catch((err) => {
                console.error(err);
            })
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsOpenPopupDeleteCard(false);
        setTooltip(false)
        setSelectedCard({})

    }


    function handleRegister(email, password) {
        auth.register(email, password).then((res) => {
            if (res.data) {
                setRegStatus(true);
                setInfoToolTipData({icon: true, title: 'Вы успешно зарегистрировались!'});
                history.push('/sign-in');
            } else {
                setInfoToolTipData({icon: false, title: 'Что-то пошло не так. Попробуйте ещё раз.'});
            }
        })
            .catch((err) => {
                console.error(err);
                setInfoToolTipData({icon: false, title: 'Что-то пошло не так. Попробуйте ещё раз.'});
            })
            .finally(() => {
                setTooltip(true)
            });
    }

    function handleLogin(token, email) {
        setLoggedIn(true)
        setUserData({email: email});
        localStorage.setItem('token', token);
        history.push('/');
    }

    function handleLogout() {
        localStorage.removeItem('token');
        setUserData({email: ''});
        setLoggedIn(false);
        history.push("/sign-in")
    }

    function tokenCheck() {
        const token = localStorage.getItem('token');
        if (token) {
            auth
                .checkToken(token)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true)
                        setUserData({email: res.email});
                        history.push('/');
                    } else {
                        history.push('/sign-in');
                    }
                })
                .catch((err) => console.error(err));
        }
    }



    return (
        <CurrentUserContext.Provider
            value={currentUser}
        >
            <div className="page">
                <Header
                    onSignOut={handleLogout}
                    HeaderEmail={userData.email}
                />
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        component={Main}
                        loggedIn={loggedIn}
                        onImagePopup={handleCardClick}
                    />
                    <Route path="/sign-in">
                        <Login onLogin={handleLogin} />
                    </Route>
                    <Route path="/sign-up">
                        <Register onRegister={handleRegister} regStatus={regStatus}/>
                    </Route>
                    <Route exact path="/">
                        {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
                    </Route>
                    <Route path="/*">
                        <NotFound/>
                    </Route>
                </Switch>
                <Footer/>
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onCardAdd={handleAddPlaceSubmit}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <EditProfilePopup
                    onUpdateUser={handleUpdateUser}
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    currentUser={currentUser}
                />
                <PopupWithForm
                    isOpen={isOpenPopupDeleteCard}
                    onClose={closeAllPopups}
                    name="delete"
                    title="Вы уверены?"
                    submitText="Удалить"

                />
                <ImagePopup
                    title={selectedCard.title}
                    link={selectedCard.link}
                    onClose={closeAllPopups}
                />
                <InfoTooltip
                    icon={infoToolTipData.icon}
                    title={infoToolTipData.title}
                    isOpen={tooltip}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
