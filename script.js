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
  let pic = document.querySelector("#pic");

  pic.src = `https:img.opencritic.com/${game.images.box.og}`;
  if (!pic.src) {
    pic.src = `https:img.opencritic.com/${game.images.box.sm}`;
  }

  let title = document.querySelector(".title");
  title.innerHTML = game.name;

  let score = document.querySelector(".score");
  score.innerHTML = game.topCriticScore;
};

const checkGuess = () => {
  let guess = document.querySelector(".guess");
  let result = document.querySelector("#result");

  if (guess.value == game.topCriticScore) {
    console.log("nice");
    if (result.innerHTML !== "Correct") result.innerHTML = "Correct";
    playerScore++;
    console.log(playerScore);
  } else {
    console.log("BRICK");
    result.innerHTML = "Wrong";
  }
  checkRounds();
  setTimeout(() => {
    result.innerHTML = "";
    // randomizeGame();
    // placeData();
    getStuff();
    roundCount++;
    console.log(roundCount);
  }, 1200);
};
const checkRounds = () => {
  // playerScore = 0;
  // roundCount = 0;
  if (roundCount >= 10) {
    alert(`GG you got ${playerScore}/10`);
  }
};

getStuff();
