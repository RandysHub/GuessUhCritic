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
    getPic();
    console.log(pic.src);
    // if (!result.name) ;
  } catch (error) {
    console.error(error);
  }
};
const getPic = () => {
  let pic = document.querySelector("#pic");
  pic.src = `https:img.opencritic.com/${data[1].images.box.og}`;
  // // pic.src =
  //   "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQ5DGvQUmxxni4gFOyTZkCVgYYKDKVhhF5SwHcfF7zxSX1s13839su9bSTL_lrVdtLFTZ0G-zyEAuBp0t0";
};
getStuff();
