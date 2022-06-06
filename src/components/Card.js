import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card)
  }

  return (
    <article className="card">
      <img
        alt={props.card.name}
        onClick={handleClick}
        src={props.card.link}
        className="card__image"
      />
      <div className="card__group">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__container-likes">
          <button
            className="card__like"
            aria-label="нравится"
            type="button"
          ></button>
          <span className="card__count-like">{props.card.likes.length}</span>
        </div>
      </div>
      <button
        type="button"
        aria-label="корзина"
        className="card__trash"
      ></button>
    </article>
  );
}

export default Card;
