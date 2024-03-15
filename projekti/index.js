import './style.css';
import { fetchData } from './fetch.js';

// haetaan nappi josta lähetetään formi ja luodaan käyttäjä
const createUser = document.querySelector('.createuser');

createUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Nyt luodaan käyttäjä');

  const url = 'http://127.0.0.1:3000/api/users';

  const form = document.querySelector('.create_user_form');
  const username = form.querySelector('input[name=username]').value;

  const data = {
    username: username,
    password: form.querySelector('input[name=password]').value,
    email: form.querySelector('input[name=email]').value,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  };

  fetchData(url, options).then((data) => {
    console.log(data);
  });
});

// haetaan nappi josta haetaan formi ja logataan sisään
// tästä saadaan TOKEN
const loginUser = document.querySelector('.loginuser');

loginUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Nyt logataan sisään');

  const url = 'http://127.0.0.1:3000/api/auth/login';

  // haetaan formi ja sen tiedot
  const form = document.querySelector('.login_form');
  const username = form.querySelector('input[name=username]').value;
  const password = form.querySelector('input[name=password]').value;

  // isoi kovii juttui mitä tarvitaan
  const data = {
    username: username,
    password: password,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  };

  fetchData(url, options).then((data) => {
    console.log(data);
    console.log(data.token);
    localStorage.setItem('token', data.token);

    if (data.token == undefined) {
      alert('Käyttäjänimi tai salasana väärin')
    } else {
      // alert('Hienosti kirjauduit sisään good job!')
      window.location.href = 'index.html';
    };

    logResponse('loginResponse', `localStorage set with token value: ${data.token}`);
  });
});

// Haetaan nappi josta testataan TOKENIN käyttöä, /auth/me
const meRequest = document.querySelector('#meRequest');
meRequest.addEventListener('click', async () => {
  console.log('Testataan TOKENIA ja haetaan käyttäjän tiedot');

  const url = 'http://127.0.0.1:3000/api/auth/me';
  const myToken = localStorage.getItem('token');
  console.log(myToken)

  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer: ' + myToken,
    },
  };

  console.log(options)
  fetchData(url, options).then((data) => {
    console.log(data);
  });

});

// Haetaan nappi josta tyhjennetään localStorage
const clear = document.querySelector('#clearButton');
clear.addEventListener('click', clearLocalStorage);

// Apufunktio, kirjoittaa halutin koodiblokin sisään halutun tekstin
function logResponse(codeblock, text) {
  document.getElementById(codeblock).innerText = text;
}

// Apufunktio, Tyhjennä local storage
function clearLocalStorage() {
  localStorage.removeItem('token');
  logResponse('clearResponse', 'localStorage cleared!');
}

