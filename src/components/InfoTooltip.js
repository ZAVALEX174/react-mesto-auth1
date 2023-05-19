import React from "react";
import { useEffect } from "react";
import ok from "./../images/ok.svg";
import out from "./../images/out.svg";

function InfoTooltip({ isOpen, onClose, message }) {
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen]);

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      onClose();
    }
  }

  function closePopupWithClickOnOwerlay(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      onClose();
    }
    if (evt.target.classList.contains("popup__close")) {
      onClose();
    }

    return (
      <div
        className={`popup ${isOpen ? "popup_opened" : ""}`}
        onCloseOverlay={closePopupWithClickOnOwerlay}
      >
        <div className="popup__container popup__infoTooltip">
          <img
            src={message.status ? ok : out}
            className="popup__response-image"
            alt="регистрация прошла успешно"
          ></img>
          <h2 className="popup-title popup-title_type_infoTooltip">
            {message.text}
          </h2>
          <button
            className="popup__close"
            aria-label="закрыть"
            type="button"
            onClick={onClose}
          />
        </div>
      </div>
    );
  }
}

export default InfoTooltip;
