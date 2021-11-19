class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set params(params) {
    this.routeParams = params;
  }
  set route(route) {
    this.routeName = route;
  }

  async connectedCallback() {
    let elementContent = await fetch("components/home-page/home-page.html");
    let elementContentText = await elementContent.text();
    this.shadowRoot.innerHTML = elementContentText;
    this.setupElement();
  }

  setupElement() {
    for (let i = 1; i < 5; i++) {
      this.shadowRoot
        .getElementById("prev-button-" + i)
        .addEventListener("click", () => {
          this.recipeScroll(true, i);
        });
      this.shadowRoot.getElementById("prev-button-" + i).style.visibility =
        "hidden";

      this.shadowRoot
        .getElementById("next-button-" + i)
        .addEventListener("click", () => {
          this.recipeScroll(false, i);
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
      this.shadowRoot
        .getElementById("recipe-card-grid-4")
        .append(recipesample.cloneNode(true));
    }

    this.shadowRoot.querySelectorAll(".recipe-card").forEach((recipeCard) => {
      recipeCard.addEventListener("click", () => {
        // TODO: Add info about specific recipe card
        const routerEvent = new CustomEvent("router-navigate", {
          detail: {
            route: "recipe-details",
            params: [1],
          },
          bubbles: true,
          composed: true,
        });
        recipeCard.dispatchEvent(routerEvent);
      });
    });
  }

  recipeScroll(scrollleft, i) {
    let recipegrid = this.shadowRoot.getElementById("recipe-card-grid-" + i);
    let prevbutton = this.shadowRoot.getElementById("prev-button-" + i);
    let nextbutton = this.shadowRoot.getElementById("next-button-" + i);
    if (scrollleft) {
      recipegrid.scrollLeft -= (recipegrid.clientWidth * 3) / 4;
      nextbutton.style.visibility = "visible";
      if (recipegrid.scrollLeft - (recipegrid.clientWidth * 3) / 4 < 5) {
        prevbutton.style.visibility = "hidden";
      }
    } else {
      recipegrid.scrollLeft += (recipegrid.clientWidth * 3) / 4;
      prevbutton.style.visibility = "visible";
      if (
        recipegrid.scrollLeft + (recipegrid.clientWidth * 3) / 4 >
        recipegrid.scrollWidth - recipegrid.clientWidth
      ) {
        nextbutton.style.visibility = "hidden";
      }
    }
  }
}

customElements.define("home-page", HomePage);
