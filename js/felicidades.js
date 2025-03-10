
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

triggerInfiniteConfetti();
