import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

/** Class that provides functionality to the footer. */
class CommonFooter extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/common/footer/common-footer.html";
  }
}

customElements.define("common-footer", CommonFooter);
