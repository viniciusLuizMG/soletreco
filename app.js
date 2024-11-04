const tiles = document.querySelector(".tile-container");
const backspaceAndEnterRow = document.querySelector("#backspaceAndEnterRow");
const keyboardFirstRow = document.querySelector("#keyboardFirstRow");
const keyboardSecondRow = document.querySelector("#keyboardSecondRow");
const keyboardThirdRow = document.querySelector("#keyboardThirdRow");

// Array de palavras
const palavras = [
 
  "ELEMENTO",
  "MOLECULAR",
  "REACAO",
  "MATERIA",
  "FORMULAS",
  "CATALISADOR",
  "SUBSTANCIA",
  "COMPOSTO",
  "ESTAVEL",
  "LIGACAO",
  "OXIDACAO",
  "PESQUISAR",
  "TERMODINAMICA",
  "EQUILIBRIO",
  "ELETRONS ",
  "SOLVENTE"
];
const palavraEscolhida = palavras[Math.floor(Math.random() * palavras.length)];
const tamanhoPalavra = palavraEscolhida.length;

const rows = 6;
let currentRow = 0;
let currentColumn = 0;
let letreco = palavraEscolhida; // Palavra escolhida
let letrecoMap = {};

for (let index = 0; index < letreco.length; index++) {
  letrecoMap[letreco[index]] = index;
}

const guesses = [];

// Criação do tabuleiro
for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
  guesses[rowIndex] = new Array(tamanhoPalavra);
  const tileRow = document.createElement("div");
  tileRow.setAttribute("id", "row" + rowIndex);
  tileRow.setAttribute("class", "tile-row");
  for (let columnIndex = 0; columnIndex < tamanhoPalavra; columnIndex++) {
    const tileColumn = document.createElement("div");
    tileColumn.setAttribute("id", "row" + rowIndex + "column" + columnIndex);
    tileColumn.setAttribute(
      "class",
      rowIndex === 0 ? "tile-column typing" : "tile-column disabled"
    );
    tileRow.append(tileColumn);
    guesses[rowIndex][columnIndex] = "";
  }
  tiles.append(tileRow);
}

const checkGuess = () => {
  const guess = guesses[currentRow].join("");
  if (guess.length !== tamanhoPalavra) {
    return;
  }

  var currentColumns = document.querySelectorAll(".typing");
  for (let index = 0; index < tamanhoPalavra; index++) {
    const letter = guess[index];
    if (letrecoMap[letter] === undefined) {
      currentColumns[index].classList.add("wrong");
    } else {
      if (letrecoMap[letter] === index) {
        currentColumns[index].classList.add("right");
      } else {
        currentColumns[index].classList.add("displaced");
      }
    }
  }

  if (guess === letreco) {
    
    window.alert("Parabéns! Você adivinhou a palavra!");
    return;
  } else {
    if (currentRow === rows - 1) {
      window.alert("Fim de jogo! A palavra era: " + letreco);
    } else {
      moveToNextRow();
    }
  }
};

const moveToNextRow = () => {
  var typingColumns = document.querySelectorAll(".typing");
  for (let index = 0; index < typingColumns.length; index++) {
    typingColumns[index].classList.remove("typing");
    typingColumns[index].classList.add("disabled");
  }
  currentRow++;
  currentColumn = 0;

  const currentRowEl = document.querySelector("#row" + currentRow);
  var currentColumns = currentRowEl.querySelectorAll(".tile-column");
  for (let index = 0; index < currentColumns.length; index++) {
    currentColumns[index].classList.remove("disabled");
    currentColumns[index].classList.add("typing");
  }
};

const handleKeyboardOnClick = (key) => {
  if (currentColumn === tamanhoPalavra) {
    return;
  }
  const currentTile = document.querySelector(
    "#row" + currentRow + "column" + currentColumn
  );
  currentTile.textContent = key;
  guesses[currentRow][currentColumn] = key;
  currentColumn++;
};

const createKeyboardRow = (keys, keyboardRow) => {
  keys.forEach((key) => {
    var buttonElement = document.createElement("button");
    buttonElement.textContent = key;
    buttonElement.setAttribute("id", key);
    buttonElement.addEventListener("click", () => handleKeyboardOnClick(key));
    keyboardRow.append(buttonElement);
  });
};

const keysFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keysSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysThirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

createKeyboardRow(keysFirstRow, keyboardFirstRow);
createKeyboardRow(keysSecondRow, keyboardSecondRow);
createKeyboardRow(keysThirdRow, keyboardThirdRow);

const handleBackspace = () => {
  if (currentColumn === 0) {
    return;
  }

  currentColumn--;
  guesses[currentRow][currentColumn] = "";
  const tile = document.querySelector("#row" + currentRow + "column" + currentColumn);
  tile.textContent = "";
};

const backspaceButton = document.createElement("button");
backspaceButton.addEventListener("click", handleBackspace);
backspaceButton.textContent = "APAGAR";
backspaceAndEnterRow.append(backspaceButton);

const enterButton = document.createElement("button");
enterButton.addEventListener("click", checkGuess);
enterButton.textContent = "ENTER";
backspaceAndEnterRow.append(enterButton);

document.onkeydown = function (evt) {
  evt = evt || window.evt;
  if (evt.key === "Enter") {
    checkGuess();
  } else if (evt.key === "Backspace") {
    handleBackspace();
  } else if (/^[A-Z]$/.test(evt.key.toUpperCase())) {
    handleKeyboardOnClick(evt.key.toUpperCase());
  }
};

