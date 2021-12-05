import { Database } from "/core/database/database.js";
import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

class HandsFree extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/hands-free/hands-free.html";
    this.totalTime = -1;
  }
  count = 0;
  temp;
  timeron = 0;
  step = 1;
  // step numbers
  maxStep = 5;

  async setupElement() {
    this.shadowRoot.getElementById("timer-display").style.visibility = "hidden";
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
      .getElementById("reset-button")
      .addEventListener("click", () => {
        this.resetCount();
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

    // Get recipe from database
    const db = new Database();
    const recipe = await db.getRecipe(this.routeParams[0]);

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

  nextStep() {
    if (++this.step == this.maxStep) {
      this.hideNextButton();
    }
    this.showBackButton();
    this.shadowRoot.getElementById("number").innerText = this.step;
  }

  backStep() {
    if (--this.step == 1) {
      this.hideBackButton();
    }
    this.showNextButton();
    this.shadowRoot.getElementById("number").innerText = this.step;
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
