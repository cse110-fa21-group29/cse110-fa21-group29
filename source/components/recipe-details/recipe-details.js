class RecipeDetails extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    let elementContent = await fetch(
      "components/recipe-details/recipe-details.html"
    );
    let elementContentText = await elementContent.text();
    this.shadowRoot.innerHTML = elementContentText;
    this.bindButton();
  }

  bindButton() {
    const buttonElement = this.shadowRoot.getElementById("button");
    buttonElement.addEventListener("click", () => {
      const routerEvent = new CustomEvent("router-navigate", {
        detail: {
          route: "home-page",
          params: [],
        },
        bubbles: true,
        composed: true,
      });
      buttonElement.dispatchEvent(routerEvent);
    });
  }
}

customElements.define("recipe-details", RecipeDetails);
