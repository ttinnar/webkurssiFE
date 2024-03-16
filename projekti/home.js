import './style.css';
import { fetchData } from './fetch.js';


let myToken = localStorage.getItem('token');

const btEntries = document.querySelector('.get_entry');
btEntries.addEventListener('click', async () => {
  console.log('Hienosti klikkasit');
  
  // GET http://localhost:3000/api/entries/:id
  const url = 'http://localhost:3000/api/entries/1'

  fetchData(url).then((data) => {
    // käsitellään fetchillä tullut JSON
    console.log(data);
  });
});

const btUsers = document.querySelector('.get_users');
btUsers.addEventListener('click', getUsers);

async function getUsers() {
  const url = 'http://localhost:3000/api/users'
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer: ' + myToken,
    },
  };
  fetchData(url, options).then((data) => {
    // käsitellään fetchillä tullut JSON
    console.log(data);
    createTable(data);
  });
};

async function createTable(data) {
  const url = 'http://127.0.0.1:3000/api/users';

  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer: ' + myToken,
    },
  };
  fetchData(url, options).then((data) => {
    console.log(data);
  });

  // table creation
  const tbody = document.querySelector('.tbody');
  tbody.innerHTML = '';

  data.forEach(element => {
    console.log(element.username);

      // Create table row element
      let tr = document.createElement('tr');

      // td1 Username
      let td1 = document.createElement('td');
      td1.innerText = element.username;

      // td2
      let td2 = document.createElement('td');
      td2.innerText = element.user_level;

      // td3
      let td3 = document.createElement('td');
      let button1 = document.createElement('button');
      button1.className = 'check';
      button1.setAttribute('data-id', element.user_id);
      button1.innerText = 'Info';
      td3.appendChild(button1);
      
      button1.addEventListener('click', getUser);

      // td4
      let td4 = document.createElement('td');
      let button2 = document.createElement('button');
      button2.className = 'del';
      button2.setAttribute('data-id', element.user_id);
      button2.innerText = 'Delete';
      td4.appendChild(button2);

      button2.addEventListener('click', delUser);

      // td5
      let td5 = document.createElement('td');
      td5.innerText = element.user_id;

      // Append table data elements to the table row element
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);

      // Append the table row element to the table (assuming you have a table with the id 'myTable')
      tbody.appendChild(tr);
  })
};

function getUser() {
  console.log('hienosti osaat nappii painaa')
};

async function delUser(evt) {
  console.log('why are u trying to delete me :(')
  console.log(evt)

  const idDel = evt.target.attributes['data-id'].value;
  console.log(idDel)

  const url = 'http://127.0.0.1:3000/api/users/' + idDel;
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer: ' + myToken,
    },
  };
  fetchData(url, options).then((data) => {
    console.log(data);
  });

};

async function showUser() {
  const url = 'http://127.0.0.1:3000/api/auth/me';

  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer: ' + myToken,
    },
  };
  fetchData(url, options).then((data) => {
    console.log(data);
    document.getElementById('name').innerHTML = data.user.username
  });
};

showUser();

// 1. testataan ensin YKSI endpoint joka ei vaadi tokenia
// 2. uudelleen strukturoidaan koodi jotta se on modulaarisempi

// tämä toimi ennen autentikaatiota, nyt tarvitsee tokenin, siistitään pian!
// sivuille on nyt myös lisätty navigaatio html sivuun, sekä siihen sopiva CSS koodi, hae siis uusi HTML ja UUSI CSS ennen kun aloitat

async function getAllUsers() {
  console.log('toimii!');

  try {
    const response = await fetch('http://127.0.0.1:3000/api/users');
    console.log(response);
    const data = await response.json();
    console.log(data);

    data.forEach((element) => {
      console.log(element.username);
    });

    // tänne tiedot
    const tbody = document.querySelector('.tbody');
    tbody.innerHTML = '';

    data.forEach((element) => {
      console.log(element.username);

      // Create table row element
      var tr = document.createElement('tr');

      // td1 Username
      var td1 = document.createElement('td');
      td1.innerText = element.username;

      // td2
      var td2 = document.createElement('td');
      td2.innerText = element.user_level;

      // td3
      var td3 = document.createElement('td');
      var button1 = document.createElement('button');
      button1.className = 'check';
      button1.setAttribute('data-id', '1');
      button1.innerText = 'Info';
      td3.appendChild(button1);

      // td4
      var td4 = document.createElement('td');
      var button2 = document.createElement('button');
      button2.className = 'del';
      button2.setAttribute('data-id', '1');
      button2.innerText = 'Delete';
      td4.appendChild(button2);

      // td5
      var td5 = document.createElement('td');
      td5.innerText = element.user_id;

      // Append table data elements to the table row element
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);

      // Append the table row element to the table (assuming you have a table with the id 'myTable')
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.log(error);
  }
}


// log out 
const logout = document.querySelector('.activelogout');

logout.addEventListener('click', function(evt) {
  evt.preventDefault();
  window.location.href = 'index.html';
});
