import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

class CommonFooter extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/common/footer/common-footer.html";
  }
}

customElements.define("common-footer", CommonFooter);
