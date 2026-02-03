let blueScore = 0;
let redScore = 0;
let animating = { blue: false, red: false };
function updateScore(side, increment) {
  if (animating[side]) return;
  let currentScore = side === 'blue' ? blueScore : redScore;
  let newScore = currentScore + increment;
  if (newScore < 0) newScore = 0;
  if (newScore > 99) newScore = 0;
  if (side === 'blue') {
    blueScore = newScore;
  } else {
    redScore = newScore;
  }
  animating[side] = true;
  const flipper = document.querySelector(`#${side}-flipper .flipper`);
  const frontEl = document.getElementById(`${side}-front`);
  const backEl = document.getElementById(`${side}-back`);
  backEl.textContent = newScore;
  if (increment > 0) {
    flipper.style.transformOrigin = 'top center';
    flipper.style.animation = 'flipUp 0.6s ease-in-out forwards';
  } else {
    flipper.style.transformOrigin = 'bottom center';
    flipper.style.animation = 'flipDown 0.6s ease-in-out forwards';
  }
  flipper.addEventListener('animationend', function handler() {
    frontEl.textContent = newScore;
    flipper.style.animation = '';
    animating[side] = false;
  }, { once: true });
}
['blue', 'red'].forEach(side => {
  const sideElement = document.getElementById(`${side}-side`);
  sideElement.addEventListener('click', (event) => {
    const rect = sideElement.getBoundingClientRect();
    const clickY = event.clientY - rect.top;
    const heightThreshold = rect.height * 0.7;
    if (clickY < heightThreshold) {
      updateScore(side, 1);
    } else {
      updateScore(side, -1);
    }
  });
});

function resetScores() {
  blueScore = 0;
  redScore = 0;
  document.getElementById('blue-front').textContent = '0';
  document.getElementById('blue-back').textContent = '0';
  document.getElementById('red-front').textContent = '0';
  document.getElementById('red-back').textContent = '0';
  confetti({
    particleCount: 150,
    spread: 60,
    origin: { y: 0.6 }
  });
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {});
}
