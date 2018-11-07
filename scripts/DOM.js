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
const speaker = new p5.Speech();
const christianBot = new markovBot(1 , 500);
window.onload = () => {
  christianBot.feed(text);
  let genisisText = christianBot.generate();
  document.querySelector('h2').innerHTML = genisisText;
}

const createPoem = poemSize => {
  const christianBot = new markovBot(1, poemSize);
  christianBot.feed(text);
  let generatedText = christianBot.generate();
  document.querySelector('h2').innerHTML = generatedText;
}

let button = document.querySelector('button');
let input = document.querySelector('input');
input.min = 50;
input.max = text.length/5;
button.addEventListener('click', function() {
  createPoem(input.value);
});
