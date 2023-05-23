import logo from "../images/logo.svg";
import { Route, Link, Routes, useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";

function Header({ email, signOut, openBurger }) {
  const [isActiveBurger, setIsActiveBurger] = useState(false);
  const navigate = useNavigate();

  function openBurger() {
    setIsActiveBurger(!isActiveBurger);
  }
  
  return (
    <header className={isActiveBurger ? "header header_type_active" : "header"}>
      <img src={logo} alt="Логотип сайта" className="logo" />
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link to={"/sign-in"} className="header__auth">
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link to={"/sign-up"} className="header__auth">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <>
              <div
                className={
                  isActiveBurger
                    ? "header__nav header__nav_active"
                    : "header__nav"
                }
              >
                <p className="header__email">{email}</p>
                <button onClick={signOut} className="header__logout">
                  Выйти
                </button>
              </div>
              <button
                className={
                  isActiveBurger
                    ? " header__burger_active header__burger"
                    : "header__burger"
                }
                onClick={openBurger}
              >
                <span className="header__burger-line"></span>
                <span className="header__burger-line"></span>
                <span className="header__burger-line"></span>
              </button>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
