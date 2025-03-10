let currentText = 0;
let lastAnimation = "";

const memoSpeaks = [
  {
    text: "¡Hola! Soy Memo, el miembro principal de este equipo.",
    imageUrl: "assets/icons/memo-hola.png",
    animation: "animate__animated animate__bounce",
  },
  {
    text: "¡Para conseguir el enlace a Figma tendrás que completar mi reto!",
    imageUrl: "assets/icons/memo-sorpresa.png",
    animation: "animate__animated animate__bounce",
  },
  {
    text: "¿Sabrás decirme el nombre de todos mis compañeros?",
    imageUrl: "assets/icons/memo-muyfeliz.png",
    animation: "animate__animated animate__tada",
  },
];

function loadText() {
  const memoBubble = $("#memo-bubble");
  const memoImage = $("#memo");
  const btnBack = $("#btn-back");
  const btnNext = $("#btn-next");
  const btnEmpezar = $("#btn-empezar");
  const memoSpeaking = memoSpeaks[currentText];

  btnBack
    .toggleClass("btn-disabled", currentText === 0)
    .toggleClass("btn-contrast", currentText > 0);

  btnNext.toggle(currentText < memoSpeaks.length - 1);
  btnEmpezar.toggle(currentText === memoSpeaks.length - 1);

  setTimeout(() => {
    memoBubble.addClass("change");

    setTimeout(() => {
      memoBubble.text(memoSpeaking.text).removeClass("change");
    }, 250);

    if (lastAnimation != "") memoImage.removeClass(lastAnimation);

    lastAnimation = memoSpeaking.animation;

    void memoImage[0].offsetWidth;
    memoImage
      .attr("src", memoSpeaking.imageUrl)
      .addClass(memoSpeaking.animation);
  }, 100);
}

function next() {
  if (currentText < memoSpeaks.length - 1) {
    currentText++;
    loadText();
  }
}

function back() {
  if (currentText > 0) {
    currentText--;
    loadText();
  }
}
$(document).ready(function () {
  loadText();
});
