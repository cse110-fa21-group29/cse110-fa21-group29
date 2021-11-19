class HandsFree extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    let elementContent = await fetch("components/hands-free/hands-free.html");
    let elementContentText = await elementContent.text();
    this.shadowRoot.innerHTML = elementContentText;
    this.setupElement();
  }

  setupElement() {}
}

customElements.define("hands-free", HandsFree);

// move below codes into class
var count = 0;
var temp;
var timeron = 0;
var step = 1;
// step numbers
var maxStep = 5;

window.addEventListener("DOMContentLoaded", () => {
  this.shadowRoot
    .getElementById("start-button")
    .addEventListener("click", () => {
      startCount();
    });
  this.shadowRoot
    .getElementById("pause-button")
    .addEventListener("click", () => {
      stopCount();
    });
  this.shadowRoot
    .getElementById("resume-button")
    .addEventListener("click", () => {
      resumeCount();
    });
  this.shadowRoot
    .getElementById("next-button")
    .addEventListener("click", () => {
      nextStep();
    });
  this.shadowRoot
    .getElementById("back-button")
    .addEventListener("click", () => {
      backStep();
    });
  hidebackButton();
});

function timedCount() {
  setTime();
  count = count + 1;
  temp = setTimeout(timedCount, 1000);
}

function startCount() {
  if (!timeron) {
    timeron = 1;
    timedCount();
  }
}

function stopCount() {
  clearTimeout(temp);
  timeron = 0;
}

function resumeCount() {
  stopCount();
  count = 0;
  setTime();
}

function setTime() {
  let hour = parseInt(count / 3600);
  let minute = parseInt(count / 60);
  let second = parseInt(count % 60);
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

function nextStep() {
  if (++step == maxStep) {
    hideNextButton();
  }
  showbackButton();
  this.shadowRoot.getElementById("number").innerText = step;
}

function backStep() {
  if (--step == 1) {
    hidebackButton();
  }
  showNextButton();
  this.shadowRoot.getElementById("number").innerText = step;
}

function showbackButton() {
  this.shadowRoot.getElementById("back-button").style.visibility = "visible";
}

function hidebackButton() {
  this.shadowRoot.getElementById("back-button").style.visibility = "hidden";
}
function showNextButton() {
  this.shadowRoot.getElementById("next-button").style.visibility = "visible";
}

function hideNextButton() {
  this.shadowRoot.getElementById("next-button").style.visibility = "hidden";
}
