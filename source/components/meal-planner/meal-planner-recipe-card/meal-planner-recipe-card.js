import { CommonRecipeCard } from "/components/common/recipe-card/common-recipe-card.js";

/** Class that provides functionality to the meal planner recipe card. */
class MealPlannerRecipeCard extends CommonRecipeCard {
  constructor() {
    super();
    this.htmlPath =
      "components/meal-planner/meal-planner-recipe-card/meal-planner-recipe-card.html";
  }
}

customElements.define("meal-planner-recipe-card", MealPlannerRecipeCard);
