let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector("dark-mode-button");

const enableDarkMode = () => {
  document.body.classList.add("dark-mode");
  localStorage.setItem("darkMode", true);
};

const disableDarkMode = () => {
  document.body.classList.remove("dark-mode");
  localStorage.setItem("darkMode", false);
};

// darkModeToggle.addEventListener("click", () => {
//   // darkMode = localStorage.getItem("darkMode")
//   if (!darkMode) {
//     enableDarkMode();
//     console.log(darkMode);
//   } else {
//     disableDarkMode();
//     console.log(darkMode);
//   }
// });
