import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ data, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = data.owner._id === currentUser._id;
  const cardDeleteButtonClassName = ` gallery__element-delete ${
    isOwn ? "gallery__element-delete_displayed" : "gallery__element-delete"
  }`;

  const isLiked = data.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `gallery__element-like ${
    isLiked ? "gallery__element-like_active" : "gallery__element-like"
  }`;

  function handleClick() {
    onCardClick(data);
  }
  function handleLikeClick() {
    onCardLike(data);
  }
  function handleDeleteClick() {
    onCardDelete(data);
  }
  return (
    <li className="gallery__element">
      <img
        src={data.link}
        className="gallery__element-image"
        alt={data.name}
        onClick={handleClick}
      />
      <div className="gallery__element-description">
        <h2 className="gallery__element-title">{data.name}</h2>
        <div className="gallery__element-like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <div className="gallery__element-like-counter">
            {data.likes.length}
          </div>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}
export default Card;
