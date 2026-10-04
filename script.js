const musicToggle = document.getElementById('musicToggle');
const openLetterBtn = document.getElementById('openLetterBtn');
const letter = document.getElementById('letter');
const scrollToProposal = document.getElementById('scrollToProposal');
const finalRevealBtn = document.getElementById('finalRevealBtn');
const finalAnswer = document.getElementById('finalAnswer');
const heartField = document.getElementById('heartField');

let audioContext;

function createHeartRain() {
  const heart = document.createElement('span');
  heart.className = 'heart';
  const symbols = ['❤', '💗', '💖', '✨'];
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  const left = Math.random() * window.innerWidth;
  heart.style.left = `${left}px`;
  heart.style.animationDuration = `${6 + Math.random() * 5}s`;
  heart.style.fontSize = `${18 + Math.random() * 18}px`;
  heartField.appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}

function burstHearts() {
  for (let i = 0; i < 20; i += 1) {
    setTimeout(createHeartRain, i * 120);
  }
}

function playCuteMelody() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  if (!audioContext) {
    audioContext = new AudioCtx();
  }

  const melody = [523.25, 659.25, 783.99, 659.25, 698.46, 880.0, 783.99, 659.25];

  const now = audioContext.currentTime;
  melody.forEach((freq, index) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = index % 2 === 0 ? 'triangle' : 'sine';
    oscillator.frequency.value = freq;
    gainNode.gain.setValueAtTime(0.0001, now + index * 0.28);
    gainNode.gain.exponentialRampToValueAtTime(0.12, now + index * 0.28 + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.28 + 0.26);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(now + index * 0.28);
    oscillator.stop(now + index * 0.28 + 0.26);
  });

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
}

musicToggle.addEventListener('click', () => {
  playCuteMelody();
  burstHearts();
  musicToggle.textContent = '🎶 Melody playing';
  musicToggle.disabled = true;
  setTimeout(() => {
    musicToggle.disabled = false;
    musicToggle.textContent = '🎵 Play tune again';
  }, 2200);
});

openLetterBtn.addEventListener('click', () => {
  letter.classList.remove('hidden');
  letter.scrollIntoView({ behavior: 'smooth', block: 'start' });
  burstHearts();
});

scrollToProposal.addEventListener('click', () => {
  document.getElementById('proposal').scrollIntoView({ behavior: 'smooth', block: 'start' });
  burstHearts();
});

finalRevealBtn.addEventListener('click', () => {
  finalAnswer.classList.remove('hidden');
  finalAnswer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  burstHearts();
  playCuteMelody();
});

setInterval(() => {
  if (Math.random() > 0.4) {
    createHeartRain();
  }
}, 1300);

window.addEventListener('load', () => {
  burstHearts();
});
