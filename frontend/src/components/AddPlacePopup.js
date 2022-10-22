import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [values, setValues] = useState({});
  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.place,
      link: values.link,
    });
  }

  useEffect(() => {
    setValues({});
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_place"
        type="text"
        placeholder="Название"
        name="place"
        id="input-place"
        minLength="2"
        maxLength="30"
        required
        value={values.place || ""}
        onChange={handleChange}
      />
      <span className="popup__input-error popup__input-error_place"></span>

      <input
        className="popup__input popup__input_type_link"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        id="input-link"
        required
        value={values.link || ""}
        onChange={handleChange}
      />
      <span className="popup__input-error popup__input-error_link"></span>
    </PopupWithForm>
  );
}
