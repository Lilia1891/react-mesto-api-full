import React from "react";
import success from "../success.png";
import fail from "../fail.png";

function InfoTooltip({ onClose, isOpen, isRegistred }) {
  return (
    <div className={`popup popup_info ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_info">
        {isRegistred ? (
          <>
            <img className="popup__info-image" src={success} alt="success" />
            <p className="popup__info-title">
              Вы успешно зарегистрировались!
            </p>{" "}
          </>
        ) : (
          <>
            <img className="popup__info-image" src={fail} alt="fail" />
            <p className="popup__info-title">
              Что-то пошло не так! Попробуйте ещё раз.
            </p>
          </>
        )}
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
export default InfoTooltip;
