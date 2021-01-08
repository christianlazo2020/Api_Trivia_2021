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
  return Math.floor(Math.random() * (4 - 1)) + 0;
}
