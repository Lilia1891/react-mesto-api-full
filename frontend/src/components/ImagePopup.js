import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_view-image popup_dark ${card.link &&
        "popup_opened"}`}
    >
      <figure className="popup__figure">
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__image-title"></figcaption>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </figure>
    </div>
  );
}
export default ImagePopup;
