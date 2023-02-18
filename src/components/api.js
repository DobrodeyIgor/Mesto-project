import { request } from "./utils.js";

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wbf-cohort-5",
  headers: {
    authorization: "a42e03f3-9db9-4d21-a03c-ed0890bb2c58",
    "Content-Type": "application/json",
  },
};

export const getInitialCards = () => {
  return request(`${config.baseUrl}/cards`, { headers: config.headers }).then(
    (result) => result
  );
};

export const createNewCard = (body) => {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify(body),
  }).then((result) => result);
};

export const deleteCard = (cardId) => {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: "DELETE",
  });
};

export const likeCard = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "PUT",
  }).then((result) => result);
};

export const likeCardRemove = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "DELETE",
  }).then((result) => result);
};

export const getMe = () => {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((result) => result);
};

export const editMe = (body) => {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify(body),
  }).then((result) => result);
};

export const editAvatar = (body) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify(body),
  }).then((result) => result);
};
