const menino = document.querySelector('.menino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          menino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      menino.style.bottom = position + 'px';
    }
  }, 20);
}

function createmosca() {
  const mosca = document.createElement('div');
  let moscaPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return; 

  mosca.classList.add('mosca');
  background.appendChild(mosca);
  mosca.style.left = moscaPosition + 'px';

  let leftTimer = setInterval(() => {
    if (moscaPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(mosca);
    } else if (moscaPosition > 0 && moscaPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<img src ="./menino-triste.jpg" class="game-over"><h1 class="game-over">A mosca te venceu!!!</h1>';
    } else {
      moscaPosition -= 10;
      mosca.style.left = moscaPosition + 'px';
    }
  }, 20);

  setTimeout(createmosca, randomTime);
}

createmosca();
document.addEventListener('keyup', handleKeyUp);     
