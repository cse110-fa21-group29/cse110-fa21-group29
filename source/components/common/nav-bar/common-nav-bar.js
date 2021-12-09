import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

/** Class that provides functionality to the nav bar. */
class CommonNavBar extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/common/nav-bar/common-nav-bar.html";
  }
}

customElements.define("common-nav-bar", CommonNavBar);
