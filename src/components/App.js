import React from "react";
import { apiCards } from "../utils/api";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import DeletedPopup from "./DeletedPopup";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import CurrentUserContext from "../contexts/currentUserContext";

function App() {
  //user
  const [currentUser, setCurentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deleteCard, setDeleteCard] = React.useState(null);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  React.useEffect(() => {
    apiCards
      .getUsers()
      .then(setCurentUser)
      .catch((arr) => alert(arr));
  }, []);

  React.useEffect(() => {
    apiCards
      .getCards()
      .then((result) => {
        setCards(result);
      })
      .catch((arr) => alert(arr));
  }, []);

  function handleUpdateUser(data) {
    apiCards
      .patchUsers(data)
      .then((result) => {
        setCurentUser(result);
        closeAllPopups();
      })
      .catch((arr) => alert(arr));
  }

  function handleUpdateAvatar(avatar) {
    apiCards
      .patchAvatar(avatar)
      .then((result) => {
        setCurentUser(result);
        closeAllPopups();
      })
      .catch((arr) => alert(arr));
  }

  function handleAddPlaceSubmit(card) {
    apiCards
      .postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((arr) => alert(arr));
  }

  function handleCardLike(card) {
    // проверяем, есть ли уже лайк
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    apiCards
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((arr) => alert(arr));
  }

  function handleCardDelete(card) {
    setDeleteCard(card);
  }

  function handleDeleteCard() {
    const cardId = deleteCard._id;
    apiCards
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((arr) => alert(arr));
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

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setDeleteCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddPlaceSubmit}
          />
          <DeletedPopup
            isOpen={deleteCard}
            onClose={closeAllPopups}
            onConfirm={handleDeleteCard}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
