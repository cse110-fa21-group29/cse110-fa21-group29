import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

class MealPlannerRecipeCard extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath =
      "components/meal-planner-recipe-card/meal-planner-recipe-card.html";
  }

  // Optional function, please remove if unused.
  // Runs when element is initially loaded into page.
  setupElement() {}
}

customElements.define("meal-planner-recipe-card", MealPlannerRecipeCard);
