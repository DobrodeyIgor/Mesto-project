const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

export { request };
