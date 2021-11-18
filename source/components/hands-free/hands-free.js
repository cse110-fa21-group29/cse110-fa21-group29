var count = 0;
var temp;
var timer_is_on = 0;

function timedCount() {
    setTime()
    count = count + 1;
    temp = setTimeout(timedCount, 1000);
}

function startCount() {
    if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();
    }
}

function stopCount() {
    clearTimeout(temp);
    timer_is_on = 0;
}

function resumeCount() {
    count = 0;
    setTime()
    stopCount()
    
}

function setTime() {
    let hour = Math.round(count / 3600)
    let minute = Math.round(count / 60);
    let second = Math.round(count % 3600)
    if (hour < 10) { hour = "0" + hour }
    if (minute < 10) { minute = "0" + minute }
    if (second < 10) { second = "0" + second }
    document.getElementById("timer-display").innerText = hour + ":" + minute + ":" + second;
}