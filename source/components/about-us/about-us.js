import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

class AboutUs extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/about-us/about-us.html";
  }

  /**
   * Initializes the about us page.
   */
  setupElement() {
    let img = this.shadowRoot.getElementById("introduction-bottom-img");
    img.addEventListener("click", () => {
      if (
        img.style.backgroundImage === 'url("/static/about-us/triscouch.jpg")'
      ) {
        img.style.backgroundImage = 'url("/static/about-us/team29.jpg")';
      } else {
        img.style.backgroundImage = 'url("/static/about-us/triscouch.jpg")';
      }
    });
  }
}

customElements.define("about-us", AboutUs);
