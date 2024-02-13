import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';
import {showJoke} from './joke.js';
import { showPics } from './catpics.js';

// MITÄ LIENEE TESTAILUI
// document.querySelector('#app').innerHTML = 'Moi täällä ollaan';
// setupCounter(document.querySelector('button'));
// setupCounter(document.querySelector('button2'));


// haetaan nappula ja tarjotaa se showJokelle
let element = document.querySelector('.chuck');
console.log(element);
showJoke(element);

showJoke(document.querySelector('.chuck'));

showPics(document.querySelector('.kisukuva'));