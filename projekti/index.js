import './style.css';
import { fetchData } from './fetch.js';

// haetaan nappi josta lähetetään formi ja luodaan käyttäjä
const createUser = document.querySelector('.createuser');

createUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Nyt luodaan käyttäjä');

  const url = 'https://trdns.northeurope.cloudapp.azure.com/api/users';

  // # Create user
  // POST http://127.0.0.1:3000/api/users
  // content-type: application/json

  const form = document.querySelector('.create_user_form');

  // Validointi, jos päällä niin tutkitaan onko kentät kunnossa

  // Check if the form is valid
  if (!form.checkValidity()) {
    // If the form is not valid, show the validation messages
    form.reportValidity();
    return; // Exit function if form is not valid
  }

  console.log('Tiedot valideja, jatketaan');

  const username = form.querySelector('input[name=username]').value;

  const data = {
    username: username,
    password: form.querySelector('input[name=password]').value,
    email: form.querySelector('input[name=email]').value,
  };

  const options = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };


  // fetchataan tiedot
  try {
    const responseData = await fetchData(url, options);
    console.log(responseData);
  } catch (error) {
    console.error(error);
  }
});

// haetaan nappi josta haetaan formi ja logataan sisään
// tästä saadaan TOKEN
const loginUser = document.querySelector('.loginuser');

loginUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Nyt logataan sisään');

  const url = 'https://trdns.northeurope.cloudapp.azure.com/api/auth/login';

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
      alert('login in now!')
      window.location.href = 'home.html';
    };

    logResponse('loginResponse', `localStorage set with token value: ${data.token}`);
  });
});

// Haetaan nappi josta testataan TOKENIN käyttöä, /auth/me
const meRequest = document.querySelector('#meRequest');
meRequest.addEventListener('click', async () => {
  console.log('Testataan TOKENIA ja haetaan käyttäjän tiedot');

  const url = 'https://trdns.northeurope.cloudapp.azure.com/api/auth/me';
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



// Apufunktio, kirjoittaa halutin koodiblokin sisään halutun tekstin
function logResponse(codeblock, text) {
  document.getElementById(codeblock).innerText = text;
}

