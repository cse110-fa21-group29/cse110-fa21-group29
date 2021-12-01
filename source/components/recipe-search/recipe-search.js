import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

class RecipeSearch extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/recipe-search/recipe-search.html";
  }

  setupElement() {
    this.shadowRoot
      .getElementById("filter-button")
      .addEventListener("click", () => {
        this.clickFilter();
      });
    this.shadowRoot
      .getElementById("search-button")
      .addEventListener("click", () => {
        this.clickSearch();
      });
    this.shadowRoot
      .getElementById("close-button")
      .addEventListener("click", () => {
        this.clickClose();
      });
    this.shadowRoot
      .getElementById("submit-button")
      .addEventListener("click", () => {
        this.clickSubmit();
      });
    this.shadowRoot
      .getElementById("reset-button")
      .addEventListener("click", () => {
        this.clickReset();
      });
  }

  // put button actions here, for search and submit button, they both have submit action now, for clear button,
  // it has a clear action, feel free to change them by change input type to button
  clickFilter() {
    this.shadowRoot.getElementById("filter-form").style.display = "initial";
  }
  clickSearch() {}
  clickClose() {
    this.shadowRoot.getElementById("filter-form").style.display = "none";
  }
  clickSubmit() {}
  clickReset() {}
}

customElements.define("recipe-search", RecipeSearch);
