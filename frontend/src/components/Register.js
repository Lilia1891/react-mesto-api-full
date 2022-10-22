import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ password, email, resetForm });
  };

  return (
    <div className="sign">
      <form
        className="popup__container popup__container_sign"
        onSubmit={handleSubmit}
      >
        <h1 className="popup__title popup__title_sign">Регистрация</h1>
        <input
          id="email"
          value={email}
          type="email"
          name="email"
          className="popup__input popup__input_sign"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          value={password}
          type="password"
          name="password"
          className="popup__input popup__input_sign"
          autoComplete="on"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="popup__submit-button popup__submit-button_sign"
        >
          Зарегистрироваться
        </button>
        <div className="register__signin">
          <Link to="/sign-in" className="register__signin">
            Уже зарегистрированы? Войти
          </Link>
        </div>
      </form>
    </div>
  );
};
export default withRouter(Register);
