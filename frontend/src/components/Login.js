import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onLogin({ email, password, resetForm });
  };

  return (
    <div className="sign" onSubmit={handleSubmit}>
      <form className="popup__container popup__container_sign">
        <h1 className="popup__title popup__title_sign">Вход</h1>
        <input
          id="email"
          value={email}
          type="email"
          className="popup__input popup__input_sign"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          value={password}
          type="password"
          className="popup__input popup__input_sign"
          autoComplete="on"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="popup__submit-button popup__submit-button_sign"
        >
          Войти
        </button>
      </form>
    </div>
  );
};
export default withRouter(Login);
