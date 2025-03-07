const questions = [
    {
        image: "assets/game/persona_1.jpg",
        correct: "Carlos",
        options: ["Carlos", "Luis", "Miguel"]
    },
    {
        image: "assets/game/persona_2.jpg",
        correct: "Macarena",
        options: ["Sofia", "Marta", "Macarena"]
    },
    {
        image: "assets/game/persona_3.jpg",
        correct: "Borja",
        options: ["Adrian", "Borja", "Daniel"]
    },
    {
        image: "assets/game/persona_1.jpg",
        correct: "Laura",
        options: ["Sara", "Laura", "Carla"]
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

