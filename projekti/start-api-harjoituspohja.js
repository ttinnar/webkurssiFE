import './style.css';
import { fetchData } from './fetch.js';

let myToken = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', function() {
  const btEntry = document.querySelector('.get_entry');
  const resultBody = document.querySelector('.result-body');

  btEntry.addEventListener('click', async () => {
    console.log('Klikki toimii');
    const url = '/api/entries/1';

    fetchData(url).then((data) => {
      // käsitellään fetchData funktiosta tullut JSON
      console.log(data);

      // Clear existing table rows
      resultBody.innerHTML = '';

      // Check if data is an object before displaying
      if (typeof data === 'object') {
        // Create table rows dynamically
        Object.entries(data).forEach(([key, value]) => {
          const row = document.createElement('tr');
          const keyCell = document.createElement('td');
          const valueCell = document.createElement('td');

          // Set content for each cell
          keyCell.textContent = key;
          valueCell.textContent = value;

          // Append cells to the row
          row.appendChild(keyCell);
          row.appendChild(valueCell);

          // Append the row to the table body
          resultBody.appendChild(row);
        });
      } else {
        console.error('Data is not an object:', data);
      }
    });
  });
  // # Get entries by id
  // # GET http://localhost:3000/api/entries/:id
});

const btUsers = document.querySelector('.get_users');
btUsers.addEventListener('click', getUsers);

async function getUsers() {
  const url = '/api/users'
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


// TOINEN TAPA USERS-TAULUKKOON
async function createTable(data) {
  const url = '/api/users';

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
      button1.setAttribute('data-id', '1');
      button1.innerText = 'Info';
      td3.appendChild(button1);

      button1.addEventListener('click', getUser);

      // td4
      let td4 = document.createElement('td');
      let button2 = document.createElement('button');
      button2.className = 'del';
      button2.setAttribute('data-id', '1');
      button2.innerText = 'Delete';
      td4.appendChild(button2);

      button2.addEventListener('click', deleteUser);

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
  console.log('INFO PÅ DÄREN');
};

function deleteUser(evt) {
  console.log('DELETE NY:/');

  const url = '/api/users/';
  let token = localStorage.getItem('token');
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer:' + token,
    },
  };

  const answer = confirm('ootko varma et haluut poistaa?');
  if (answer) {
    fetchData(url, options).then((data) => {
      console.log(data);
      getUsers();
    });
  }
};
  
async function showUserName() {
  console.log('Hei tääl ollaa ny pitäs hakea käyttäjänimi');
  
  let name = localStorage.getItem('name');
  
  console.log('nimesi on: ', name);
  document.getElementById('name').innerHTML = name;
}

showUserName();


async function getAllUsers() {
  console.log('toimii!');

  try {
    const response = await fetch('https://trdns.northeurope.cloudapp.azure.com/api/users');
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

