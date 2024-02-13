import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';
import { showjoke } from './joke.js';

document.querySelector('#app').innerHTML = 'moi ollaa tääl'


let element = document.querySelector('.chuck');
console.log(element);
showjoke(element);

// setupCounter(document.querySelector('button'));
