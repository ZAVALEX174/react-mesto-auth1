const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

const BASE_URL = "https://auth.nomoreparties.co";

//функция register - принимает почту и пароль,
//отправляет запрос регистрации на /signup
const register = (email, password) => {
  const requestUrl = BASE_URL + "/signup";
  return fetch(requestUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

// функция login - принимает почту и пароль,
//отправляет запрос авторизации на /signin .
//В ответ сервер вернет jwt, который нужно сохранить в localStorage
const login = (email, password) => {
  const requestUrl = BASE_URL + "/signin";
  return fetch(requestUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

// функция checkToken - принимает jwt,
// отправляет запрос на /users/me и возвращает данные пользователя
const checkToken = (token) => {
  const requestUrl = BASE_URL + "/users/me";
  return fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export { register, login, checkToken };
