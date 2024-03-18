import './style.css';
import { fetchData } from './fetch.js';
import { showSnackbar } from "./snackbar.js";
import { formatDate, getCurrentDate } from "./date.js";


const url = 'https://trdns.northeurope.cloudapp.azure.com/api/entries';

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
  postData('https://trdns.northeurope.cloudapp.azure.com/api/entries', options) 
    .then(data => {
      console.log('Response:', data); // Print response to console
      showSnackbar("darkgreen", "New entry added!"); // Show success message
    })
    .catch(error => {
      console.error('Error:', error); // Print error to console
      showSnackbar("red", "New entry couldn't be added!"); // Show error message
    });
}

// Function to send POST request using fetch
async function postData(url, options = {}) {
  // Define request settings
  const response = await fetch(url, options);
  
  // Return response in JSON format
  return response.json();
}


const toggleListButton = document.querySelector('.toggle_list');
const table = document.querySelector('.result-table');
let listVisible = false;

toggleListButton.addEventListener('click', () => {
  listVisible = !listVisible; // Vaihdetaan listan näkyvyyttä

  if (listVisible) {
    table.style.display = 'table'; // Näytetään lista
  } else {
    table.style.display = 'none'; // Piilotetaan lista
  }
});



const allButton = document.querySelector('.get_entries');
allButton.addEventListener('click', getEntries);

async function getEntries() {
  console.log('Haetaan kaikki merkinnät');
  const url = 'https://trdns.northeurope.cloudapp.azure.com/api/entries';
  const token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };


  fetchData(url, options)
    .then((data) => {
      createTable(data);
    })
    .catch((error) => {
      console.error('Error fetching entries:', error);
    });
}

function createTable(data) {
  console.log(data);

  // Etsitään tbody elementti
  const tbody = document.querySelector('.tbody');
  tbody.innerHTML = '';

  // Käydään läpi jokainen tietue ja luodaan sille rivi taulukkoon
  data.forEach((entry) => {
    console.log(entry.user_id, entry.entry_date, entry.workout, entry.duration, entry.intensity, entry.notes);

    // Luodaan TR elementti jokaiselle tietueelle
    const tr = document.createElement('tr');

    const td2 = document.createElement('td');
    td2.innerText = formatDate(entry.entry_date);

    const td3 = document.createElement('td');
    td3.innerText = entry.workout;

    const td4 = document.createElement('td');
    td4.innerText = entry.duration;

    const td5 = document.createElement('td');
    td5.innerText = entry.intensity;

    const td6 = document.createElement('td');
    td6.innerText = entry.notes;
    
    const td7 = document.createElement('td');
    const button2 = document.createElement('button');
    button2.className = 'check';
    button2.setAttribute('data-id', entry.entry_id);
    button2.innerText = 'Edit workout';
    td7.appendChild(button2);

    const td8 = document.createElement('td');
    const button3 = document.createElement('button');
    button3.className = 'check';
    button3.setAttribute('data-id', entry.entry_id);
    button3.innerText = 'Delete';
    td8.appendChild(button3);

    // 2. Lisää kuuntelija kun taulukko on tehty
    button2.addEventListener('click', Workout);
    button3.addEventListener('click', deleteWorkout);
    

    // Lisätään solut riville
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);


    // Lisätään rivi tbodyhin
    tbody.appendChild(tr);
  });
}

// Haetaan dialogi yksittäisille tiedoille
const dialog = document.querySelector('.info_dialog');
const closeButton = document.querySelector('.info_dialog button');
// "Close" button closes the dialog
closeButton.addEventListener('click', () => {
  dialog.close();
});

async function getEntry(evt) {
  // haetaan data-attribuutin avulla id, tämä nopea tapa
  const id = evt.target.attributes['data-id'].value;
  console.log('Getting individual data for ID:', id, userId);
  const url = `https://trdns.northeurope.cloudapp.azure.com/api/entries/${id}`;
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
          <div>User Name: <span>${data.workout}</span></div>
          <div>Email: <span>${data.notes}</span></div>
    `;
  });
}

async function Workout(evt) {
  console.log('Muokataan tietoa');
  console.log(evt);

  // Haetaan merkinnän tunniste eventistä
  const id = evt.target.attributes['data-id'].value;
  console.log(id);

  // Määritellään URL merkinnän hakemiseksi
  const url = `https://trdns.northeurope.cloudapp.azure.com/api/entries/${id}`;
  let token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer: ' + token,
    },
  };

  // Haetaan merkinnän tiedot
  fetchData(url, options).then((data) => {
    console.log(data);
    // Näytetään modaalivalikko muokkausta varten
    showModalForEdit(data);
  });
}

// Funktio, joka näyttää modaalivalikon muokkausta varten ja täyttää sen tiedoilla
function showModalForEdit(data) {
  dialog.showModal();
  console.log('in modal');
  dialog.querySelector('p').innerHTML = `
    <div>Entry ID: <span>${data.entry_id}</span></div>
    <div>Entry Date: <input type="date" id="edit-entry-date" value="${data.entry_date}"></div>
    <div>Workout: <input type="text" id="edit-workout" value="${data.workout}"></div>
    <div>Duration: <input type="number" id="edit-duration" value="${data.duration}"></div>
    <div>Intensity: <input type="text" id="edit-intensity" value="${data.intensity}"></div>
    <div>Notes: <textarea id="edit-notes">${data.notes}</textarea></div>
    <button class="save-edit" data-id="${data.entry_id}">Save Changes</button>
  `;

  // Add event listener for the "Save Changes" button
  const saveButton = document.querySelector('.save-edit');
  saveButton.addEventListener('click', saveEdit);
}

//function to save the edited workout
async function saveEdit(evt) {
  const entryId = evt.target.dataset.id;
  console.log('Saving changes for entry ID:', entryId);

  // Get the updated values from the input fields
  const updatedEntry = {
    entry_date: document.getElementById('edit-entry-date').value,
    workout: document.getElementById('edit-workout').value,
    duration: document.getElementById('edit-duration').value,
    intensity: document.getElementById('edit-intensity').value,
    notes: document.getElementById('edit-notes').value,
  };

  // Construct the URL for updating the entry
  const url = `https://trdns.northeurope.cloudapp.azure.com/api/entries/${entryId}`;

  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');

  // Set up the options for the PUT request
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(updatedEntry),
  };

  // Send the PUT request to update the entry
  fetchData(url, options)
    .then((data) => {
      console.log('Workout updated successfully:', data);
      // Optionally, you can reload the entries after updating
      getEntries();
      // Close the modal after updating
      dialog.close();
    })
    .catch((error) => {
      console.error('Error updating workout:', error);
    });
}


//function to delete a workout
async function deleteWorkout(evt) {
  console.log('Deleting workout entry');
  
  // Get the entry ID from the clicked button's data-id attribute
  const entryId = evt.target.dataset.id;
  console.log('Entry ID to delete:', entryId);

  // Confirm with the user before proceeding with deletion
  const answer = confirm(`Are you sure you want to delete workout entry with ID: ${entryId}?`);
  if (!answer) {
    // If the user cancels deletion, do nothing
    return;
  }

  // Construct the URL for deleting the entry
  const url = `https://trdns.northeurope.cloudapp.azure.com/api/entries/${entryId}`;

  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');

  // Set up the options for the DELETE request
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };


  // Send the DELETE request to delete the entry
  fetchData(url, options)
    .then((data) => {
      console.log('Workout entry deleted successfully:', data);
      // Optionally, you can reload the entries after deletion
      getEntries();
    })
    .catch((error) => {
      console.error('Error deleting workout entry:', error);
    });
}


async function showUserName() {
  console.log('Onnistuneesti kirjauduttu ja käyttäjätietojen pitäisi näkyä');


  const url = 'https://trdns.northeurope.cloudapp.azure.com/api/auth/me';
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