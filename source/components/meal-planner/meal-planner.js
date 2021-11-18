window.addEventListener("DOMContentLoaded", () => {
  let samplemeal = document.getElementById("sample-meal");
  samplemeal.style.backgroundImage =
    "url(../../static/home-page/demorecipe.jpg)";
  samplemeal.style.backgroundSize = "cover";
  let mealcards = document.querySelectorAll(".meal-card");
  for (let i = 0; i < 21; i++) {
    mealcards[i].addEventListener("click", () => {
      window.prompt("Meal Url", "defaultText");
    });
  }
});
