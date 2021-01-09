/*Globals*/
let ansCorrect = [];
let numGoods = [];
let goods = 0;
function getCategories() {
  const url = "https://opentdb.com/api_category.php";

  fetch(url)
    .then((response) => response.json())
    .then((data) => printCategories(data.trivia_categories));
}

function printCategories(data) {
  const containerCategory = document.getElementById("category");

  data.forEach((category) => {
    containerCategory.innerHTML += `<option value="${category.id}">${category.name}</option>`;
  });
}

getCategories();

/*Con esta funcion hacemos la peticion a la api para que nos envie los datos que le solicitamos en un array*/
function getQuestions() {
  event.preventDefault();
  ansCorrect = [];
  numGoods = [];
  goods = 0;
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

/*con esta funcion accedemos a los datos enviados por la api para poder manejarlos e imprimirlos por pantalla*/
function printData(data) {
  let container = document.getElementById("questions-container");
  container.innerHTML = "";

  data.forEach((element, index) => {
    container.innerHTML += cardHTML(element, index);
  });
}

/* con esta funcion inprimimos la tarjeta de preguntas y le pasamos a la otra funcion parametros para poder imprimir cada opcion de respuesta */
function cardHTML(element, index) {
  const card = `<div id ="${index}" class="card-content">
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

/*Con esta funcion creamos un numero random, dependiendo el typo de pregunta si es multiple o verdadero/falso */
function random() {
  const type = document.getElementById("type").value;

  if (type === "multiple") {
    return Math.floor(Math.random() * (4 - 1)) + 0;
  } else if (type === "boolean") {
    return Math.floor(Math.random() * (2 - 1)) + 0;
  }
}

/*con esta funcion iteramos todos los ids para saber cual esta selecionado, para compararlo con el array de respuestas correctas y si es asi sumar respuestas correctas */
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
            numGoods.push(i);
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
            numGoods.push(i);
          }
        }
      }
    }
  }

  console.log(goods);
  console.log(ansCorrect);

  if (goods > 0) {
    printColorGoods();
  }
}

/*Lograr que esta clase funcione me costo 3 horas jder ptm */
function printColorGoods() {
  const numberQuestions = document.getElementById("questions").value;

  for (let i = 0; i < numberQuestions; i++) {
    for (let j = 0; j < numGoods.length; j++) {
      console.log(numGoods);
      if (i === numGoods[j]) {
        console.log("aver si asi");
        let data = JSON.stringify(i);
        document
          .querySelector(`#${CSS.escape(data)}`)
          .classList.add("bg-green");
      }
    }
  }
}
