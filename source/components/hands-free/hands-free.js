import { Database } from "/core/database/database.js";
import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

class HandsFree extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/hands-free/hands-free.html";
  }

  // Timer variables
  count = 0;
  temp;
  timeron = 0;

  // Step counter
  recipeSteps = [];
  currentStep = 1;

  async setupElement() {
    // Grab recipe from database based on routing parameter
    const database = new Database();
    let recipes = await database.getRecipes();
    let recipe = recipes[this.routeParams[0]];

    // If recipe is undefined, go back to home page
    if (!recipe) {
      // Route to home page
      const routerEvent = new CustomEvent("router-navigate", {
        detail: {
          route: "home-page",
          params: [],
        },
        bubbles: true,
        composed: true,
      });

      document.dispatchEvent(routerEvent);
    }

    // Store recipe steps as instance variable
    this.recipeSteps = recipe.steps;

    this.shadowRoot
      .getElementById("start-button")
      .addEventListener("click", () => {
        this.startCount();
      });
    this.shadowRoot
      .getElementById("pause-button")
      .addEventListener("click", () => {
        this.stopCount();
      });
    this.shadowRoot
      .getElementById("resume-button")
      .addEventListener("click", () => {
        this.resumeCount();
      });
    this.shadowRoot
      .getElementById("next-button")
      .addEventListener("click", () => {
        this.nextStep();
      });
    this.shadowRoot
      .getElementById("back-button")
      .addEventListener("click", () => {
        this.backStep();
      });
    this.hideBackButton();

    // Populate first step
    this.shadowRoot.getElementById("direction").innerText = this.recipeSteps[0];

    // Populate image and video (if included)
    this.shadowRoot.getElementById("direction-img").alt = recipe.metadata.title;
    if (recipe.metadata.image !== undefined && recipe.metadata.image !== "") {
      this.shadowRoot.getElementById("direction-img").src =
        recipe.metadata.image;
    } else {
      this.shadowRoot.getElementById("direction-img").src =
        "/static/common/defaultimg.jpeg";
    }

    if (recipe.metadata.video !== undefined && recipe.metadata.video !== "") {
      this.shadowRoot.getElementById("direction-video").style.display = "block";
      this.shadowRoot.getElementById("direction-video").src =
        recipe.metadata.video;
    }
  }

  timedCount() {
    this.setTime();
    this.count = this.count + 1;
    this.temp = setTimeout(this.timedCount.bind(this), 1000);
  }

  startCount() {
    if (!this.timeron) {
      this.timeron = 1;
      this.timedCount();
    }
  }

  stopCount() {
    clearTimeout(this.temp);
    this.timeron = 0;
  }

  resumeCount() {
    this.stopCount();
    this.count = 0;
    this.setTime();
  }

  setTime() {
    let hour = parseInt(this.count / 3600);
    let minute = parseInt(this.count / 60);
    let second = parseInt(this.count % 60);
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }
    this.shadowRoot.getElementById("timer-display").innerText =
      hour + ":" + minute + ":" + second;
  }

  nextStep() {
    if (++this.currentStep === this.recipeSteps.length) {
      this.hideNextButton();
    }
    this.showBackButton();
    this.shadowRoot.getElementById("number").innerText = this.currentStep;
    this.shadowRoot.getElementById("direction").innerText =
      this.recipeSteps[this.currentStep - 1];
  }

  backStep() {
    if (--this.currentStep === 1) {
      this.hideBackButton();
    }
    this.showNextButton();
    this.shadowRoot.getElementById("number").innerText = this.currentStep;
    this.shadowRoot.getElementById("direction").innerText =
      this.recipeSteps[this.currentStep - 1];
  }

  showBackButton() {
    this.shadowRoot.getElementById("back-button").style.visibility = "visible";
  }

  hideBackButton() {
    this.shadowRoot.getElementById("back-button").style.visibility = "hidden";
  }

  showNextButton() {
    this.shadowRoot.getElementById("next-button").style.visibility = "visible";
  }

  hideNextButton() {
    this.shadowRoot.getElementById("next-button").style.visibility = "hidden";
  }
}

customElements.define("hands-free", HandsFree);
