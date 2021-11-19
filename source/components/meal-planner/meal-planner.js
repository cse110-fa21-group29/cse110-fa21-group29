class MealPlanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    let elementContent = await fetch(
      "components/meal-planner/meal-planner.html"
    );
    let elementContentText = await elementContent.text();
    this.shadowRoot.innerHTML = elementContentText;
    this.setupElement();
  }

  setupElement() {
    let samplemeal = this.shadowRoot.getElementById("sample-meal");
    samplemeal.style.backgroundImage = "url(static/home-page/demorecipe.jpg)";
    samplemeal.style.backgroundSize = "cover";
    let mealcards = this.shadowRoot.querySelectorAll(".meal-card");
    for (let i = 0; i < 21; i++) {
      mealcards[i].addEventListener("click", () => {
        window.prompt("Meal Url", "defaultText");
      });
    }
  }
}

customElements.define("meal-planner", MealPlanner);
