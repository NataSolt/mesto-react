import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
//import Card from "./Card";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

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
  }

  return (
    <div className="page">
      <div className="container">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm
          name="popup-avatar"
          title="Обновить аватар"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__lable">
            <input
              id="input-src"
              type="url"
              name="avatar"
              className="popup-avatar__text popup-avatar__text_type_link popup-input"
              placeholder="Ссылка на изображение"
              required
            />
            <span className="popup__input-error input-src-error"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm
          name="popup-profile"
          title="Редактировать профиль"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__lable">
            <input
              type="text"
              className="popup-profile__text popup-profile__text_type_name popup-input"
              placeholder="пользователь"
              name="user"
              id="input-name"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="popup__input-error input-name-error"></span>
          </label>
          <label className="popup__lable">
            <input
              type="text"
              className="popup-profile__text popup-profile__text_type_job popup-input"
              id="input-job"
              placeholder="вид деятельности"
              name="about"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="popup__input-error input-job-error"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm
          name="popup-card"
          title="Новое место"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__lable">
            <input
              type="text"
              className="popup-card__text popup-card__text_type_title popup-input"
              id="input-place"
              placeholder="Название"
              name="place"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="input-place-error popup__input-error"></span>
          </label>
          <label className="popup__lable">
            <input
              type="url"
              className="popup-card__text popup-card__text_type_link popup-input"
              id="input-url"
              placeholder="Ссылка на картинку"
              name="link"
              required
            />
            <span className="popup__input-error input-url-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          name="popup-delete"
          title="Вы уверены?"
          buttonText="Да"
          isOpen={false}
          onClose={closeAllPopups}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      </div>
    </div>
  );
}

export default App;
