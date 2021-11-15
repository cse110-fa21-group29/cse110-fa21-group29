//import "@fortawesome/fontawesome-free/js/all.js";

class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    let elementContent = await fetch("components/home-page/home-page.html");
    let elementContentText = await elementContent.text();
    this.shadowRoot.innerHTML = elementContentText;
    this.setupElement();
  }

  setupElement() {
    for (let i = 1; i < 4; i++) {
      let recippecardgrid = this.shadowRoot.getElementById(
        "recipe-card-grid-" + i
      );
      this.shadowRoot
        .getElementById("prev-button-" + i)
        .addEventListener("click", () => {
          this.recipeScroll(true, recippecardgrid);
        });
      this.shadowRoot
        .getElementById("next-button-" + i)
        .addEventListener("click", () => {
          this.recipeScroll(false, recippecardgrid);
        });
    }

    // copy recipe
    let recipesample = this.shadowRoot.getElementById("recipe-card-sample");
    for (let i = 0; i < 20; i++) {
      this.shadowRoot
        .getElementById("recipe-card-grid-1")
        .append(recipesample.cloneNode(true));
      this.shadowRoot
        .getElementById("recipe-card-grid-2")
        .append(recipesample.cloneNode(true));
      this.shadowRoot
        .getElementById("recipe-card-grid-3")
        .append(recipesample.cloneNode(true));
    }

    this.shadowRoot.querySelectorAll(".recipe-card").forEach((recipeCard) => {
      recipeCard.addEventListener("click", () => {
        // TODO: Add info about specific recipe card
        const routerEvent = new CustomEvent("router-navigate", {
          detail: {
            route: "recipe-details",
            params: {
              id: 1,
            },
          },
          bubbles: true,
          composed: true,
        });
        recipeCard.dispatchEvent(routerEvent);
      });
    });
  }

  recipeScroll(scrollleft, recipegrid) {
    if (scrollleft) {
      recipegrid.scroll({
        left: recipegrid.scrollLeft - (recipegrid.clientWidth * 3) / 4,
        behavior: "smooth",
      });
    } else {
      recipegrid.scroll({
        left: recipegrid.scrollLeft + (recipegrid.clientWidth * 3) / 4,
        behavior: "smooth",
      });
    }
  }
}

customElements.define("home-page", HomePage);
