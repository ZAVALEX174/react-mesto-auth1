import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useEffect, useState } from "react";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { CurrentCardContext } from "../contexts/CurrentCardContext";
import Register from "./Register";
import Login from "./Login";
import { ProtectedRoute } from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { register, authorize, getContent } from "../utils/auth";
import useFormAndValidation from "./useFormAndValidation";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [isLoading, setLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  //анимация загрузки страницы
  const [loadingBoolean, setLoadingBoolean] = useState(false);

  //состояние попапа ответа регистрации
  const [isOpenInfoTooltip, setOpenInfoTooltip] = React.useState(false);

  //состояние авторизации пользователя:
  const [loggedIn, setLoggedIn] = useState(false);
  //состояние регистрации
  const [message, setMessage] = useState({
    status: false,
    text: "",
  });
  //email авторизированного пользователя
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  function handleLogin(formValues, resetForm, setLoading) {
    setLoadingBoolean(false);

    const { password, email } = formValues;
    authorize(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/", { replace: true });
        setEmail(email);
      })
      .catch((res) => {
        if (res === "Ошибка: 401") {
          setMessage({
            status: false,
            text: "Аккаунт не зарегистрирован",
          });
        } else {
          setMessage({
            status: false,
            text: res,
          });
        }
        setLoadingBoolean(true);
        setOpenInfoTooltip(true);
      })
      .finally(() => {
        resetForm();
        setLoading(false);
      });
  }

  function handleRegister(formValues, resetForm, setLoading) {
    const { password, email } = formValues;
    register(password, email)
      .then(() => {
        setMessage({
          status: true,
          text: "Вы успешно зарегистрировались!",
        });
        navigate("/sign-in", { replace: true });
      })
      .catch(() => {
        setMessage({
          status: false,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      })
      .finally(() => {
        resetForm();
        setLoading(false);
        setOpenInfoTooltip(true);
      });
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
          setLoadingBoolean(true);
        });
    } else {
      setLoadingBoolean(true);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([data, cards]) => {
          setCurrentUser(data);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoadingBoolean(true);
        });
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    // document.querySelector(".popup_avatar-form").classList.add("popup_opened");
    setEditAvatarPopupOpen(true);
  }

  function handleUpdateAvatar(data) {
    setLoading(true);
    api
      .setAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleEditProfileClick() {
    // document.querySelector(".profile-popup").classList.add("popup_opened");
    setEditProfilePopupOpen(true);
  }

  function handleUpdateUser(data) {
    setLoading(true);
    api
      .setUserProfile(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // Добавление карточек:
  function handleAddPlaceClick() {
    // document.querySelector(".popup_image").classList.add("popup_opened");
    setAddPlacePopupOpen(true);
  }

  function handleAddPlaceSubmit(data) {
    setLoading(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // Добавление лайков:
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api
        .likeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      api
        .removeLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  // Функция удаления карточки:
  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Закрытие всех popup:
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setOpenInfoTooltip(false);
  }

  // Закрытие по кнопке Esc:
  function closePopupWithEsc(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  // Закрытие по owerLay:
  function closePopupWithClickOnOwerlay(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closeAllPopups();
    }
  }

  // функция выхода
  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
    setLoggedIn(false);
    setEmail("");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentCardContext.Provider value={setCards}>
        <>
          <div className="page">
            <Header email={email} signOut={signOut} />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute
                    component={Main}
                    loggedIn={loggedIn}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={setSelectedCard}
                    cards={cards}
                  />
                }
              />

              <Route
                path="/sign-up"
                element={
                  <Register
                    onRegister={handleRegister}
                    setMessage={setMessage}
                    setOpenInfoTooltip={setOpenInfoTooltip}
                  />
                }
              />
              <Route
                path="/sign-in"
                element={<Login onLogin={handleLogin} />}
              />
            </Routes>
            <Footer />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onCloseEsc={closePopupWithEsc}
              onCloseOverlay={closePopupWithClickOnOwerlay}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onCloseEsc={closePopupWithEsc}
              onCloseOverlay={closePopupWithClickOnOwerlay}
              onAddPlace={handleAddPlaceSubmit}
              isLoading={isLoading}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onCloseEsc={closePopupWithEsc}
              onCloseOverlay={closePopupWithClickOnOwerlay}
              onUpdateAvatar={handleUpdateAvatar}
              isLoading={isLoading}
            />

            {/* Подтверждение удаления карточки: */}
            <PopupWithForm
              title="Вы уверены?"
              name=""
              popup="confirm"
              buttonText="Да"
              onClose={closeAllPopups}
            >
              {/* <button
            className="popup__button popup__save"
            type="submit"
            value="Да"
           >
            Да
           </button> */}
            </PopupWithForm>

            <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups}
              onCloseEsc={closePopupWithEsc}
              onCloseOverlay={closePopupWithClickOnOwerlay}
            />

            <InfoTooltip
              isOpen={isOpenInfoTooltip}
              onClose={closeAllPopups}
              message={message}
              onCloseOverlay={closePopupWithClickOnOwerlay}
            />
          </div>
        </>
      </CurrentCardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
