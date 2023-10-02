let num = Math.floor(Math.random() * 200);
let data;
let game;
let playerScore = 0;
const options = {
  method: "GET",
  url: "https://opencritic-api.p.rapidapi.com/game/hall-of-fame/2016",
  headers: {
    "X-RapidAPI-Key": "4b961ab84dmshd7d90f4d1e3c191p187930jsne0c60ebee570",
    "X-RapidAPI-Host": "opencritic-api.p.rapidapi.com",
  },
};
const randomizeGame = () => {
  let randomize = (num) => Math.floor(Math.random() * num);
  game = data[randomize(12)];
};
const getStuff = async () => {
  try {
    const response = await fetch(options.url, options);
    data = await response.json();
    randomizeGame();
    console.log(game);
    placeData();
    console.log(data);
    // if (!result.name) ;
  } catch (error) {
    console.error(error);
  }
};
const placeData = () => {
  let pic = document.querySelector("#pic");
  pic.src = `https:img.opencritic.com/${game.images.box.og}`;

  let title = document.querySelector(".title");
  title.innerHTML = game.name;

  let score = document.querySelector(".score");
  score.innerHTML = game.topCriticScore;
};

const checkGuess = () => {
  let guess = document.querySelector(".guess");
  // let btn = document.querySelector("#btn");
  // let container = document.querySelector("form-container");
  let body = document.body;
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
};
const play = () => {
  playerScore = 0;
};

getStuff();
