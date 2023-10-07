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
  setTimeout(() => {
    let score = document.querySelector(".score");
    score.innerHTML = game.topCriticScore;
  }, 300);
};

let guess = document.querySelector(".guess");

const checkGuess = () => {
  let result = document.querySelector("#result");
  let score = document.querySelector(".score");
  let correct;
  if (guess.value == "") return;
  if (guess.value == game.topCriticScore) {
    console.log("nice");
    playerScore++;
    console.log(playerScore);
    correct = true;
  } else {
    console.log("BRICK");
    correct = false;
  }

  !correct
    ? (score.style.backgroundColor = "red")
    : (score.style.backgroundColor = "var(--metacritic-green)");
  // score.style.visibility = "visible";
  score.style.opacity = 1;
  checkRounds();

  setTimeout(() => {
    // score.style.visibility = "hidden";
    // score.style.display = "none";
    score.style.opacity = 0;
    getStuff();
    if (roundCount !== 10) roundCount++;
    updateRoundCount();
    updateScore();
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

// const updateScore = () => {
//   const score = document.querySelector(".player-score");
//   score.innerHTML = `${playerScore}`;
//   console.log(playerScore);
// };

const checkRounds = () => {
  if (roundCount >= 10) {
    const modal = document.querySelector(".modal");
    let msg = `GG you got ${playerScore}/10...`;
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
