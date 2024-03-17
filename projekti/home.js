import './style.css';
import { fetchData } from './fetch.js';
import { convertDate, formatDate, getCurrentDate} from "./date-functions.js"
import { showSnackbar } from "./snackbar.js";

const bt1 = document.querySelector('.get_entry');
const tbody = document.querySelector('.result-body'); // Etsi taulukon tbody-elementti

bt1.addEventListener('click', async () => {
  console.log('Klikki toimii');
  const url = 'http://localhost:3000/api/entries';

  const token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token, // Poistettu ylimääräinen kaksoispiste
    },
  };

  try {
    const data = await fetchData(url, options);
    console.log(data);
    renderData(data); // Kutsutaan renderData-funktiota datan näyttämiseksi HTML-sivulla
  } catch (error) {
    console.error(error);
  }
});

function renderData(data) {
  // Tyhjennetään taulukon tbody-elementti
  tbody.innerHTML = '';

  // Käydään läpi data ja lisätään jokainen tietue taulukkoon
  data.forEach(entry => {
    // Luodaan uusi tr-elementti
    const tr = document.createElement('tr');

    // Lisätään jokainen tieto uusiin td-elementteihin
    for (const key in entry) {
      if (Object.hasOwnProperty.call(entry, key)) {
        const td = document.createElement('td');
        td.textContent = entry[key];
        tr.appendChild(td);
      }
    }

    // Lisätään tr-elementti tbody-elementtiin
    tbody.appendChild(tr);
  });
}



const url = 'http://localhost:3000/api/entries';

// Get and listen for 'Create a diary entry' -form submit
const entryForm = document.querySelector("#entry_form");
entryForm.addEventListener("submit", (event) => {
  // Get the workout color from form
  const workout = document.getElementById("workout").value;
  event.preventDefault();
  //input validation
  if (!entryForm.checkValidity()){
    // Input didnt pass validation
    entryForm.reportValidity()
    return;
  // Check if user has changed input in dropdown menu from the placeholder
  } else if (workout === 'placeholder') {
    showSnackbar('Crimson', 'Please select a color to represent your mood')
    return;
  } else {
    // Form passed all validation continue to send request
    gatherNewEntryData();
  }
});

// Function to gather data from the form
async function gatherNewEntryData() {
  // Get form values
  const workout = document.getElementById("workout").value;
  const duration = document.getElementById("duration").value;
  const intensity = document.getElementById("intensity").value;
  const notes = document.getElementById("notes").value;
  
  // Get token from localStorage
  const token = localStorage.getItem('token');
  if (!token) {
    console.error("Token not found in local storage");
    return;
  }

  // Form request body
  const entryFormData = {
    workout: workout,
    duration: duration,
    intensity: intensity,
    notes: notes,
    entry_date: getCurrentDate(),
  };

  // Define POST request options
  const options = {
    method: 'POST', // Method is POST
    headers: {
      'Content-Type': 'application/json', // Send data in JSON format
      'Authorization': 'Bearer ' + token, // Include authorization token
    },
    body: JSON.stringify(entryFormData) // Convert data to JSON format and send it
  };
  
  // Send POST request
  postNewEntry(options);
}

// Function to send POST request
async function postNewEntry(options) {
  // Define POST request and send it
  postData('http://localhost:3000/api/entries', options) 
    .then(data => {
      console.log('Response:', data); // Print response to console
      showSnackbar("darkgreen", "New entry added!"); // Show success message
    })
    .catch(error => {
      console.error('Error:', error); // Print error to console
      showSnackbar("crimson", "New entry couldn't be added!"); // Show error message
    });
}

// Function to send POST request using fetch
async function postData(url, options = {}) {
  // Define request settings
  const response = await fetch(url, options);
  
  // Return response in JSON format
  return response.json();
}



// async function postNewEntry(entry) {
//   // Define POST request and send it
//   const data = await postRequest('http://localhost:3000/api/entries', entry) 
//   if (!data.error) {
//     console.log(data);
//     showSnackbar("darkgreen", "New entry added!");
//   } else {
//     showSnackbar("crimson", "New entry couldn't be added!");
//   }
// }
  
// async function doSomething() {
//   const data = await postRequest(url, postBody)
//   // Define request
//   let token = localStorage.getItem("token");
//   const options = {
//     method: "POST",
//     headers: {
//       Authorization: "Bearer: " + token,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(postBody),
//   };
//   return fetchData(url, options)
// }



const allButton = document.querySelector('.get_users');
allButton.addEventListener('click', getUsers);

async function getUsers() {
  console.log('Haetaa kaikki käyttäjät');
  const url = 'http://127.0.0.1:3000/api/users';
  let token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer: ' + token,
    },
  };

  fetchData(url, options).then((data) => {
    createTable(data);
  });

}

function createTable(data) {
  console.log(data);

  // etitään tbody elementti
  const tbody = document.querySelector('.tbody');
  tbody.innerHTML = '';

  // loopissa luodaan jokaiselle tietoriville oikeat elementit
  // elementtien sisään pistetään oikeat tiedot

  data.forEach((rivi) => {
    console.log(rivi.user_id, rivi.username, rivi.user_level);

    // Luodaan jokaiselle riville ensin TR elementti alkuun
    const tr = document.createElement('tr');

    // Luodaan soluja mihihin tiedot
    const td1 = document.createElement('td');
    td1.innerText = rivi.username;

    // Luodaan soluja mihihin tiedot
    const td2 = document.createElement('td');
    td2.innerText = rivi.user_level;

    // <td><button class="check" data-id="2">Info</button></td>
    // const td3 = document.createElement('td');
    //td3.innerHTML = `<button class="check" data-id="${rivi.user_id}">Info</button>`;

    const td3 = document.createElement('td');
    const button1 = document.createElement('button');
    button1.className = 'check';
    button1.setAttribute('data-id', rivi.user_id);
    button1.innerText = 'Info';
    td3.appendChild(button1);

    button1.addEventListener('click', getUser);

    // td4
    const td4 = document.createElement('td');
    const button2 = document.createElement('button');
    button2.className = 'del';
    button2.setAttribute('data-id', rivi.user_id);
    button2.innerText = 'Delete';
    td4.appendChild(button2);

    // 2. Lisää kuuntelija kun taulukko on tehty
    button2.addEventListener('click', deleteUser);

    // td5
    var td5 = document.createElement('td');
    td5.innerText = rivi.user_id;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tbody.appendChild(tr);
  });
}

// Haetaan dialogi yksittäisille tiedoille
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
const dialog = document.querySelector('.info_dialog');
const closeButton = document.querySelector('.info_dialog button');
// "Close" button closes the dialog
closeButton.addEventListener('click', () => {
  dialog.close();
});

async function getUser(evt) {
  // haetaan data-attribuutin avulla id, tämä nopea tapa
  const id = evt.target.attributes['data-id'].value;
  console.log('Getting individual data for ID:', id);
  const url = `http://127.0.0.1:3000/api/users/${id}`;
  let token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer: ' + token,
    },
  };
  fetchData(url, options).then((data) => {
    console.log(data);
    // Avaa modaali
    dialog.showModal();
    console.log('in modal');
    dialog.querySelector('p').innerHTML = `
          <div>User ID: <span>${data.user_id}</span></div>
          <div>User Name: <span>${data.username}</span></div>
          <div>Email: <span>${data.email}</span></div>
          <div>Role: <span>${data.user_level}</span></div>
    `;
  });
}







async function deleteUser(evt) {
  console.log('Deletoit tietoa');
  console.log(evt);

  // Tapa 1, haetaan arvo tutkimalla eventtiä
  const id = evt.target.attributes['data-id'].value;
  console.log(id);

  // Tapa 2 haetaan "viereinen elementti"
  const id2 = evt.target.parentElement.nextElementSibling.textContent;
  console.log('Toinen tapa: ', id2);



  const url = `http://127.0.0.1:3000/api/users/${id}`;
  let token = localStorage.getItem('token');
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer: ' + token,
    },
  };

  const answer = confirm(`Oletko varma että haluat poistaa käyttäjän ID: ${id} `);
  if (answer) {
    fetchData(url, options).then((data) => {
      console.log(data);
      getUsers();
    });
  }
}

async function showUserName() {
  console.log('Onnistuneesti kirjauduttu ja käyttäjätietojen pitäisi näkyä');


  const url = 'http://localhost:3000/api/auth/me';
  let token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer: ' + token,
    },
  };
  fetchData(url, options).then((data) => {
    console.log(data);
    document.getElementById('name').innerHTML = data.user.username;
    // muita hakuja ja tietoja sivulle, kuten email ym. mitä halutaan näyttää
  });
}

// logataan ulos kjun painetaan logout nappulaa

document.querySelector('.logout').addEventListener('click', logOut);

function logOut(evt) {
  evt.preventDefault();
  localStorage.removeItem('token');
  console.log('logginout');
  window.location.href = 'index.html';
}

showUserName();