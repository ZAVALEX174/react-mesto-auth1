import React from "react";
import { useEffect } from "react";
import reg_ok from "./../images/reg_ok.svg";
import reg_err from "./../images/reg_err.svg";

function InfoTooltip({ isOpen, onClose, message, onCloseOverlay }) {
  useEffect(() => {
    function handleEscClose(evt) {
      if (isOpen) {
        onClose(evt);
      }
    }
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen]);

  useEffect(() => {
    function handleOverlayClose(evt) {
      if (isOpen) {
        onCloseOverlay(evt);
      }
    }
    document.addEventListener("mousedown", handleOverlayClose);
    return () => {
      document.removeEventListener("mousedown", handleOverlayClose);
    };
  }, [isOpen]);

    return (
      <main className="main">
      <div className={ `popup popup__animation ${isOpen ? `popup_opened` : ""}` } >
        <div className="popup__container popup__container_infoTooltip">
          <img src={message.status ? reg_ok : reg_err} className="popup__response-image" alt="регистрация прошла успешно"></img>
          <h2 className="popup__title popup__title_type_infoTooltip">
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
      </main>
    );
  }


export default InfoTooltip;
