let currentText = 0;
let lastAnimation = "";

const memoSpeaks = [
  {
    text: "¡ENHORABUENA! Has terminado mi reto.",
    imageUrl: "assets/icons/memo_MuyFeliz.png",
    animation: "animate__animated animate__jello",
  },
  {
    text: "Lo prometido es deuda, aquí tienes los enlaces de la presentación.",
    imageUrl: "assets/icons/memo_sonrisa.png",
    animation: "animate__animated animate__bounce",
  },
  {
    text: "Disfruta de nuestro prototipo.",
    imageUrl: "assets/icons/memo_base.png",
    animation: "animate__animated animate__tada",
  },
];

function triggerInfiniteConfetti() {
  setInterval(() => {
    generateConfetti();
  }, 200);
}

function generateConfetti() {
  let confettiPiece = $("<div class='confetti'></div>");
  $("body").append(confettiPiece);

  let confettiColors = ["#FF0000", "#00FF00", "#0000FF", "#FFD700", "#FF4500"];
  let confettiSize = Math.random() * 10 + 5;
  let confettiPositionX = Math.random() * 100;

  confettiPiece.css({
    left: confettiPositionX + "vw",
    width: confettiSize + "px",
    height: confettiSize + "px",
    backgroundColor:
      confettiColors[Math.floor(Math.random() * confettiColors.length)],
    animationDuration: Math.random() * 2 + 2 + "s",
  });

  setTimeout(() => confettiPiece.remove(), 3000);
}

function triggerStars() {
  for (let i = 0; i < 30; i++) {
    let starElement = $("<div class='star'></div>");
    $("body").append(starElement);

    let starSize = Math.random() * 15 + 5;
    let starPositionX = Math.random() * 100;

    starElement.css({
      left: starPositionX + "vw",
      width: starSize + "px",
      height: starSize + "px",
      animationDuration: Math.random() * 3 + 2 + "s",
    });

    setTimeout(() => starElement.remove(), 4000);
  }
}

function loadText() {
  if (currentText > memoSpeaks.length - 1) currentText = 0;
  const memoSpeaking = memoSpeaks[currentText];
  const memoBubble = $("#memo-bubble");
  const memoImage = $("#memo");

  setTimeout(() => {
    memoBubble.addClass("change");

    setTimeout(() => {
      memoBubble.text(memoSpeaking.text).removeClass("change");
    }, 250);

    if (lastAnimation != "") memoImage.removeClass(lastAnimation);
    currentText++;
    

    lastAnimation = memoSpeaking.animation;

    void memoImage[0].offsetWidth;
    memoImage
      .attr("src", memoSpeaking.imageUrl)
      .addClass(memoSpeaking.animation);
  }, 100);
}

loadText();
triggerInfiniteConfetti();
window.setInterval(loadText, 5000);

document.getElementById('redirectFullFigma').addEventListener('click', function() {
  //window.open('https://www.figma.com/design/Ukmyr87dnhrV4wcsDsPHFs/Memorizo?node-id=6-1419&t=zWgpAXYRgDiykEzZ-1', '_blank');
  window.location.href = 'https://www.figma.com/design/Ukmyr87dnhrV4wcsDsPHFs/Memorizo?node-id=6-1419&t=zWgpAXYRgDiykEzZ-1';

});

document.getElementById('redirectFigmaReto').addEventListener('click', function() {
  //window.open('https://www.figma.com/design/Ukmyr87dnhrV4wcsDsPHFs/Memorizo?node-id=6-1419&t=zWgpAXYRgDiykEzZ-1', '_blank');
  window.location.href = 'https://www.figma.com/design/Ukmyr87dnhrV4wcsDsPHFs/Memorizo?node-id=6-1419&t=zWgpAXYRgDiykEzZ-1';

});
