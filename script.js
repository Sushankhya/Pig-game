"use strict";

let activePlayer = 0;
let current_score = 0;
let score0el = document.querySelector("#score--0");
let score1el = document.querySelector("#score--1");
let current0El = document.querySelector("#current--0");
let current1El = document.querySelector("#current--1");
let score = [0, 0];
let dice_img = document.querySelector(".dice");
let btn_new = document.querySelector(".btn--new");
let btn_roll = document.querySelector(".btn--roll");
let btn_hold = document.querySelector(".btn--hold");
let activePlayerel = document.querySelector(`.player--active`);

const initial = function () {
  dice_img.classList.add("hidden");
  document.querySelector(`.player--0`).classList.remove("player--winner");
  document.querySelector(`.player--1`).classList.remove("player--winner");
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  score0el.textContent = 0;
  score1el.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  current_score = 0;
  score = [0, 0];
  activePlayer = 0;
  btn_roll.disabled = false;
  btn_hold.disabled = false;
};

const switchPlayer = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle("player--active");
};

initial();

btn_roll.addEventListener("click", function () {
  let dice_roll = Math.trunc(Math.random() * 6) + 1;
  dice_img.src = `dice-${dice_roll}.png`;
  dice_img.classList.remove("hidden");
  if (dice_roll === 1) {
    current_score = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    switchPlayer();
  } else {
    current_score += dice_roll;
    document.querySelector(`#current--${activePlayer}`).textContent =
      current_score;
  }
});

btn_hold.addEventListener("click", function () {
  score[activePlayer] += current_score;
  document.querySelector(`#score--${activePlayer}`).textContent =
    score[activePlayer];
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  current_score = 0;
  if (score[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    dice_img.classList.add("hidden");
    btn_roll.disabled = true;
    btn_hold.disabled = true;
    document.querySelector(`#score--${activePlayer}`).textContent = "Winner";
  }
  switchPlayer();
});

btn_new.addEventListener("click", function () {
  initial();
});
