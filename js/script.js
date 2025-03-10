$(document).ready(function () {
  $("#card").addClass("page-in"); // Activa la animación de entrada
  $(".card-game").addClass("page-in"); // Activa la animación de entrada

  $(".nav-link").on("click", function (e) {
    e.preventDefault(); // Evita el cambio inmediato de página
    let url = $(this).attr("href");
    setTimeout(function () {
      window.location.href = url;
    }, 500); 
  });
});



