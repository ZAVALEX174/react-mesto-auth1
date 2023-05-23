import LogAndRegPopup from "./LogAndRegPopup";
import { useFormAndValidation } from "./useFormAndValidation";

function Login({ onLogin }) {
  const { formValues, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  function handleSubmit(e, setLoading) {
    e.preventDefault();
    onLogin(formValues, resetForm, setLoading);
  }

  return (
    <main className="main">
      <section className="authorization">
        <h2 className="authorization__title">Вход</h2>
        <LogAndRegPopup
          isValid={!isValid}
          name={"log-in"}
          onSubmit={handleSubmit}
          buttonText="Войти"
        >
          <fieldset className="authorization__inputs">
            <input
              id="name-emai"
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
      </section>
    </main>
  );
}

export default Login;
