let numArr = [];
// let items = [1, 2, 3, 4, 5, 6, 7, "", 8];
let items = [];


const siblings = new Map();
let emptySpace = null;
let round = 0;
let moves = 0;

// Loop to select all the cells store them inside an array.
for (let i = 0; i < 9; i++) {
  items[i] = document.querySelector(`#item${i + 1}`);
}

// Functionality to move cells with keys
document.querySelector("#grid-body").addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      if (siblings.get("bottom") !== "") {
        [numArr[siblings.get("bottom")], numArr[emptySpace]] = [
          numArr[emptySpace],
          numArr[siblings.get("bottom")],
        ];
        [items[siblings.get("bottom")].innerHTML, items[emptySpace].innerHTML] =
          [
            items[emptySpace].innerHTML,
            items[siblings.get("bottom")].innerHTML,
          ];
        setSiblings();
        ++moves;
        countMoves();
      }
      break;
    case "ArrowDown":
      if (siblings.get("top") !== "") {
        [numArr[siblings.get("top")], numArr[emptySpace]] = [
          numArr[emptySpace],
          numArr[siblings.get("top")],
        ];
        [items[siblings.get("top")].innerHTML, items[emptySpace].innerHTML] = [
          items[emptySpace].innerHTML,
          items[siblings.get("top")].innerHTML,
        ];
        setSiblings();
        ++moves;
        countMoves();
      }
      break;

    case "ArrowLeft":
      if (siblings.get("right") !== "") {
        [numArr[siblings.get("right")], numArr[emptySpace]] = [
          numArr[emptySpace],
          numArr[siblings.get("right")],
        ];
        [items[siblings.get("right")].innerHTML, items[emptySpace].innerHTML] =
          [items[emptySpace].innerHTML, items[siblings.get("right")].innerHTML];
        setSiblings();
        ++moves;
        countMoves();
      }
      break;

    case "ArrowRight":
      if (siblings.get("left") !== "") {
        [numArr[siblings.get("left")], numArr[emptySpace]] = [
          numArr[emptySpace],
          numArr[siblings.get("left")],
        ];
        [items[siblings.get("left")].innerHTML, items[emptySpace].innerHTML] = [
          items[emptySpace].innerHTML,
          items[siblings.get("left")].innerHTML,
        ];
        setSiblings();
        ++moves;
        countMoves();
      }
      break;
  }
  for (let i = 0; i < numArr.length; i++) {
    items[i].innerHTML = numArr[i];
    items[i].classList.remove("empty-item");
    if (items[i].innerHTML === "") {
      items[i].classList.add("empty-item");
      emptySpace = i;
    }
  }

  if (check()) {
    clearTimeout(timex);

    localStorage.setItem("hours", hours);
    localStorage.setItem("mins", mins);
    localStorage.setItem("seconds", seconds);
    localStorage.setItem("round", round);
    localStorage.setItem("moves", moves);

    document.querySelector(
      ".modal-moves"
    ).innerText = `Moves: ${localStorage.getItem("moves")}`;

    const modal_time = document.querySelector(".modal-time");

    modal_time.innerText =
      `Time: ${localStorage.getItem("hours")}: ` +
      `${localStorage.getItem("mins")}: ` +
      `${localStorage.getItem("seconds")}`;

    modal.style.display = "block";
  }
});

// Adds Click Functionality to every cell
for (let i = 0; i < 8 + 1; i++) {
  items[i].addEventListener("click", () => {
    moveCell(i);
  });
}

// Function to Generate Random Numbers
function generateNumbers() {
  numArr = [];

  let randomNum = Math.floor(Math.random() * 8) + 1;
  while (numArr.length < 8) {
    if (!numArr.includes(randomNum)) {
      numArr.push(randomNum);
    } else {
      randomNum = Math.floor(Math.random() * 8) + 1;
    }
  }

  const random_index = Math.floor(Math.random() * 9);
  numArr.splice(random_index, 0, "");
  // numArr = [1, 2, 3, 4, 5, 6, 7, "", 8];

  for (let i = 0; i <= 8; i++) {
    items[i].innerHTML = numArr[i];
    if (items[i].innerHTML == "") {
      items[i].classList.add("empty-item");
    } else {
        items[i].classList.remove("empty-item");
    }
  }
}

const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
    for (let i = 0; i < numArr.length; i++) {
        items[i].innerHTML = numArr[i];
        items[i].classList.remove("empty-item");
        if (items[i].innerHTML === "") {
          items[i].classList.add("empty-item");
          emptySpace = i;
        }
      }
  generateNumbers();
  setSiblings();
  initiateRound();
  moves = 0;
  countMoves();
  console.log("Timer Before: ", hours, mins, seconds, timex);
  resetTimer();
  console.log("Timer After: ", hours, mins, seconds, timex);

  startTimer();
});

function countMoves() {
  document.querySelector(".moves").innerText = `Moves: ${moves}`;
}

function showModalData() {
  document.querySelector(".moves").innerText = `Moves : ${local}`;
  document.querySelector(".moves").innerText = `Moves : ${moves}`;
}

function setSiblings() {
  for (let i = 0; i <= 8; i++) {
    if (items[i].innerText == "") {
      emptySpace = i;
    }
  }

  emptySpace - 3 >= 0
    ? siblings.set("top", emptySpace - 3)
    : siblings.set("top", "");

  emptySpace + 3 <= 8
    ? siblings.set("bottom", emptySpace + 3)
    : siblings.set("bottom", "");

  emptySpace % 3 == 0
    ? siblings.set("left", "")
    : siblings.set("left", emptySpace - 1);

  emptySpace % 3 == 2
    ? siblings.set("right", "")
    : siblings.set("right", emptySpace + 1);
}

function moveCell(index) {
  console.log("Siblings: ", siblings);
  const values = [...siblings.values()];
  values.forEach((value) => {
    if (index === value) {
      [numArr[index], numArr[emptySpace]] = [numArr[emptySpace], numArr[index]];
      [items[index].innerHTML, items[emptySpace].innerHTML] = [
        items[emptySpace].innerHTML,
        items[index].innerHTML,
      ];
      items[index].classList.add("empty-item");
      items[emptySpace].classList.remove("empty-item");
      ++moves;

      setSiblings();
      countMoves();
    }
  });

  if (check()) {
    clearTimeout(timex);

    localStorage.setItem("hours", hours);
    localStorage.setItem("mins", mins);
    localStorage.setItem("seconds", seconds);
    localStorage.setItem("round", round);
    localStorage.setItem("moves", moves);

    document.querySelector(
      ".modal-moves"
    ).innerText = `Moves: ${localStorage.getItem("moves")}`;

    const modal_time = document.querySelector(".modal-time");

    modal_time.innerText =
      `Time: ${localStorage.getItem("hours")}: ` +
      `${localStorage.getItem("mins")}: ` +
      `${localStorage.getItem("seconds")}`;

    modal.style.display = "block";
  }
}

function countRounds() {
  round += 1;
  document.querySelector(".round").innerText = `Round: ${round}`;
}

function initiateRound() {
  round = 1;
  document.querySelector(".round").innerText = `Round: ${round}`;
}

function moveCellWithKeys(e) {
  e.addEventListener();
}

//compareBoxesList
function check() {
  let pivot = false;
  return compareBoxes(pivot);
}

function compareBoxes(pivot = false) {
  for (let i = 1; i <= 8; i++) {
    if (!(items[i - 1].innerText == i)) {
      pivot = false;
      break;
    } else {
      pivot = true;
    }
  }
  return pivot;
}

// _____ Timer Function ____
var hours = 0;
var mins = 0;
var seconds = 0;
let timex = 0;
let interval = 1000;

function resetTimer() {
  clearTimeout(timex);
  timex = 0;
  hours = 0;
  mins = 0;
  seconds = 0;
  $("#hours").html("00");
  $("#mins").html("00");
  $("#seconds").html("00");
}

function startTimer() {
  console.log("Timex ===>", timex);
  clearTimeout(timex);

  //   timex = 0;
  timex = setTimeout(function () {
    seconds++;
    if (seconds > 59) {
      seconds = 0;
      mins++;
      if (mins > 59) {
        mins = 0;
        hours++;
        if (hours < 10) {
          $("#hours").text("0" + hours + ":");
        } else $("#hours").text(hours + ":");
      }

      if (mins < 10) {
        $("#mins").text("0" + mins + ":");
      } else $("#mins").text(mins + ":");
    }
    if (seconds < 10) {
      $("#seconds").text("0" + seconds);
    } else {
      $("#seconds").text(seconds);
    }

    startTimer();
  }, interval);
}

// ______________ Modal _________________
// Get the modal
var modal = document.getElementById("myModal");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";

    countRounds();
    moves = 0;
    countMoves();
    resetTimer();
    console.log("----------");
    generateNumbers();
    startTimer();
  }
};

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
