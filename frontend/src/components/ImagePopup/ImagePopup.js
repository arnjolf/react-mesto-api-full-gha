import React from "react";

export default function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_card-image ${card ? "popup_opened" : ""}`}
      id="card-image__popup"
      tabIndex="0"
    >
      <div className="popup__image-box">
        <button
          className="popup__close"
          type="button"
          aria-label="закрыть попап"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <h2 className="popup__place-name">{card ? card.name : ""}</h2>
      </div>
    </div>
  );
}
