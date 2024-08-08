const FULL_DASH_ARRAY = 283;
const RESET_DASH_ARRAY = `-57 ${FULL_DASH_ARRAY}`;
const WARNING_THRESHOLD = 30;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

let startBtn = document.querySelector(".start");
let stopBtn = document.querySelector(".stop");
let resetBtn = document.querySelector(".reset");

let timer = document.querySelector("#base-timer-path-remaining");
let timeLabel = document.getElementById("base-timer-label");

const TIME_LIMIT = 30;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

function reset() {
  // ShowAndHide();
  let x = document.getElementById('SectionName');
  x.style.display = 'none';
  clearInterval(timerInterval);
  resetVars();
  startBtn.innerHTML = "Start";
  timer.setAttribute("stroke-dasharray", RESET_DASH_ARRAY);
}

function start(withReset = false) {
  // ShowAndHide();
  let x = document.getElementById('SectionName');
  x.style.display = 'block';
  setDisabled(startBtn);
  removeDisabled(stopBtn);
  if (withReset) {
    resetVars();
  }
  startTimer();
}

function stop() {
  let x = document.getElementById('SectionName');
  x.style.display = 'none';
  ShowAndHide();
  setDisabled(stopBtn);
  removeDisabled(startBtn);
  startBtn.innerHTML = "Continue";
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    timeLabel.innerHTML = formatTime(timeLeft);
    setCircleDasharray();

    setRemainingPathColor(timeLeft);

    if (timeLeft === WARNING_THRESHOLD){

      play();
    }

    if (timeLeft === 0) {
      timeIsUp();
    }
  }, 1000);
}

window.addEventListener("load", () => {
  timeLabel.innerHTML = formatTime(TIME_LIMIT);
  setDisabled(stopBtn);
});

function setDisabled(button) {
  button.setAttribute("disabled", "disabled");
}

function removeDisabled(button) {
  button.removeAttribute("disabled");
}

function play() {
        var beepsound = new Audio('clong-2.mp3');
        beepsound.play();
    }

function timeIsUp() {
  setDisabled(startBtn);
  removeDisabled(stopBtn);
  clearInterval(timerInterval);
  play();
  removeDisabled(startBtn);
  reset();
  /*let confirmReset = confirm("Time is UP! Restart?");
  if (confirmReset) {
    reset();
    startTimer();
  } else {
    reset();
  }*/
}

function resetVars() {
  removeDisabled(startBtn);
  setDisabled(stopBtn);
  timePassed = -1;
  timeLeft = TIME_LIMIT;
  console.log(timePassed, timeLeft);
  timeLabel.innerHTML = formatTime(TIME_LIMIT);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}


// function setRemainingPathColor(timeLeft) {
//   const { alert, warning, info } = COLOR_CODES;
//   if (timeLeft <= warning.threshold) {
//     document
//       .getElementById("base-timer-path-remaining")
//       .classList.remove(info.color);
//     document
//       .getElementById("base-timer-path-remaining")
//       .classList.add(warning.color);
//   } else if (timeLeft <= alert.threshold) {
//     document
//       .getElementById("base-timer-path-remaining")
//       .classList.remove(warning.color);
//     document
//       .getElementById("base-timer-path-remaining")
//       .classList.add(alert.color);
//   }
// }

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft > alert.threshold) {
  document
      .getElementById("base-timer-path-remaining")
      .style.stroke = "white";
  document
      .getElementById("base-timer-label")
      .style.color = "white";
  }
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .style.stroke = "red"; 
    document
      .getElementById("base-timer-label")
      .style.color = "red";
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  console.log("setCircleDashArray: ", circleDasharray);
  timer.setAttribute("stroke-dasharray", circleDasharray);
}

function ShowAndHide() {
    var x = document.getElementById('SectionName');
    if (x.style.display == 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}
