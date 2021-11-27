import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

class AboutUs extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/about-us/about-us.html";
  }
}

customElements.define("about-us", AboutUs);
