import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

class MealPlanner extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/meal-planner/meal-planner.html";
  }

  setupElement() {
    let samplemeal = this.shadowRoot.getElementById("sample-meal");
    samplemeal.style.backgroundImage = "url(static/common/demorecipe.jpg)";
    samplemeal.style.backgroundSize = "cover";
    let mealcards = this.shadowRoot.querySelectorAll(".meal-card");
    for (let i = 0; i < 21; i++) {
      mealcards[i].addEventListener("click", () => {
        window.prompt("Meal Url", "defaultText");
      });
    }
  }
}

customElements.define("meal-planner", MealPlanner);
