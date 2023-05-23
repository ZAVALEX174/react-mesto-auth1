import React, { useState } from "react";

function LogAndRegPopup({ name, isValid, children, onSubmit, buttonText }) {
  const [isLoading, setLoading] = useState(false);

  function handlerOnSubmit(e) {
    onSubmit(e, setLoading);
    setLoading(true);
  }

  return (
    <form
      className="authorization__form"
      name={name}
      noValidate
      onSubmit={handlerOnSubmit}
    >
      {children}
      {isLoading ? (
        <div className="loading-btn loading-btn__theme_dark">
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
