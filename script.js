let num = Math.floor(Math.random() * 200);
let data;
const options = {
  method: "GET",
  url: "https://opencritic-api.p.rapidapi.com/game/hall-of-fame/2016",
  headers: {
    "X-RapidAPI-Key": "4b961ab84dmshd7d90f4d1e3c191p187930jsne0c60ebee570",
    "X-RapidAPI-Host": "opencritic-api.p.rapidapi.com",
  },
};
const getStuff = async () => {
  try {
    const response = await fetch(options.url, options);
    data = await response.json();
    placeData();
    console.log(data);
    // if (!result.name) ;
  } catch (error) {
    console.error(error);
  }
};
const placeData = () => {
  let pic = document.querySelector("#pic");
  pic.src = `https:img.opencritic.com/${data[1].images.box.og}`;

  let title = document.querySelector(".title");
  title.innerHTML = data[1].name;

  let score = document.querySelector(".score");
  score.innerHTML = data[1].topCriticScore;
};

const checkGuess = () => {
  let guess = document.querySelector(".guess");
  let btn = document.querySelector("#btn");
  // console.log(guess.value);
  if (guess.value == data[1].topCriticScore) {
    console.log("nice");
  } else console.log("BRICK");
};

getStuff();
