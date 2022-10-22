import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <>
      <div className="profile">
        <div className="profile__box">
          <img
            src={currentUser.avatar}
            alt="Аватар профиля"
            className="profile__avatar"
          />
          <button className="profile__avatar-change" onClick={onEditAvatar} />
          <div className="profile__info">
            <div className="profile__info-container">
              <h1 className="profile__info-name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__avatar-edit-button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__info-occupation">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__info-add-button"
          onClick={onAddPlace}
        />
      </div>
      <div className="gallery">
        <ul className="gallery__elements">
          {cards.map((item, id) => (
            <Card
              data={item}
              key={item._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
export default Main;
