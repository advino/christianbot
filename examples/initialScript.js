const loadText = () => {
  const xhr = new XMLHttpRequest();
  let text;
  xhr.onreadystatechange = () => {
    if(xhr.readyState == 4) {
      text = xhr.response;
    }
  }

  xhr.open('GET', '/text.txt', false);
  xhr.send();

  return text;
}



const generateText = (_input, _order) => {
  let ngrams = {};

  for(let i = 0; i <= _input.length - _order; i++) {
    //substring first index is included second is excluded
    let gram = _input.substring(i, i + _order);

    if(!ngrams[gram]) {
      ngrams[gram] = [];
    }
    ngrams[gram].push(txt.charAt(i+_order));
  }

  return ngrams;
}

const markovIt = (_input, _order) => {
  let ngramArray = generateText(_input, _order);
  let currentGram = _input.substring(0,_order);
  let result = currentGram;

  for(let i = 0; i < 1000; i++) {

    let possible = ngramArray[currentGram]
    if(!possible) {
      break;
    }
    let nextChar = possible[Math.floor(Math.random()*possible.length)];
    result += nextChar;
    currentGram = result.substring(result.length - _order, result.length);
  }

  document.querySelector('h1').innerHTML = result;
}

let txt = loadText();
markovIt(txt, 10);
