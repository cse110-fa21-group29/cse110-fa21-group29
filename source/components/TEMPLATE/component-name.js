import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

/** Class that provides functionality to component name. */
class ComponentName extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/component-name/component-name.html";
  }

  // Optional function, please remove if unused.
  // Runs when element is initially loaded into page.
  setupElement() {}
}

customElements.define("component-name", ComponentName);
