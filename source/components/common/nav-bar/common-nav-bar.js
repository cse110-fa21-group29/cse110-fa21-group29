import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

class CommonNavBar extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/common/nav-bar/common-nav-bar.html";
  }
}

customElements.define("common-nav-bar", CommonNavBar);
