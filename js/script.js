// VARIABLES
let currentText = 0;
let lastAnimation = "";
let currentQuestionIndex = 0;
let linksType = "";
let interval;
let confetti;

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

// INTRO

function loadIntro() {
  const memoBubble = $("#memo-bubble-intro");
  const memoImage = $("#memo-intro");
  const btnBack = $("#btn-back-intro");
  const btnNext = $("#btn-next");
  const btnEmpezar = $("#btn-start-intro");
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

function navigateMemo(direction) {
  if (direction === "next" && currentText < memoSpeaksIntro.length - 1)
    currentText++;
  if (direction === "back" && currentText > 0) currentText--;
  loadIntro();
}

function skipQuiz() {
  linksType = "skipped";

  const containerIndex = $("#container-index");
  const containerLinks = $("#container-links");

  const cardIndex = $("#card-index");
  const cardLinks = $("#card-links");

  containerIndex.css("display", "none");
  containerLinks.css("display", "");

  cardIndex.removeClass("page-in");
  cardIndex.removeClass("page-out");

  cardLinks.removeClass("page-in");
  cardLinks.removeClass("page-out");

  cardIndex.addClass("page-out");
  cardLinks.addClass("page-in");

  currentText = 0;
  lastAnimation = 0;

  loadLinks();

  interval = setInterval(() => {
    loadLinks();
  }, 4500);
}
// QUIZ

function startQuiz() {
  const containerIndex = $("#container-index");
  const containerQuiz = $("#container-quiz");

  const cardIndex = $("#card-index");
  const cardQuiz = $("#card-quiz");

  containerIndex.css("display", "none");
  containerQuiz.css("display", "");

  cardIndex.removeClass("page-in");
  cardIndex.removeClass("page-out");

  cardQuiz.removeClass("page-in");
  cardQuiz.removeClass("page-out");

  cardIndex.addClass("page-out");
  cardQuiz.addClass("page-in");

  loadQuestion();
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

function updateProgressBar() {
  $("#progress").css(
    "width",
    `${(currentQuestionIndex / questions.length) * 100}%`
  );
}

function loadNextQuestion() {
  if (++currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    updateProgressBar();
    linksType = "congrats";
    setTimeout(() => goLinks("quiz"), 1000);
  }
}

// LINKS

function goLinks(actualPage) {
  if (actualPage == "quiz") {
    const containerQuiz = $("#container-quiz");
    const containerLinks = $("#container-links");

    const cardQuiz = $("#card-quiz");
    const cardLinks = $("#card-links");

    containerQuiz.css("display", "none");
    containerLinks.css("display", "");

    cardQuiz.removeClass("page-in");
    cardQuiz.removeClass("page-out");

    cardLinks.removeClass("page-in");
    cardLinks.removeClass("page-out");

    cardQuiz.addClass("page-out");
    cardLinks.addClass("page-in");
  } else {
    const containerTeam = $("#container-team");
    const containerLinks = $("#container-links");

    const cardTeam = $("#card-team");
    const cardLinks = $("#card-links");

    containerTeam.css("display", "none");
    containerLinks.css("display", "");

    cardTeam.removeClass("page-in");
    cardTeam.removeClass("page-out");

    cardLinks.removeClass("page-in");
    cardLinks.removeClass("page-out");

    cardTeam.addClass("page-out");
    cardLinks.addClass("page-in");
  }

  currentText = 0;
  lastAnimation = 0;

  loadLinks();

  interval = setInterval(() => {
    loadLinks();
  }, 4500);
}

function loadLinks() {
  let memoBubble = $("#memo-bubble-links");
  let memoImage = $("#memo-links");
  let memoSpeaking;

  if (linksType == "congrats") {
    startConfetti();

    if (currentText > memoSpeaksCongrats.length - 1) currentText = 0;

    memoSpeaking = memoSpeaksCongrats[currentText];

    currentText++;
  } else {
    stopConfetti();
    if (currentText > memoSpeaksLinks.length - 1) currentText = 0;

    memoSpeaking = memoSpeaksLinks[currentText];

    currentText++;
  }
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

function stopInterval() {
  clearInterval(interval);
  interval = null;
}

function viewTeam() {
  stopInterval();
  stopConfetti();

  const containerLinks = $("#container-links");
  const containerTeam = $("#container-team");

  const cardLinks = $("#card-links");
  const cardTeam = $("#card-team");

  containerLinks.css("display", "none");
  containerTeam.css("display", "");

  cardLinks.removeClass("page-in");
  cardLinks.removeClass("page-out");

  cardTeam.removeClass("page-in");
  cardTeam.removeClass("page-out");

  cardLinks.addClass("page-out");
  cardTeam.addClass("page-in");
}

// CONFETTI
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

function startConfetti() {
  if (linksType == "congtrats") {
    if (!confetti) {
      // Evita múltiples intervalos activos
      confetti = setInterval(function () {
        createConfetti();
      }, 250);
    }
  }
}

function stopConfetti() {
  clearInterval(confetti);
  confetti = null;
}

function goHome(actualPage) {
  if (actualPage == "team") {
    const containerTeam = $("#container-team");
    const containerIndex = $("#container-index");

    const cardTeam = $("#card-team");
    const cardIndex = $("#card-index");

    containerTeam.css("display", "none");
    containerIndex.css("display", "");

    cardTeam.removeClass("page-in");
    cardTeam.removeClass("page-out");

    cardIndex.removeClass("page-in");
    cardIndex.removeClass("page-out");

    cardTeam.addClass("page-out");
    cardIndex.addClass("page-in");

    currentText = 0;
    lastAnimation = 0;
    loadIntro();
  } else {
    const containerLinks = $("#container-links");
    const containerIndex = $("#container-index");

    const cardLinks = $("#card-links");
    const cardIndex = $("#card-index");

    containerLinks.css("display", "none");
    containerIndex.css("display", "");

    cardLinks.removeClass("page-in");
    cardLinks.removeClass("page-out");

    cardIndex.removeClass("page-in");
    cardIndex.removeClass("page-out");

    cardLinks.addClass("page-out");
    cardIndex.addClass("page-in");

    currentText = 0;
    lastAnimation = 0;
    loadIntro();
  }
}

$("#redirectFullFigma, #redirectFigmaReto").on("click", () => {
  window.location.href =
    "https://www.figma.com/design/Ukmyr87dnhrV4wcsDsPHFs/Memorizo?node-id=6-1419&t=zWgpAXYRgDiykEzZ-1";
});

$(document).ready(() => {
  loadIntro();
});
