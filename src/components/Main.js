import React from "react";
//import Api from "../utils/api";
import { apiCards } from "../utils/api";
import { useState } from "react";
import Card from "./Card";

function Main(props) {
  const [cards, setCards] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  React.useEffect(() => {
    Promise.all([apiCards.getUsers(), apiCards.getCards()])

      .then(([profile, cards]) => {
        setUserName(profile.name);
        setUserDescription(profile.about);
        setUserAvatar(profile.avatar);
        setCards(cards);
        setUserId(profile._id);
      })

      .catch((arr) => alert(arr));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <img
            src={userAvatar}
            alt="портрет пользователя"
            className="profile__avatar"
          />
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{userName}</h1>
            <button
              type="button"
              className="profile__add-button"
              aria-label="открытие формы редактирования имя и работы"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button
          type="button"
          className="profile__button-card"
          aria-label="открытие формы добавления карточек"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="cards" aria-label="карточки">
        {cards.map((card) => (
          <Card
            card={card}
            currentUser={userId}
            key={card._id}
            onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
