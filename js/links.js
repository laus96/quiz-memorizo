let currentText = 0;
let lastAnimation = "";

const memoSpeaksLinks = [
  {
    text: "¿No quieres jugar conmigo?",
    imageUrl: "assets/icons/memo-error.png",
    animation: "animate__animated animate__pulse",
  },
  {
    text: "Aquí tienes los enlaces para nuestro proyecto.",
    imageUrl: "assets/icons/memo-triste.png",
    animation: "animate__animated animate__bounce",
  },
  {
    text: "¡Disfruta de la presentación!.",
    imageUrl: "assets/icons/memo-base.png",
    animation: "animate__animated animate__tada",
  },
];

function loadLinks() {
  if(currentText > memoSpeaksLinks.length - 1) currentText = 0;
  const memoBubble = $("#memo-bubble");
  const memoImage = $("#memo");
  const memoSpeaking = memoSpeaksLinks[currentText];

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

window.setInterval(loadLinks, 3500);

$("#redirectFullFigma, #redirectFigmaReto").on("click", () => {
  window.location.href =
    "https://www.figma.com/design/Ukmyr87dnhrV4wcsDsPHFs/Memorizo?node-id=6-1419&t=zWgpAXYRgDiykEzZ-1";
});
