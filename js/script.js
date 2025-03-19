// VARIABLES
let currentText = 0;
let currentQuestionIndex = 0;
let challengeEnded = false;
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
    text: "Aquí tienes los enlaces de la presentación.",
    imageUrl: "assets/icons/memo-sonrisa.png",
    animation: "animate__animated animate__bounce",
  },
  {
    text: "Disfruta de nuestro prototipo.",
    imageUrl: "assets/icons/memo-base.png",
    animation: "animate__animated animate__tada",
  },
];

const memoSpeaksTeam = [
  {
    text: "¡Explora cada tarjeta con un toque!",
    imageUrl: "assets/icons/memo-muyfeliz.png",
    animation: "animate__animated animate__bounce",
  },
  {
    text: "Haz clic en información para más detalles.",
    imageUrl: "assets/icons/memo-sonrisa.png",
    animation: "animate__animated animate__bounce",
  },
];

const questions = [
  {
    questionText: "¿Cómo se llama?",
    imageUrl: "assets/images/pregunta_1.jpg",
    options: ["Borja", "Javier", "José"],
    correctAnswer: "Borja",
  },
  {
    questionText: "¿Qué bebida prefiere Laura?",
    imageUrl: "assets/images/pregunta_2.jpg",
    options: ["Té", "Café", "Refresco"],
    correctAnswer: "Café",
  },
  {
    questionText: "¿De dónde es Maca?",
    imageUrl: "assets/images/pregunta_3.jpg",
    options: ["Vigo", "Málaga", "Sevilla"],
    correctAnswer: "Sevilla",
  },
  {
    questionText: "¿En qué año nació Carlos?",
    imageUrl: "assets/images/pregunta_4.jpg",
    options: ["2000", "2002", "1998"],
    correctAnswer: "2002",
  },
];

// INTRO

function loadIntro() {
  const memoBubble = $("#memo-bubble-index");
  const memoImage = $("#memo-index");
  const btnBack = $("#btn-back-index");
  const btnNext = $("#btn-next-index");
  const btnEmpezar = $("#btn-start-index");
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

    memoImage.removeClassExcept("logo");

    void memoImage[0].offsetWidth;
    memoImage
      .attr("src", memoSpeaking.imageUrl)
      .addClass(memoSpeaking.animation);
  }, 100);
}

function navigateText(direction) {
  if (direction === "next" && currentText < memoSpeaksIntro.length - 1)
    currentText++;
  if (direction === "back" && currentText > 0) currentText--;
  loadIntro();
}

function skipQuiz() {
  challengeEnded = false;

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
  currentQuestionIndex = 0;

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
    challengeEnded = true;
    setTimeout(() => goLinks("quiz"), 1000);
  }
}

// LINKS

function goLinks(actualPage) {
  $(".flipped").removeClass("flipped");
  const containerLinks = $("#container-links");
  const cardLinks = $("#card-links");

  switch (actualPage) {
    case "index":
      const containerIndex = $("#container-index");
      const cardIndex = $("#card-index");

      containerIndex.css("display", "none");
      containerLinks.css("display", "");

      cardIndex.removeClass("page-in");
      cardIndex.removeClass("page-out");

      cardLinks.removeClass("page-in");
      cardLinks.removeClass("page-out");

      cardIndex.addClass("page-out");
      cardLinks.addClass("page-in");
      break;
    case "quiz":
      const containerQuiz = $("#container-quiz");

      const cardQuiz = $("#card-quiz");

      containerQuiz.css("display", "none");
      containerLinks.css("display", "");

      cardQuiz.removeClass("page-in");
      cardQuiz.removeClass("page-out");

      cardLinks.removeClass("page-in");
      cardLinks.removeClass("page-out");

      cardQuiz.addClass("page-out");
      cardLinks.addClass("page-in");
      break;
    case "team":
      const containerTeam = $("#container-team");

      const cardTeam = $("#card-team");

      containerTeam.css("display", "none");
      containerLinks.css("display", "");

      cardTeam.removeClass("page-in");
      cardTeam.removeClass("page-out");

      cardLinks.removeClass("page-in");
      cardLinks.removeClass("page-out");

      cardTeam.addClass("page-out");
      cardLinks.addClass("page-in");
      break;
  }

  if (actualPage.toLowerCase() == "quiz") {
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

  stopInterval();

  loadLinks();
  if (challengeEnded) startConfetti();
  else stopConfetti();

  interval = setInterval(() => {
    loadLinks();
  }, 4500);
}

function loadLinks(from) {
  let memoBubble = $("#memo-bubble-links");
  let memoImage = $("#memo-links");
  let memoSpeaking;

  if (challengeEnded) {
    if (currentText > memoSpeaksCongrats.length - 1) currentText = 0;

    memoSpeaking = memoSpeaksCongrats[currentText];

    currentText++;
  } else {
    if (currentText > memoSpeaksLinks.length - 1) currentText = 0;

    memoSpeaking = memoSpeaksLinks[currentText];

    currentText++;
  }
  setTimeout(() => {
    memoBubble.addClass("change");
    setTimeout(() => {
      memoBubble.text(memoSpeaking.text).removeClass("change");
    }, 250);
    memoImage.removeClassExcept("logo");

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

  currentText = 0;

  stopInterval();

  loadTeam();
  if (challengeEnded) startConfetti();
  else stopConfetti();

  interval = setInterval(() => {
    loadTeam();
  }, 4500);
}

function loadTeam() {
  let memoBubble = $("#memo-bubble-team");
  let memoImage = $("#memo-team");
  let memoSpeaking;

  if (currentText > memoSpeaksTeam.length - 1) currentText = 0;

  memoSpeaking = memoSpeaksTeam[currentText];

  currentText++;

  setTimeout(() => {
    memoBubble.addClass("change");
    setTimeout(() => {
      memoBubble.text(memoSpeaking.text).removeClass("change");
    }, 250);
    memoImage.removeClassExcept("logo-small");

    void memoImage[0].offsetWidth;
    memoImage
      .attr("src", memoSpeaking.imageUrl)
      .addClass(memoSpeaking.animation);
  }, 100);
}

// CONFETTI
function createConfetti() {
  for (let i = 0; i < 3; i++) {
    // Solo 3 confetis por llamada
    let confetti = document.createElement("div");
    confetti.classList.add("confetti");

    let windowWidth = window.innerWidth;
    let startPositionX = Math.random() * windowWidth;
    let size = Math.random() * 10 + 5; // Entre 5px y 15px
    let colors = [
      "#ff69b4",
      "#00bfff",
      "#32cd32",
      "#ff6347",
      "#8a2be2",
      "#ffd700",
    ];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    let animationDuration = Math.random() * 2 + 2; // Entre 2s y 4s

    confetti.style.left = startPositionX + "px";
    confetti.style.width = size + "px";
    confetti.style.height = size + "px";
    confetti.style.backgroundColor = randomColor;
    confetti.style.animation = `fall ${animationDuration}s linear forwards`;

    document.getElementById("confetti-container").appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, animationDuration * 1000);
  }
}

function startConfetti() {
  if (challengeEnded) {
    if (!confetti) {
      console.log("Iniciando confeti...");
      confetti = setInterval(function () {
        createConfetti();
      }, 150);
    }
  } else {
    stopConfetti();
  }
}
function stopConfetti() {
  if (confetti) {
    clearInterval(confetti);
    confetti = null;
  }
  $(".confetti").remove();
}
function goHome(actualPage) {
  stopConfetti();
  stopInterval();
  currentText = 0;
  $(".flipped").removeClass("flipped");
  $("#modalEndQuiz").removeClass("active");

  if (actualPage.toLowerCase() == "team") {
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

    setTimeout(() => {
      loadIntro();
    }, 100);
  } else if (actualPage.toLowerCase() == "quiz") {
    const containerQuiz = $("#container-quiz");
    const containerIndex = $("#container-index");

    const cardQuiz = $("#card-quiz");
    const cardIndex = $("#card-index");

    containerQuiz.css("display", "none");
    containerIndex.css("display", "");

    cardQuiz.removeClass("page-in");
    cardQuiz.removeClass("page-out");

    cardIndex.removeClass("page-in");
    cardIndex.removeClass("page-out");

    cardQuiz.addClass("page-out");
    cardIndex.addClass("page-in");

    currentText = 0;

    setTimeout(() => {
      loadIntro();
    }, 100);
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

    setTimeout(() => {
      loadIntro();
    }, 100);
  }
}

$("#redirectFullFigma, #redirectFigmaReto").on("click", () => {
  window.location.href =
    "https://www.figma.com/design/Ukmyr87dnhrV4wcsDsPHFs/Memorizo?node-id=6-1419&t=zWgpAXYRgDiykEzZ-1";
});

$(document).ready(() => {
  loadIntro();
});
jQuery.fn.removeClassExcept = function (val) {
  return this.each(function () {
    $(this).removeClass().addClass(val);
  });
};

document.querySelectorAll(".team-member-card").forEach((card) => {
  card.addEventListener("click", function () {
    this.classList.toggle("flipped");
  });
});

$("#btn-open-modal-linkedin").on("click", function () {
  $("#modalLinkedIn").addClass("active");
});

$("#btn-close-modal-linkedin").on("click", function () {
  $("#modalLinkedIn").removeClass("active");
});

$("#btn-open-modal-quiz").on("click", function () {
  $("#modalEndQuiz").addClass("active");
});

$("#btn-close-modal-quiz").on("click", function () {
  $("#modalEndQuiz").removeClass("active");
});
