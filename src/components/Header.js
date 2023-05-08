import logo from "../images/logo.svg";
import React from "react";
import { Link } from "react-router-dom";

function Header({title, route, email, onClick}) {
  return (
    <header className="header container">
      <img src={logo} alt="Логотип сайта" className="logo" />
      <div className="header__auth">
        <p className="header__email">e-mail@yandvbdfdfdvddfbdfex.ru</p>
        {/* <Link to={route} className="header__auth-out" onClick={onClick}>{title}</Link> */}
        <button className="header__out-link">Выйти</button>
      </div>
    </header>
  );
}

export default Header;
