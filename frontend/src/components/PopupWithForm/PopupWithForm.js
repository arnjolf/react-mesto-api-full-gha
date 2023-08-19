import React, { useState } from "react";

export default function PopupWithForm({
  name,
  title,
  isOpen,
  children,
  buttonText,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className={`popup popup_${name} ${isOpen ? `popup_opened` : ""}`}
      id={`${name}__popup`}
      tabIndex="0"
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="закрыть попап"
          onClick={onClose}
        ></button>
        <h2 className={`popup__text popup__text_${name}`}>{title}</h2>
        <form
          className="popup__form"
          name="profile-edit-form"
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            type="submit"
            className="popup__save-button"
            id="card__save-button"
          >
            {buttonText || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}
