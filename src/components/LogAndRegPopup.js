import React, { useState } from "react";
// import imgLoading from "../images/0006.gif";

function LogAndRegPopup({ name, isValid, children, onSubmit, buttonText }) {
  const [isLoading, setLoading] = useState(false);

  function handlerOnSubmit(e) {
    onSubmit(e, setLoading);
    setLoading(true);
  }

  return (
    <form
      className="authorization__form-admin"
      name={name}
      noValidate
      onSubmit={handlerOnSubmit}
    >
      {children}
      {isLoading ? (
        <div className="loading-btn loading-btn_theme_black">
          {/* <img
            className="loading-btn__img"
            src={imgLoading}
            alt="анимация загрузки"
          /> */}
        </div>
      ) : (
        <input
          disabled={isValid}
          className={
            isValid
              ? "authorization__button authorization__button_disabled"
              : "authorization__button"
          }
          type="submit"
          value={buttonText}
        />
      )}
    </form>
  );
}

export default LogAndRegPopup;
