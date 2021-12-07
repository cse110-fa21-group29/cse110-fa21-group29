import { CommonRecipeCard } from "/components/common/recipe-card/common-recipe-card.js";

/** Class that provides functionality to the sidebar recipe card. */
class SidebarRecipeCard extends CommonRecipeCard {
  constructor() {
    super();
    this.htmlPath =
      "components/meal-planner/sidebar-recipe-card/sidebar-recipe-card.html";
  }

  /**
   * Sets up functionality of the component.
   *
   * @async
   */
  async setupElement() {
    super.setupElement();

    // Add global drag start listener
    this.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", this.index);
    });
  }
}

customElements.define("sidebar-recipe-card", SidebarRecipeCard);
