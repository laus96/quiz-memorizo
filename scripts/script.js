/*const questions = [
    {
        image: "persona1.jpg",
        correct: "Laura",
        options: ["Carlos", "Laura", "Ana", "Pedro"]
    },
    {
        image: "persona2.jpg",
        correct: "Pedro",
        options: ["Luis", "Marta", "Pedro", "Sofía"]
    }
];

let currentQuestion = 0;

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        document.getElementById("question").innerText = "¡Trivia completada!";
        document.getElementById("image").classList.add("hidden");
        document.getElementById("options").classList.add("hidden");
        document.getElementById("qr-container").classList.remove("hidden");
        return;
    }

    const questionData = questions[currentQuestion];
    document.getElementById("image").src = questionData.image;
    document.getElementById("options").innerHTML = "";

    questionData.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(option);
        document.getElementById("options").appendChild(button);
    });
}

function checkAnswer(answer) {
    if (answer === questions[currentQuestion].correct) {
        currentQuestion++;
        loadQuestion();
    } else {
        alert("Incorrecto, intenta de nuevo.");
    }
}

loadQuestion();
*/

let currentText = 0;
let currentQuestion = 0;

const text_Memo = [
  "¡Hola! Soy Memo, el miembro principal de este equipo.",
  "¡Para conseguir el enlance a Figma tendrás que completar mi reto!",
  "¿Sabrás decirme el nombre de todos mis compañeros?",
];

const image_Memo = [
    "assets/icons/memo_Hola.png",
    "assets/icons/memo_feliz.png",
    "assets/icons/memo_Pensando.png",
  ];

function loadText(){

    document.getElementById("memo_Bubble").innerHTML = text_Memo[currentText];
    //$( "#speech_Memo" ).addClass( "animate__animated animate__bounce" );
    $("#memo").attr("src",image_Memo[currentText]);
    $( "#memo" ).addClass( "animate__animated animate__bounce" );
    /*$("#btn_back").css({ display: "none" });*/

    if (currentText == 0){
        $("#btn_Back").removeClass("btn_round_gray");
        $("#btn_Back").addClass("btn_round_disabled");
    } else {
        $("#btn_Back").removeClass("back_disabled");
        $("#btn_Back").addClass("btn_round_disabled");
    }

    if(currentText < text_Memo.length - 1){
        $("#btn_empezar").css({ display: "none" });
        $("#btn_Next").css({ display: "" });
    } else {
        
        $("#btn_Next").css({ display: "none" });
        $("#btn_empezar").css({ display: "" });
    }

}
function next() {
  currentText++;
  //$( "#speech_Memo" ).removeClass( "animate__animated animate__bounce" );
  $( "#memo" ).removeClass( "animate__animated animate__bounce" );

  if (currentText < text_Memo.length) {
    setTimeout(function(){
        loadText();
    }, 100);
  }else{
    currentText = text_Memo.length -1;

}
}

function back() {
    currentText--;
    $( "#memo_Speech" ).removeClass( "animate__animated animate__bounce" );
    $( "#memo" ).removeClass( "animate__animated animate__bounce" );
  
    if (currentText >= 0 ) {
      setTimeout(function(){
          loadText();
      }, 100);
    } else{
        currentText = 0;
    }
  }
