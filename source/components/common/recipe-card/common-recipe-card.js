class CommonRecipeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set recipeData(recipeData) {
    this.recipe = recipeData;
  }

  async connectedCallback() {
    let elementContent = await fetch(
      "components/common/recipe-card/common-recipe-card.html"
    );
    let elementContentText = await elementContent.text();
    this.shadowRoot.innerHTML = elementContentText;
    this.setupElement();
  }

  setupElement() {
    // Populate data into recipe card
    this.shadowRoot.querySelector(".recipe-card-name > div").innerHTML =
      this.recipe.metadata.title;
    this.shadowRoot.querySelector(".recipe-card-image").src =
      this.recipe.metadata.image;
    this.shadowRoot.querySelector("#time").innerHTML =
      this.recipe.info.readyInMinutes;
    this.shadowRoot.querySelector("#calories").innerHTML = parseInt(
      this.recipe.nutrients.calories
    );
    this.shadowRoot.querySelector("#protein").innerHTML =
      this.recipe.nutrients.protein;
    this.shadowRoot.querySelector("#score").innerHTML =
      this.recipe.info.healthScore;
  }
}

customElements.define("common-recipe-card", CommonRecipeCard);
