let num = Math.floor(Math.random() * 200);
let data;
let game;
let playerScore = 0;
let roundCount = 0;

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
  const roundCountSpan = document.querySelector(".round");
  if (roundCount == 0) roundCountSpan.innerHTML = `Round: 0/10`;
  if (roundCount <= 10) {
    let pic = document.querySelector("#pic");
    if (game.images.box) {
      pic.src = `https:img.opencritic.com/${game.images.box.og}`;
    } else {
      pic.src = `https:img.opencritic.com/${game.images.banner.og}`;
    }
  }
  // let title = document.querySelector(".title");
  // title.innerHTML = game.name;
  setTimeout(() => {
    let score = document.querySelector(".score");
    score.innerHTML = game.topCriticScore;
    let scoreIndicator = document.querySelector(".score-indicator");
  }, 300);
};

const checkGuess = () => {
  let score = document.querySelector(".score");
  let scoreIndicator = document.querySelector(".score-indicator");
  scoreIndicator.classList.remove("grad2");
  score.classList.remove("grad1");

  if (guess.value == "") return "stop";
  calculateScore(score, scoreIndicator);

  score.style.opacity = 1;
  scoreIndicator.style.opacity = 1;

  checkRounds();

  setTimeout(() => {
    score.style.opacity = 0;
    scoreIndicator.style.opacity = 0;
    if (roundCount !== 10) {
      roundCount++;
      getStuff(); //Moved this in here to stop rendering after 10th game. Move back out if issue.
    }
    updateRoundCount();
    updateScore();
  }, 1300);
};

const calculateScore = (score, scoreIndicator) => {
  let gameScore = game.topCriticScore;
  console.log(guess.value - gameScore);
  if (guess.value == gameScore) {
    console.log("Bullseye. What a Chad.");
    playerScore += 5;
    scoreIndicator.innerHTML = `+5`;
    scoreIndicator.classList.add("grad2");
    console.log(playerScore);
    score.classList.add("grad1");
  } else if (guess.value - gameScore == 1 || gameScore - guess.value == 1) {
    playerScore += 3;
    scoreIndicator.innerHTML = `+3`;
    console.log("Not bad");
    score.style.backgroundColor = "var(--metacritic-green)";
    console.log(playerScore);
  } else if (Math.abs(guess.value - gameScore) <= 3) {
    playerScore += 1;
    scoreIndicator.innerHTML = `+1`;
    console.log(playerScore);
    console.log("meh");
    score.style.backgroundColor = "var(--metacritic-yellow)";
  } else {
    console.log("BRICK");
    console.log(playerScore);
    score.style.backgroundColor = "var(--metacritic-red)";
    scoreIndicator.innerHTML = ``;
  }
};

let guess = document.querySelector(".guess");
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

const updateScore = () => {
  const playerScoreSpan = document.querySelector(".player-score");
  playerScoreSpan.textContent = `${playerScore}`;
  console.log(playerScore);
};

const checkRounds = () => {
  if (roundCount >= 10) {
    const modal = document.querySelector(".modal");
    let msg = `GG you got ${playerScore} points!/`;
    modal.innerHTML = msg + modal.innerHTML;
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
