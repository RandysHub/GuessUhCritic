let newUser = localStorage.getItem("newUser");
const instructions = document.querySelector("#instructions");

// localStorage.setItem("newUser", "true");

const closeInstructions = () => {
  instructions.close();
  localStorage.setItem("newUser", "false");
};

const run = () => {
  instructions.showModal();
};

if (newUser !== "false") {
  run();
}
