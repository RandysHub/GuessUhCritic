let num = Math.floor(Math.random() * 200);
let data;
let game;
let playerScore = 0;
let roundCount = 0;
const roundCountSpan = document.querySelector(".round");
roundCountSpan.innerHTML = `Round: 0/10`;

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
let options = {
  method: "GET",
  url: `https://opencritic-api.p.rapidapi.com/game/hall-of-fame/20${randomNumber(
    16,
    23
  )}`,
  headers: {
    "X-RapidAPI-Key": "4b961ab84dmshd7d90f4d1e3c191p187930jsne0c60ebee570",
    "X-RapidAPI-Host": "opencritic-api.p.rapidapi.com",
  },
};
const randomizeYear = () => {
  options.url = `https://opencritic-api.p.rapidapi.com/game/hall-of-fame/20${randomNumber(
    16,
    23
  )}`;
};
const randomizeGame = () => {
  let randomize = (num) => Math.floor(Math.random() * num);
  game = data[randomize(12)];
};

const getStuff = async () => {
  try {
    randomizeYear();
    const response = await fetch(options.url, options);
    data = await response.json();
    randomizeGame();
    console.log(game);
    placeData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const placeData = () => {
  if (roundCount < 10) {
    let pic = document.querySelector("#pic");
    if (game.images.box) {
      pic.src = `https:img.opencritic.com/${game.images.box.og}`;
    } else {
      pic.src = `https:img.opencritic.com/${game.images.banner.og}`;
    }
  }

  // let title = document.querySelector(".title");
  // title.innerHTML = game.name;

  let score = document.querySelector(".score");
  score.innerHTML = game.topCriticScore;
};

let guess = document.querySelector(".guess");

const checkGuess = () => {
  let result = document.querySelector("#result");
  let score = document.querySelector(".score");
  let correct;
  if (guess.value == "") return;
  if (guess.value == game.topCriticScore) {
    console.log("nice");
    if (result.innerHTML !== "Correct") result.innerHTML = "Correct";
    playerScore++;
    console.log(playerScore);
    correct = true;
  } else {
    console.log("BRICK");
    result.innerHTML = "Wrong";
    correct = false;
  }

  !correct
    ? (score.style.backgroundColor = "red")
    : (score.style.backgroundColor = "var(--metacritic-green)");
  score.style.visibility = "visible";
  checkRounds();

  setTimeout(() => {
    result.innerHTML = " ";
    score.style.visibility = "hidden";
    getStuff();
    roundCount++;
    updateRoundCount();
    console.log(roundCount);
  }, 1500);
};

guess.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkGuess();
  }
});
const updateRoundCount = () => {
  const roundCountSpan = document.querySelector(".round");
  roundCountSpan.innerHTML = `Round: ${roundCount}/10`;
};

const checkRounds = () => {
  if (roundCount >= 10) {
    const modal = document.querySelector(".modal");
    modal.innerHTML = `GG you got ${playerScore}/10.`;
    openGGModal();
  }
};

const openGGModal = () => {
  const modal = document.querySelector(".modal");
  modal.showModal();
};

const menuBtn = document.querySelector(".menu-btn");
let menuOpen = false;

menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    menuBtn.classList.add("open");
    menuOpen = true;
  } else {
    menuBtn.classList.remove("open");
    menuOpen = false;
  }
});

getStuff();
