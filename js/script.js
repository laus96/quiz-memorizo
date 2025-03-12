let currentText = 0;
let lastAnimation = "";
let currentQuestionIndex = 0;

const memoSpeaksIntro = [
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

const questions = [
  {
    questionText: "¿Cómo se llama?",
    imageUrl: "assets/images/persona_1.jpg",
    options: ["Borja", "Javier", "José"],
    correctAnswer: "Borja",
  },
  {
    questionText: "¿Quién es?",
    imageUrl: "assets/images/persona_2.jpg",
    options: ["Helena", "Lorena", "Macarena"],
    correctAnswer: "Macarena",
  },
  {
    questionText: "Ahora mismo, os está haciendo la Demo",
    imageUrl: "assets/images/persona_3.jpg",
    options: ["Miguel", "Carlos", "Adrián"],
    correctAnswer: "Carlos",
  },
  {
    questionText: "¿Cuál es su nombre?",
    imageUrl: "assets/images/persona_4.jpg",
    options: ["Sara", "Laura", "Paula"],
    correctAnswer: "Laura",
  },
];

function loadContent(doc) {
  if (doc == "index") loadIntro();
  else if (doc == "quiz") loadQuestion();
}

function loadIntro() {
  const memoBubble = $("#memo-bubble");
  const memoImage = $("#memo");
  const btnBack = $("#btn-back");
  const btnNext = $("#btn-next");
  const btnEmpezar = $("#btn-empezar");
  const memoSpeaking = memoSpeaksIntro[currentText];

  btnBack
    .toggleClass("btn-disabled", currentText === 0)
    .toggleClass("btn-contrast", currentText > 0);
  btnNext.toggle(currentText < memoSpeaksIntro.length - 1);
  btnEmpezar.toggle(currentText === memoSpeaksIntro.length - 1);

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

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  $("#questionText").text(question.questionText);
  $("#questionNumber").text(currentQuestionIndex + 1);
  $("#questionImage").attr("src", question.imageUrl);

  $(".option").each((index, option) => {
    $(option)
      .removeClass("correct wrong")
      .text(question.options[index])
      .off("click")
      .on("click", () =>
        handleAnswerSelection(option, question.options[index])
      );
  });

  updateProgressBar();
}

function navigateMemo(direction) {
  if (direction === "next" && currentText < memoSpeaksIntro.length - 1)
    currentText++;
  if (direction === "back" && currentText > 0) currentText--;
  loadIntro();
}

$(document).ready(() => {
  $("#card").addClass("page-in");
  $(".nav-link").on("click", function (e) {
    e.preventDefault();
    let url = $(this).attr("href");
    setTimeout(() => (window.location.href = url), 500);
  });
});

//window.setInterval(loadText, 5000);

function handleAnswerSelection(option, selectedAnswer) {
  const correct =
    selectedAnswer === questions[currentQuestionIndex].correctAnswer;
  $(option).addClass(correct ? "correct" : "wrong");

  setTimeout(() => {
    $(option).removeClass("correct wrong");
    $("#feedback")
      .css("display", "none")
      .removeClass("correct-answer try-again");
    if (correct) loadNextQuestion();
  }, 1200);
}

function loadNextQuestion() {
  if (++currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    updateProgressBar();
    setTimeout(() => $("#felicidades").trigger("click"), 1000);
  }
}

function updateProgressBar() {
  $("#progress").css(
    "width",
    `${(currentQuestionIndex / questions.length) * 100}%`
  );
}