import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute.js";
import { useEffect, useState } from "react";
import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";
import Main from "../../components/Main.js";
import PopupWithForm from "../../components/PopupWithForm.js";
import ImagePopup from "../../components/ImagePopup.js";
import InfoTooltip from "../InfoTooltip.js";
import api from "../../utils/Api.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import EditProfilePopup from "../EditProfilePopup.js";
import EditAvatarPopup from "../EditAvatarPopup.js";
import AddPlacePopup from "../AddPlacePopup.js";
import Register from "../Register";
import Login from "../Login";
import * as mestoAuth from "../../mestoAuth";

function App() {
  const [isEditAvatarPopupOpen, handleEditAvatarClick] = useState(false);
  const [isEditProfilePopupOpen, handleEditProfileClick] = useState(false);
  const [isAddPlacePopupOpen, handleAddPlaceClick] = useState(false);
  const [selectedCard, handleCardClick] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isRegistred, setIsRegistred] = useState(false);
  const history = useHistory();

  const onLogin = ({ email, password, resetForm }) => {
    return mestoAuth
      .authorize(email, password)
      .then((data) => {
        if (data && data.token) {
          localStorage.setItem("jwt", data.token);
          auth(data.token);
          resetForm();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRegister = ({ email, password, resetForm }) => {
    return mestoAuth.register(email, password).then((res) => {
      if (!res || res.statusCode === 400) {
        setIsRegistred(false);
        setInfoTooltipOpen(true);
      } else {
        if (res) {
          setIsRegistred(true);
          setInfoTooltipOpen(true);
          history.push("/sign-in");
          resetForm();
        }
      }
    });
  };

  const auth = async (jwt) => {
    mestoAuth.getContent(jwt).then((res) => {
      if (res) {
        setLoggedIn(true);
        setUserData({
          email: res.data.email,
        });
      }
    });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth(jwt);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    } else {
      history.push("/sign-in");
    }
  }, [loggedIn]);

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  };

  const closeAllPopups = () => {
    handleEditAvatarClick(false);
    handleEditProfileClick(false);
    handleAddPlaceClick(false);
    handleCardClick({});
    setInfoTooltipOpen(false);
  };
  const onEditAvatar = () => {
    handleEditAvatarClick(true);
  };
  const onEditProfile = () => {
    handleEditProfileClick(true);
  };
  const onAddPlace = () => {
    handleAddPlaceClick(true);
  };
  const onCardClick = (data) => {
    handleCardClick(data);
  };
  const handleUpdateUser = (data) => {
    api
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (item) => {
    api
      .changeAvatar(item)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleAddPlaceSubmit = (item) => {
    api
      .addNewCard(item)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__container">
          <Header userData={userData} onClick={handleSignOut} />
          <Switch>
            <Route path="/sign-up">
              <Register onRegister={onRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={onLogin} />
            </Route>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              userData={userData}
              component={Main}
              onEditProfile={onEditProfile}
              onAddPlace={onAddPlace}
              onEditAvatar={onEditAvatar}
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            ></ProtectedRoute>
            <Route path="*">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Route
            render={({ location }) =>
              location.pathname !== "/sign-up" &&
              location.pathname !== "/sign-in" && <Footer />
            }
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            onClose={closeAllPopups}
          >
            {" "}
          </PopupWithForm>

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
            isRegistred={isRegistred}
          ></InfoTooltip>
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
