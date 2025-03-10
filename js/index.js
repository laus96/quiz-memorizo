let currentText = 0;

const textMemo = [
  "¡Hola! Soy Memo, el miembro principal de este equipo.",
  "¡Para conseguir el enlace a Figma tendrás que completar mi reto!",
  "¿Sabrás decirme el nombre de todos mis compañeros?",
];

const imageMemo = [
  "assets/icons/memo_Hola.png",
  "assets/icons/memo_feliz.png",
  "assets/icons/memo_Pensando.png",
];

function loadText() {
    const memoBubble = $("#memo-bubble");
    const memoImage = $("#memo");
    const btnBack = $("#btn-back");
    const btnNext = $("#btn-next");
    const btnEmpezar = $("#btn-empezar");
  
    // Actualizar clases de botones
    btnBack.toggleClass("btn-disabled", currentText === 0)
           .toggleClass("btn-contrast", currentText > 0);
    
    btnNext.toggle(currentText < textMemo.length - 1);
    btnEmpezar.toggle(currentText === textMemo.length - 1);
  
    // Aplicar animación y cambiar contenido después de 100ms
    setTimeout(() => {
      memoBubble.addClass("change");
      
      // Cambiar texto y reiniciar animación de la burbuja
      setTimeout(() => {
        memoBubble.text(textMemo[currentText]).removeClass("change");
      }, 250);
  
      // Reiniciar la animación de la imagen de Memo
      memoImage.removeClass("animate__animated animate__bounce");
      void memoImage[0].offsetWidth; // Forzar repaint
      memoImage.attr("src", imageMemo[currentText])
               .addClass("animate__animated animate__bounce");
    }, 100);
  }

function next() {
  if (currentText < textMemo.length - 1) {
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
