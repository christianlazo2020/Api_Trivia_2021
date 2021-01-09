/*Globals*/
let ansCorrect = [];
let goods = 0;

function getQuestions() {
  event.preventDefault();
  const numberQuestions = document.getElementById("questions").value;
  const category = document.getElementById("category").value;
  const difficulty = document.getElementById("difficulty").value;
  const type = document.getElementById("type").value;

  fetch(
    `https://opentdb.com/api.php?amount=${numberQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`
  )
    .then((response) => response.json())
    .then((data) => printData(data.results));
}

function printData(data) {
  let container = document.getElementById("questions-container");
  container.innerHTML = "";
  ansCorrect = [];
  goods = 0;

  data.forEach((element, index) => {
    container.innerHTML += cardHTML(element, index);
  });
}

function cardHTML(element, index) {
  const card = `<div class="card-content">
  <h3>${element.question}</h3>
  ${answeres(element.correct_answer, element.incorrect_answers, index)}
    </div>`;

  return card;
}

function answeres(correct, incorrect, ind) {
  let ram = random();
  ansCorrect.push(ram);
  incorrect.splice(ram, 0, correct);

  let getAnsweres = "";

  incorrect.forEach((element, index) => {
    getAnsweres += `<div>
                    <input type="radio"  id="${ind}${index}" name="card${ind}" required/>
                    <label for="">${element}</label>
    </div>`;
  });
  console.log(getAnsweres);
  return getAnsweres;
}

function random() {
  const type = document.getElementById("type").value;

  if (type === "multiple") {
    return Math.floor(Math.random() * (4 - 1)) + 0;
  } else if (type === "boolean") {
    return Math.floor(Math.random() * (2 - 1)) + 0;
  }
}

function veritify() {
  event.preventDefault();
  const type = document.getElementById("type").value;
  const numberQuestions = document.getElementById("questions").value;
  let answer = [];

  if (type === "multiple") {
    for (let i = 0; i < numberQuestions; i++) {
      var id = "";
      for (let j = 0; j < 4; j++) {
        id = document.getElementById(JSON.stringify(i) + JSON.stringify(j));
        // console.log(i + " " + j);
        console.log(id);
        if (id.checked === true) {
          console.log("entro");
          if (ansCorrect[i] === j) {
            goods++;
          }
        }
      }
    }
  } else if (type === "boolean") {
    for (let i = 0; i < numberQuestions; i++) {
      var id = "";
      for (let j = 0; j < 2; j++) {
        id = document.getElementById(JSON.stringify(i) + JSON.stringify(j));
        // console.log(i + " " + j);
        console.log(id);
        if (id.checked === true) {
          console.log("entro");
          if (ansCorrect[i] === j) {
            goods++;
          }
        }
      }
    }
  }

  console.log(goods);
  console.log(ansCorrect);
}
