import { Database } from "/core/database/database.js";
import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

class HandsFree extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/hands-free/hands-free.html";
    this.totalTime = -1;
  }

  // Timer variables
  count = 0;
  temp;
  timeron = 0;

  // Steps array and counter
  recipeSteps = [];
  currentStep = 1;

  /**
   * Setup function for the hands free page.
   * Gets the recipe steps, image, and video and loads them on the page.
   *
   * @async
   */
  async setupElement() {
    this.shadowRoot.getElementById("timer-display").style.visibility = "hidden";
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

    // Event handler for timer start button
    this.shadowRoot
      .getElementById("start-button")
      .addEventListener("click", () => {
        this.startCount();
      });

    // Event handler for t dimer pause button
    this.shadowRoot
      .getElementById("pause-button")
      .addEventListener("click", () => {
        this.stopCount();
      });

    // Event handler for timer resume button
    this.shadowRoot
      .getElementById("reset-button")
      .addEventListener("click", () => {
        this.resetCount();
      });

    // Event handler for hands free next step button
    this.shadowRoot
      .getElementById("next-button")
      .addEventListener("click", () => {
        this.nextStep();
      });

    // Event handler for hands free prev step button
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

  startCount() {
    // Hide user inputs
    this.shadowRoot.getElementById("input-hours").style.visibility = "hidden";
    this.shadowRoot.getElementById("input-minutes").style.visibility = "hidden";
    this.shadowRoot.getElementById("input-seconds").style.visibility = "hidden";
    this.shadowRoot.getElementById("input-hours-label").style.visibility =
      "hidden";
    this.shadowRoot.getElementById("input-minutes-label").style.visibility =
      "hidden";
    this.shadowRoot.getElementById("input-seconds-label").style.visibility =
      "hidden";

    if (!this.timeron) {
      this.timeron = 1;
      this.startTimer();
    }
  }

  stopCount() {
    clearTimeout(this.temp);
    this.timeron = 0;
  }

  resetCount() {
    this.stopCount();
    this.count = 0;
    this.totalTime = -1;
    // Show user inputs again
    this.shadowRoot.getElementById("input-hours").style.visibility = "visible";
    this.shadowRoot.getElementById("input-minutes").style.visibility =
      "visible";
    this.shadowRoot.getElementById("input-seconds").style.visibility =
      "visible";
    this.shadowRoot.getElementById("input-hours-label").style.visibility =
      "visible";
    this.shadowRoot.getElementById("input-minutes-label").style.visibility =
      "visible";
    this.shadowRoot.getElementById("input-seconds-label").style.visibility =
      "visible";

    // Hide timer
    this.shadowRoot.getElementById("timer-display").style.visibility = "hidden";
  }

  startTimer() {
    if (this.totalTime === -1) {
      let hoursInput = Number(
        this.shadowRoot.getElementById("input-hours").value
      );
      let minutesInput = Number(
        this.shadowRoot.getElementById("input-minutes").value
      );
      let secondsInput = Number(
        this.shadowRoot.getElementById("input-seconds").value
      );
      this.totalTime = hoursInput * 3600 + minutesInput * 60 + secondsInput;
    }

    let timer = this.shadowRoot.getElementById("timer-display");
    timer.style.visibility = "visible";
    this.setTime();
    this.totalTime -= 1;
    this.temp = setInterval(() => this.updateTime(), 1000);
  }

  setTime() {
    let timer = this.shadowRoot.getElementById("timer-display");
    var date = new Date(null);
    date.setSeconds(this.totalTime);
    timer.innerText = date.toISOString().substr(11, 8);
  }

  updateTime() {
    if (this.totalTime === 0) {
      // Play some sound
      var audio = new Audio("../../static/hands-free/timer-done-noise.mp3");
      audio.play();
      // Clear interval
      clearInterval(this.temp);
    }

    this.setTime();
    this.totalTime -= 1;
  }

  /**
   * Changes step on page to the next step.
   */
  nextStep() {
    if (++this.currentStep === this.recipeSteps.length) {
      this.hideNextButton();
    }
    this.showBackButton();
    this.shadowRoot.getElementById("number").innerText = this.currentStep;
    this.shadowRoot.getElementById("direction").innerText =
      this.recipeSteps[this.currentStep - 1];
  }

  /**
   * Changes step on page to the previous step.
   */
  backStep() {
    if (--this.currentStep === 1) {
      this.hideBackButton();
    }
    this.showNextButton();
    this.shadowRoot.getElementById("number").innerText = this.currentStep;
    this.shadowRoot.getElementById("direction").innerText =
      this.recipeSteps[this.currentStep - 1];
  }

  /**
   * Displays the prev step button.
   */
  showBackButton() {
    this.shadowRoot.getElementById("back-button").style.visibility = "visible";
  }

  /**
   * Hides the prev step button.
   */
  hideBackButton() {
    this.shadowRoot.getElementById("back-button").style.visibility = "hidden";
  }

  /**
   * Displays the next step button.
   */
  showNextButton() {
    this.shadowRoot.getElementById("next-button").style.visibility = "visible";
  }

  /**
   * Hides the next step button.
   */
  hideNextButton() {
    this.shadowRoot.getElementById("next-button").style.visibility = "hidden";
  }
}

customElements.define("hands-free", HandsFree);
