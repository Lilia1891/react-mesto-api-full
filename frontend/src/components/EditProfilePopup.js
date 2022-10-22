import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [values, setValues] = useState({});
  const onChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };
  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    setValues(currentUser);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        value={values.name || ""}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        onChange={onChange}
      />
      <span className="popup__input-error popup__input-error_name"></span>
      <input
        className="popup__input popup__input_type_job"
        type="text"
        name="about"
        value={values.about || ""}
        placeholder="Вид деятельности"
        minLength="2"
        maxLength="200"
        required
        onChange={onChange}
      />
      <span className="popup__input-error popup__input-error_about"></span>
    </PopupWithForm>
  );
}
