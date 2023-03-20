
const bodyEl = document.querySelector('body')
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId = null;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


startBtn.addEventListener('click', onStartGenerateColor);
stopBtn.addEventListener('click', onStopGenerateColor);

function onStartGenerateColor() {
    generateId = setInterval(() => bodyEl.style.backgroundColor = getRandomHexColor(), 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
};

function onStopGenerateColor() {
    clearInterval(generateId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
  
};