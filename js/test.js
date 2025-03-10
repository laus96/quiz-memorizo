let currentQuestionIndex = 0;

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

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const questionTextElement = $("#questionText");
  const questionImageElement = $("#questionImage");
  const questionNumberElement = $("#questionNumber");

  questionTextElement.text(currentQuestion.questionText);
  questionNumberElement.text(currentQuestionIndex + 1);
  questionImageElement.attr("src", currentQuestion.imageUrl);

  const optionElements = document.querySelectorAll(".option");
  optionElements.forEach((option, index) => {
    option.classList.remove("option");
    option.textContent = currentQuestion.options[index];
    option.onclick = () =>
      handleAnswerSelection(option, currentQuestion.options[index]);
    option.classList.add("option");
  });

  updateProgressBar();
}

function handleAnswerSelection(selectedOption, selectedAnswer) {
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.correctAnswer) {
    selectedOption.classList.add("correct");
    $("#feedback").text("¡Muy bien!");
    $("#feedback").css("display", "inline-block");
    $("#feedback").addClass("correct-answer");
    setTimeout(() => {
      selectedOption.classList.remove("correct", "wrong");
      $("#feedback").css("display", "none");
      $("#feedback").removeClass("correct-answer");
      loadNextQuestion();
    }, 1200);
  } else {
    selectedOption.classList.add("wrong");
    $("#feedback").text("¡Vuelve a intentarlo!");

    $("#feedback").css("display", "inline-block");
    $("#feedback").addClass("try-again");

    setTimeout(() => {
      selectedOption.classList.remove("correct", "wrong");
      $("#feedback").css("display", "none");
      $("#feedback").removeClass("try-again");
    }, 1200);
  }
}

function loadNextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    //triggerInfiniteConfetti();
    updateProgressBar();
    setTimeout(() => {
      $("#felicidades").trigger("click");
    }, 1000);
  }
}

function updateProgressBar() {
  const progressPercentage = (currentQuestionIndex / questions.length) * 100;
  document.getElementById("progress").style.width = progressPercentage + "%";
}

loadQuestion();
