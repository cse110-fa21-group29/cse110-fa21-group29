import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

class CommonNavBar extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/common/nav-bar/common-nav-bar.html";
  }

  /**
   * Initializes the nav bar component.
   */
  setupElement() {
    this.shadowRoot
      .getElementById("search-button")
      .addEventListener("click", (event) => {
        event.preventDefault();

        // Route to search page
        const routerEvent = new CustomEvent("router-navigate", {
          detail: {
            route: "recipe-search",
            params: [],
            searchParams: {
              query: this.shadowRoot.getElementById("search-input").value,
              glutenFree: true,
              healthy: true,
              highProtein: true,
              vegan: true,
              vegetarian: true,
            },
          },
          bubbles: true,
          composed: true,
        });

        document.dispatchEvent(routerEvent);
      });
  }
}

customElements.define("common-nav-bar", CommonNavBar);
