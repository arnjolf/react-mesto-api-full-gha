import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar }) {
  const inputRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }
  React.useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);
  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        type="url"
        className="popup__input"
        id="avatar-src"
        name="avatar-src"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="avatar-src-error popup__error"></span>
    </PopupWithForm>
  );
}
