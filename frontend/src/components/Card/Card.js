import { UserContext } from "../../contexts/CurrentUserContext";
import React from "react";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(UserContext);
  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <article className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleClick}
      />
      {isOwn && (
        <button className="element__trash-can" onClick={handleDeleteClick} />
      )}
      <div className="element__footer">
        <h2 className="element__place">{card.name}</h2>
        <div className="element__like-container">
          <button
            onClick={handleLikeClick}
            type="button"
            className={cardLikeButtonClassName}
            aria-label="нравится"
          ></button>
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}
