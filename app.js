const paperButton = document.querySelector(".button--paper");

const buttonClick = (e) => {
  console.log(e.target);
};

paperButton.addEventListener("click", buttonClick);
