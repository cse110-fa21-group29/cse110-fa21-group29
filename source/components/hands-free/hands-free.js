var count = 0;
var temp;
var timeron = 0;
var step = 1;
// step numbers
var maxStep = 5;

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-button").addEventListener("click", () => {
    startCount();
  });
  document.getElementById("pause-button").addEventListener("click", () => {
    stopCount();
  });
  document.getElementById("resume-button").addEventListener("click", () => {
    resumeCount();
  });
  document.getElementById("next-button").addEventListener("click", () => {
    nextStep();
  });
  document.getElementById("back-button").addEventListener("click", () => {
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
  document.getElementById("timer-display").innerText =
    hour + ":" + minute + ":" + second;
}

function nextStep() {
  if (++step == maxStep) {
    hideNextButton();
  }
  showbackButton();
  document.getElementById("number").innerText = step;
}

function backStep() {
  if (--step == 1) {
    hidebackButton();
  }
  showNextButton();
  document.getElementById("number").innerText = step;
}

function showbackButton() {
  document.getElementById("back-button").style.visibility = "visible";
}

function hidebackButton() {
  document.getElementById("back-button").style.visibility = "hidden";
}
function showNextButton() {
  document.getElementById("next-button").style.visibility = "visible";
}

function hideNextButton() {
  document.getElementById("next-button").style.visibility = "hidden";
}
