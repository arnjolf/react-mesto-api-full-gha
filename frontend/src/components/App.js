import { useState, useEffect } from "react";
import { api } from "../utils/Api";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import { UserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { tokenAuth, authorize, register } from "../utils/Auth";
import InfoTooltip from "./InfoTooltip/InfoTooltip";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      tokenAuth(jwt)
        .then((res) => {
          if (res) {
            setUserEmail(res.email);
            setLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
          setIsInfoTooltipSuccess(false);
          setIsInfoTooltipOpen(true);
        });
    }
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  useEffect(() => {
    if (loggedIn) {
      api
        .getUser()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getCards()
        .then((res) => {
          setCards(res.data.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/sign-up", { replace: true });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards(cards.map((c) => (c._id === card._id ? newCard.data : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(newUserInfo) {
    api
      .changeUserInfo(newUserInfo)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(newImage) {
    api
      .changeUserAvatar({ "avatar-src": newImage })
      .then((res) => {
        setCurrentUser(res.data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .postNewCard(newCard)
      .then((res) => {
        setCards([res.data, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAuth(formValue) {
    authorize(formValue.email, formValue.password)
      .then((data) => {
        console.log(data);
        console.log(localStorage.jwt);
        if (data.token) {
          api.getUser().then((res) => {
            console.log(res);
          });
          setUserEmail(formValue.email);
          handleLogin();
          navigate("/", { replace: true });
        }
      })
      .catch(() => {
        setIsInfoTooltipSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleRegister(email, password) {
    register(email, password)
      .then(() => {
        setIsInfoTooltipSuccess(true);
        setIsInfoTooltipOpen(true);
        navigate("/sign-in", { replace: true });
      })
      .catch(() => {
        setIsInfoTooltipSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <UserContext.Provider value={currentUser}>
      <div className="App">
        <div className="wrapper">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  userEmail={userEmail}
                  element={Main}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  loggedIn={loggedIn}
                  onSignOut={signOut}
                />
              }
            />
            <Route
              path="*"
              element={
                <Login
                  handleLogin={handleLogin}
                  setUserEmail={setUserEmail}
                  handleAuth={handleAuth}
                />
              }
            />
            <Route
              path="/sign-up"
              element={<Register handleRegister={handleRegister} />}
            />
          </Routes>
        </div>
      </div>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        buttonText="Да"
        onClose={closeAllPopups}
      ></PopupWithForm>
      <EditAvatarPopup
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <InfoTooltip
        InfoStatus={isInfoTooltipSuccess}
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
      />
    </UserContext.Provider>
  );
}

export default App;
