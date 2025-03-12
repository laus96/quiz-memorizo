let currentText = 0;
let lastAnimation = "";

const memoSpeaksCongrats = [
  {
    text: "¡ENHORABUENA! Has terminado mi reto.",
    imageUrl: "assets/icons/memo-muyfeliz.png",
    animation: "animate__animated animate__jello",
  },
  {
    text: "Lo prometido es deuda, aquí tienes los enlaces de la presentación.",
    imageUrl: "assets/icons/memo-sonrisa.png",
    animation: "animate__animated animate__bounce",
  },
  {
    text: "Disfruta de nuestro prototipo.",
    imageUrl: "assets/icons/memo-base.png",
    animation: "animate__animated animate__tada",
  },
];

function loadCongrats() {
  if(currentText > memoSpeaksCongrats.length - 1) currentText = 0;
  const memoBubble = $("#memo-bubble");
  const memoImage = $("#memo");
  const memoSpeaking = memoSpeaksCongrats[currentText];

  currentText ++;

  setTimeout(() => {
    memoBubble.addClass("change");
    setTimeout(() => {
      memoBubble.text(memoSpeaking.text).removeClass("change");
    }, 250);
    if (lastAnimation) memoImage.removeClass(lastAnimation);
    lastAnimation = memoSpeaking.animation;
    void memoImage[0].offsetWidth;
    memoImage
      .attr("src", memoSpeaking.imageUrl)
      .addClass(memoSpeaking.animation);
  }, 100);
}

$(document).ready(() => {
  $("#card").addClass("page-in");
  $(".nav-link").on("click", function (e) {
    e.preventDefault();
    let url = $(this).attr("href");
    setTimeout(() => (window.location.href = url), 500);
  });
});

function triggerInfiniteConfetti() {
  setInterval(() => {
    createConfetti();
  }, 200);
}

function createConfetti() {
  var confetti = $('<div class="confetti"></div>');

  var startPositionX = Math.random() * $(window).width();
  var size = Math.random() * 10 + 5;
  var colors = [
    "#ff69b4",
    "#00bfff",
    "#32cd32",
    "#ff6347",
    "#8a2be2",
    "#ffd700",
  ];
  var randomColor = colors[Math.floor(Math.random() * colors.length)];

  confetti.css({
    left: startPositionX,
    width: size,
    height: size,
    backgroundColor: randomColor,
  });

  $("#confetti-container").append(confetti);

  confetti.on("animationend", function () {
    confetti.remove();
  });
}

setInterval(function () {
  createConfetti();
}, 250);

window.setInterval(loadCongrats, 3500);

$("#redirectFullFigma, #redirectFigmaReto").on("click", () => {
  window.location.href =
    "https://www.figma.com/design/Ukmyr87dnhrV4wcsDsPHFs/Memorizo?node-id=6-1419&t=zWgpAXYRgDiykEzZ-1";
});
