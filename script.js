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

let guess = document.querySelector(".guess");

const checkGuess = () => {
  let result = document.querySelector("#result");
  let score = document.querySelector(".score");
  let correct;
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

  if (!correct) {
    score.style.backgroundColor = "red";
  } else score.style.backgroundColork = "-metacritic-green";
  score.style.visibility = "visible";
  checkRounds();
  setTimeout(() => {
    result.innerHTML = "";
    // randomizeGame();
    // placeData();
    score.style.visibility = "hidden";
    getStuff();
    roundCount++;
    console.log(roundCount);
  }, 1500);
};
guess.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    // document.querySelector("#btn").click();
    checkGuess();
  }
});
const checkRounds = () => {
  // playerScore = 0;
  // roundCount = 0;
  if (roundCount >= 10) {
    alert(`GG you got ${playerScore}/10`);
  }
};

getStuff();
