// const BASE_URL = "https://auth.nomoreparties.co";

// const checkResponse = (res) => {
//   return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
// };

// export const register = (password, email) => {
//   return fetch(`${BASE_URL}/signup`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ password, email }),
//   }).then((res) =>
//     res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
//   );
// };

// export const authorize = (identifier, password) => {
//   return fetch(`${BASE_URL}/signin`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ identifier, password }),
//   }).then((res) =>
//     res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
//   );
// };

// export const getContent = (token) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => data);
// };
//===============================
// const BASE_URL = "https://auth.nomoreparties.co";

// function checkResponse(res) {
//   if (res.ok) {
//     return res.json();
//   } else {
//     Promise.reject(`Ошибка: ${res.status}/${res.status}`);
//   }
// }

// export function register(email, password) {
//   return fetch(`${BASE_URL}/signup`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   }).then((res) => checkResponse(res));
// }

// export function authorize(email, password) {
//   return fetch(`${BASE_URL}/signin`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   })
//     .then((res) => checkResponse(res))
//     .then((data) => {
//       if (data.token) {
//         const token = data.token;
//         localStorage.setItem("jwt", token);

//         return token;
//       }
//     });
// }

// export function getContent(token) {
//   return fetch(`${BASE_URL}/users/me`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((res) => checkResponse(res))
//     .then((data) => data);
// }

export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  );
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
