import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        name="avatar"
        id="avatar"
        placeholder="Ссылка на картинку"
        className="popup__input"
        required
      />
      <span className="popup__input-error popup__input-error_avatar"></span>
    </PopupWithForm>
  );
}
