import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({ onClose, isOpen, onAddPlace }) {
  const nameRef = React.useRef();
  const srcRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      "place-name": nameRef.current.value,
      "place-src": srcRef.current.value,
    });
  }

  React.useEffect(() => {
    nameRef.current.value = "";
    srcRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input"
        id="place-name"
        name="place-name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        ref={nameRef}
      />
      <span className="place-name-error popup__error"></span>
      <input
        type="url"
        className="popup__input"
        id="card-image"
        name="place-src"
        placeholder="Ссылка на картинку"
        required
        ref={srcRef}
      />
      <span className="card-image-error popup__error"></span>
    </PopupWithForm>
  );
}
