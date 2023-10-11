let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector(".dark-mode-button");

const enableDarkMode = () => {
  document.querySelector(".info").classList.add("dark-mode");
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  document.querySelector(".info").classList.remove("dark-mode");
  localStorage.setItem("darkMode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode();
}

darkModeToggle.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enableDarkMode();
    console.log(darkMode);
    darkModeToggle.innerHTML = "wb_sunny";
  } else {
    disableDarkMode();
    console.log(darkMode);
    darkModeToggle.innerHTML = "dark_mode";
  }
});
