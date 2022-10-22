import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/header__logo.svg";

function Header({ userData, onClick }) {
  const { pathname } = useLocation();
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип сайта" />

      {pathname === "/sign-in" && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
      {pathname === "/sign-up" && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
      {pathname === "/" && (
        <div className="header__user-info">
          <p className="header__user-email">{userData.email}</p>
          <button onClick={onClick} className="header__link header__link_grey">
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}
export default Header;
