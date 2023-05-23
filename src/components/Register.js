import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogAndRegPopup from "./LogAndRegPopup";
import { useFormAndValidation } from "./useFormAndValidation";

function Register({onRegister}) { 

  const {formValues, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  function handleSubmit(e, setLoading) {
    e.preventDefault();
    onRegister(formValues, resetForm, setLoading)
  }

  return (
    <main className="main">
      <section className="authorization">
        <h2 className="authorization__title">Регистрация</h2>
        <LogAndRegPopup
           isValid={!isValid}
          name={"register"}
          onSubmit={handleSubmit}
          buttonText="Зарегистрироваться"
        >
          <fieldset className="authorization__inputs">
            <input
              id="name-email"
              className={
                errors.email
                  ? "authorization__item authorization__item_type_error"
                  : "authorization__item"
              }
              type="email"
              name="email"
              required
              minLength="2"
              maxLength="40"
              placeholder="Email"
              value={formValues.email || ""}
              onChange={handleChange}
              autoComplete="new-email"
            />
            <span id="name-email-error" className="authorization__text-error">
              {errors.email}
            </span>
            <input
              id="name-password"
              className={
                errors.password
                  ? "authorization__item authorization__item_type_error"
                  : "authorization__item"
              }
              type="password"
              name="password"
              required
              minLength="2"
              maxLength="200"
              placeholder="Пароль"
              value={formValues.password || ""}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <span
              id="name-password-error"
              className="authorization__text-error"
            >
              {errors.password}
            </span>
          </fieldset>
        </LogAndRegPopup>
        <Link to="/sign-in" className="authorization__link">
          Уже зарегистрированы? Войти
        </Link>
      </section>
    </main>
  );
}

export default Register;
