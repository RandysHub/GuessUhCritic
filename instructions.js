let newUser = localStorage.getItem("newUser");
const instructions = document.querySelector("#instructions");

// localStorage.setItem("newUser", "true");

const closeInstructions = () => {
  instructions.close();
  localStorage.setItem("newUser", "false");
};

if (newUser !== "false") {
  instructions.showModal();
}
