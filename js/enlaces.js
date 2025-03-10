let currentText = 0;

const textMemo = [
  "¿No quieres jugar conmigo?",
  "Aquí tienes los enlaces para nuestro proyecto.",
  "¡Disfruta de la presentación!",
];

const imageMemo = [
  "assets/icons/memo_error.png",
  "assets/icons/memo_hola.png",
  "assets/icons/memo_Base.png",
];

function loadLinks() {
    const memoBubble = $("#memo-bubble");
    const memoImage = $("#memo");
   
    setTimeout(() => {
      memoBubble.addClass("change");
      
      // Cambiar texto y reiniciar animación de la burbuja
      setTimeout(() => {
        memoBubble.text(textMemo[currentText]);
        currentText++;
      }, 250);
  
      memoImage.removeClass("animate__animated animate__bounce");
      void memoImage[0].offsetWidth; // Forzar repaint
      memoImage.attr("src", imageMemo[currentText])
               .addClass("animate__animated animate__bounce");
    }, 100);
  }

$(document).ready(function () {
  loadLinks();
window.setInterval(loadLinks, 7000);

});