// import { Link } from "react-router-dom";
// import LogAndRegPopup from "./LogAndRegPopup";

// import { useFormAndValidation } from "../../hooks/useFormAndValidation";

// function Register({ onRegister }) {
//   const { values, resetForm, handleChange, errors, isValid } =
//     useFormAndValidation();

//   function handleSubmit(e, setButtonLoading) {
//     e.preventDefault();
//     onRegister(values, resetForm, setButtonLoading);
//   }

//   return (
//     <main className="main">
//       <section className="authorization">
//         <h2 className="authorization__title">Регистрация</h2>
//         <LoginAndRegisterForm
//           isValid={!isValid}
//           name={"register"}
//           onSubmit={handleSubmit}
//           buttonText="Зарегистрироваться"
//         >
//           <fieldset className="authorization__inputs">
//             <input
//               id="name-email"
//               className={
//                 errors.emailUser
//                   ? "authorization__item authorization__item_type_error"
//                   : "authorization__item"
//               }
//               type="email"
//               name="emailUser"
//               required
//               minLength="2"
//               maxLength="40"
//               placeholder="Email"
//               value={values.emailUser || ""}
//               onChange={handleChange}
//               autoComplete="new-email"
//             />
//             <span
//               id="name-email-error"
//               className="authorization__text-error"
//             >
//               {errors.emailUser}
//             </span>
//             <input
//               id="name-password"
//               className={
//                 errors.password
//                   ? "authorization__item authorization__item_type_error"
//                   : "authorization__item"
//               }
//               type="password"
//               name="password"
//               required
//               minLength="2"
//               maxLength="200"
//               placeholder="Пароль"
//               value={values.password || ""}
//               onChange={handleChange}
//               autoComplete="new-password"
//             />
//             <span
//               id="name-password-error"
//               className="authorization__text-error"
//             >
//               {errors.password}
//             </span>
//           </fieldset>
//         </LoginAndRegisterForm>
//         <Link to="/sign-in" className="authorization__link">
//           Уже зарегистрированы? Войти
//         </Link>
//       </section>
//     </main>
//   );
// }

// export default Register;

//============================================================================================================================
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useFormAndValidation } from "./useFormAndValidation";
// import LogAndRegPopup from "./LogAndRegPopup";

// function Register({ onRegister }) {
//   const { values, resetForm, handleChange, errors, isValid } =
//     useFormAndValidation({
//       email: "",
//       password: "",
//     });

//   function handleSubmit(e, setLoading) {
//     e.preventDefault();
//     onRegister(values, resetForm, setLoading);
//   }

//   return (
//     <main className="main">
//       <section className="authorization">
//         <h2 className="authorization__title">Регистрация</h2>
//         <LogAndRegPopup
//           isValid={!isValid}
//           name={"log-in"}
//           onSubmit={handleSubmit}
//           buttonText="Войти"
//         >
//           <fieldset className="authorization__inputs">
//             <input
//               id="name-email"
//               className={
//                 errors.emailUser
//                   ? "authorization__item authorization__item_tupe_error"
//                   : "authorization__item"
//               }
//               type="email"
//               name="emailUser"
//               required
//               minLength="2"
//               maxLength="40"
//               placeholder="Email"
//               value={values.emailUser || ""}
//               onChange={handleChange}
//               autoComplete="new-email"
//             />
//             <span
//               id="name-email-error"
//               className="authorization__text-error"
//             >
//               {errors.emailUser}
//             </span>
//             <input
//               id="name-password"
//               className={
//                 errors.password
//                   ? "authorization__item authorization__item_tupe_error"
//                   : "authorization__item"
//               }
//               type="password"
//               name="password"
//               required
//               minLength="2"
//               maxLength="200"
//               placeholder="Пароль"
//               value={values.password || ""}
//               onChange={handleChange}
//               autoComplete="new-password"
//             />
//             <span
//               id="name-password-error"
//               className="authorization__text-error"
//             >
//               {errors.password}
//             </span>
//           </fieldset>
//         </LogAndRegPopup>

//         <Link to="/sign-in" className="authorization__link">
//           Уже зарегистрированы? Войти
//         </Link>
//       </section>
//     </main>
//   );
// }

// export default Register;
//=============================

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "./../utils/auth";
import LogAndRegPopup from "./LogAndRegPopup";

function Register() {
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (formValue.password !== formValue.confirmPassword) {
    //   setErrorMessage("Passwords should be equal");
    //   return;
    // }

    const { password, email } = formValue;

    auth
      .register(password, email)
      .then(() => {
        navigate("/sign-in");
      })
      .catch((err) => setErrorMessage(err));
  };

  return (
    <main className="main">
      <section className="authorization">
        <h2 className="authorization__title">Регистрация</h2>
        <LogAndRegPopup
          // isValid={!isValid}
          name={"log-in"}
          onSubmit={handleSubmit}
          buttonText="Войти"
        >
          <fieldset className="authorization__inputs">
            <input
              id="name-email"
              className={
                formValue.email
                  ? "authorization__item authorization__item_type_error"
                  : "authorization__item"
              }
              type="email"
              name="email"
              required
              minLength="2"
              maxLength="40"
              placeholder="Email"
              value={formValue.email || ""}
              onChange={handleChange}
              autoComplete="new-email"
            />
            <span id="name-email-error" className="authorization__text-error">
              {errorMessage}
            </span>
            <input
              id="name-password"
              className={
                formValue.password
                  ? "authorization__item authorization__item_type_error"
                  : "authorization__item"
              }
              type="password"
              name="password"
              required
              minLength="2"
              maxLength="200"
              placeholder="Пароль"
              value={formValue.password || ""}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <span
              id="name-password-error"
              className="authorization__text-error"
            >
              {errorMessage}
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
