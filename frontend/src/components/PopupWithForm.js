import React from "react";

function PopupWithForm({ title, name, children, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <h3 className="popup__title">{title}</h3>
        <form
          name={name}
          action="#"
          className="popup__form"
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button type="submit" className="popup__submit-button">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
