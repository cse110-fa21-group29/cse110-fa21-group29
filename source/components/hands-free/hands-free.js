import { Database } from "/core/database/database.js";
import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

class HandsFree extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/hands-free/hands-free.html";
  }

  count = 0;
  temp;
  timeron = 0;
  step = 1;
  // step numbers
  maxStep = 5;

  async setupElement() {
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
