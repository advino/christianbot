String.prototype.tokenize = function() {
  return this.split(' ');
}

Array.prototype.choice = function() {
  let i = Math.floor(Math.random() * this.length);
  return this[i];
}

class markovBot {
  constructor(_n, _max) {
    this.n = _n;
    this.max = _max;
    this.ngrams = {};
    this.beginnings = [];
  }

  feed(text) {
    let tokens = text.tokenize();
    // let possibleBegin = text.split('\n');
    // for(let i = 0; i < possibleBegin.length; i++) {
    //   let possible = possibleBegin[i].split(' ');
    //   let beginning = possible.slice(0, this.n);
    //   this.beginnings.push(beginning);
    // }
    //
    // console.log(this.beginnings);

    if (tokens.length < this.n) {
      return false;
    }



    let start = Math.floor(Math.random()*tokens.length);

    let beginning = tokens.slice(start, start+this.n).join(' ');
    console.log(beginning);
    this.beginnings.push(beginning);

    for (let i = 0; i < tokens.length - this.n; i++) {
      let gram = tokens.slice(i, i + this.n).join(' ');
      let next = tokens[i + this.n];

      if (!this.ngrams[gram]) {
        this.ngrams[gram] = [];
      }
      this.ngrams[gram].push(next);

    }

    // console.log(this.ngrams);
  }

  generate() {

    let current = this.beginnings.choice();
    let output = current.tokenize();


    for (let i = 0; i < this.max; i++) {
      if (this.ngrams[current]) {
        let possible_next = this.ngrams[current];
        let next = possible_next.choice();

        output.push(next);
        current = output.slice(output.length - this.n, output.length).join(' ');
      } else {
        console.log("No more grams");
        break;
      }
    }

     let finalString = output.join(' ');
     let firstLetter = finalString.substring(0,1).toUpperCase();
     let remaining = finalString.substring(1,output.length);
     return `${firstLetter}${remaining}`;
  }



}

export default markovBot;
