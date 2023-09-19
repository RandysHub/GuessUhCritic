let num = Math.floor(Math.random() * 200);

const url = `https://opencritic-api.p.rapidapi.com/game/${num}`;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4b961ab84dmshd7d90f4d1e3c191p187930jsne0c60ebee570",
    "X-RapidAPI-Host": "opencritic-api.p.rapidapi.com",
  },
};
const getStuff = async () => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.name);
  } catch (error) {
    console.error(error);
  }
};
getStuff();
