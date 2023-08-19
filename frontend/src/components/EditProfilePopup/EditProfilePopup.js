import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { UserContext } from "../../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(UserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      "profile-name": name,
      "profile-job": description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        type="text"
        className="popup__input"
        id="popup__name"
        name="profile-name"
        minLength="2"
        maxLength="40"
        onChange={handleNameChange}
        required
      />
      <span className="popup__name-error popup__error"></span>
      <input
        value={description}
        type="text"
        className="popup__input"
        id="popup__job"
        name="profile-job"
        minLength="2"
        maxLength="200"
        onChange={handleDescriptionChange}
        required
      />
      <span className="popup__job-error popup__error"></span>
    </PopupWithForm>
  );
}
