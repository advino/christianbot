import markovBot from './markov.js';
import finalCorpus from './corpus.js';

const loadText = (url) => {
  const xhr = new XMLHttpRequest();
  let text;
  xhr.onreadystatechange = () => {
    if(xhr.readyState == 4) {
      text = xhr.response;
    }
  }

  xhr.open('GET', url, false);
  xhr.send();

  return text;
}

// let text = loadText('scripts/corpus.txt');
let text = finalCorpus;
const christianBot = new markovBot(1 , 500);
window.onload = () => {
  christianBot.feed(text);
  document.querySelector('h2').innerHTML = christianBot.generate();
}

const createPoem = poemSize => {
  const christianBot = new markovBot(1, poemSize);
  christianBot.feed(text);
  document.querySelector('h2').innerHTML = christianBot.generate();
}

let button = document.querySelector('button');
let input = document.querySelector('input');
input.min = 50;
input.max = text.length/5;
button.addEventListener('click', function() {
  createPoem(input.value);
});
