let currentText = 0;
let lastAnimation = "";

const memoSpeaks = [
  {
    text: "¿No quieres jugar conmigo?",
    imageUrl: "assets/icons/memo_error.png",
    animation: "animate__animated animate__pulse",
  },
  {
    text: "Aquí tienes los enlaces para nuestro proyecto.",
    imageUrl: "assets/icons/memo_triste.png",
    animation: "animate__animated animate__bounce",
  },
  {
    text: "¡Disfruta de la presentación!.",
    imageUrl: "assets/icons/memo_base.png",
    animation: "animate__animated animate__tada",
  },
];

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
window.setInterval(loadText, 5000);

document.getElementById('redirectFullFigma').addEventListener('click', function() {
  //window.open('https://www.figma.com/design/Ukmyr87dnhrV4wcsDsPHFs/Memorizo?node-id=6-1419&t=zWgpAXYRgDiykEzZ-1', '_blank');
  window.location.href = 'https://www.figma.com/design/Ukmyr87dnhrV4wcsDsPHFs/Memorizo?node-id=6-1419&t=zWgpAXYRgDiykEzZ-1';

});

document.getElementById('redirectFigmaReto').addEventListener('click', function() {
  //window.open('https://www.figma.com/design/Ukmyr87dnhrV4wcsDsPHFs/Memorizo?node-id=6-1419&t=zWgpAXYRgDiykEzZ-1', '_blank');
  window.location.href = 'https://www.figma.com/design/Ukmyr87dnhrV4wcsDsPHFs/Memorizo?node-id=6-1419&t=zWgpAXYRgDiykEzZ-1';

});
