const intro = document.querySelector('#intro');
const garden = document.querySelector('#garden');
const startButton = document.querySelector('#startBtn');
const closeButton = document.querySelector('#closeBtn');
const letterButton = document.querySelector('#letterBtn');
const modal = document.querySelector('#letterModal');
const modalClose = document.querySelector('#modalClose');
const modalBackdrop = document.querySelector('#modalBackdrop');
const phrase = document.querySelector('#phrase');
const music = document.querySelector('#music');
const musicToggle = document.querySelector('#musicToggle');
const musicStatus = document.querySelector('#musicStatus');
const musicDot = document.querySelector('#musicDot');

const message = 'Que bonito es coincidir con usted en esta vida.';
let phraseTimer;

function showGarden() {
  intro.classList.add('hidden');
  garden.classList.remove('hidden');
  phrase.textContent = '';
  clearInterval(phraseTimer);
  let index = 0;
  phraseTimer = setInterval(() => {
    phrase.textContent += message[index++];
    if (index === message.length) clearInterval(phraseTimer);
  }, 42);
  music.play().then(setMusicState).catch(() => setMusicState(false));
}

function showIntro() {
  garden.classList.add('hidden');
  intro.classList.remove('hidden');
  music.pause();
  setMusicState(false);
}

function setMusicState(isPlaying) {
  musicDot.classList.toggle('is-playing', isPlaying);
  musicStatus.textContent = isPlaying ? 'Música sonando' : 'Música pausada';
  musicToggle.setAttribute('aria-label', isPlaying ? 'Pausar música' : 'Activar música');
}

function openLetter() {
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  modalClose.focus();
}

function closeLetter() {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  letterButton.focus();
}

startButton.addEventListener('click', showGarden);
closeButton.addEventListener('click', showIntro);
letterButton.addEventListener('click', openLetter);
modalClose.addEventListener('click', closeLetter);
modalBackdrop.addEventListener('click', closeLetter);
musicToggle.addEventListener('click', () => {
  if (music.paused) music.play().then(() => setMusicState(true)).catch(() => setMusicState(false));
  else { music.pause(); setMusicState(false); }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) closeLetter();
});
