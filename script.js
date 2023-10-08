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
  }, 300);
};

let guess = document.querySelector(".guess");

const checkGuess = () => {
  let result = document.querySelector("#result");
  let score = document.querySelector(".score");
  let correct;
  let color;
  if (guess.value == "") return;
  calculateScore(score);
  // changeScoreColor(score);
  // !correct
  //   ? (score.style.backgroundColor = "red")
  //   : (score.style.backgroundColor = "var(--metacritic-green)");

  score.style.opacity = 1;
  checkRounds();

  setTimeout(() => {
    score.style.opacity = 0;
    if (roundCount !== 10) {
      roundCount++;
      getStuff(); //Moved this in here to stop rendering after 10th game. Move back out if issue.
    }

    updateRoundCount();
  }, 1500);
};

const calculateScore = (score) => {
  let gameScore = game.topCriticScore;
  console.log(guess.value - gameScore);
  if (guess.value == gameScore) {
    console.log("Bullseye. What a Chad.");
    playerScore += 5;
    console.log(playerScore);
    score.style.backgroundColor = "purple";
  } else if (guess.value - gameScore == 1 || gameScore - guess.value == 1) {
    playerScore += 3;
    console.log("Not bad");
    score.style.backgroundColor = "var(--metacritic-green)";
    console.log(playerScore);
  } else if (Math.abs(guess.value - gameScore) <= 3) {
    playerScore += 1;
    console.log(playerScore);
    console.log("meh");
    score.style.backgroundColor = "var(--metacritic-yellow)";
  } else {
    console.log("BRICK");
    console.log(playerScore);
    score.style.backgroundColor = "var(--metacritic-red)";
  }
};

// const changeScoreColor = (score) => {
//   switch (color) {
//     case "rainbow":
//       score.style.backgroundColor = "purple";
//       console.log(score.style.backgroundColor);
//       break;
//     case "green":
//       score.style.backgroundColor = "var(--metacritic-green)";
//       console.log(score.style.backgroundColor);
//       break;
//     case "yellow":
//       score.style.backgroundColor = "var(--metacritic-yellow)";
//       console.log(score.style.backgroundColor);
//       break;
//     default:
//       score.style.backgroundColor = "var(--metacritic-red)";
//       console.log(score.style.backgroundColor);
//   }
// };

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
    let msg = `GG you got ${playerScore}/10`;
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
