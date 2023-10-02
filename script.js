const questions = [
    {
        question: "Who is the first man to go to space ?",
        answers: ["Neil Armstrong","Rakesh Sharma","Yuri Gagarin","Raja Chari"],
        correctAnswer: "Yuri Gagarin"
    },
    {
        question: "Which of the following is the capital city of Spain?",
        answers: ["London", "Berlin", "Madrid", "Paris"],
        correctAnswer: "Madrid"
    },
    {
        question: "What is the highest mountain situated in India?",
        answers: ["Mt.Everest", "Nilagiri Hills", "K2-Godwin", "Kanchanajanga"],
        correctAnswer: "Kanchanajanga"
    },
    {
        question: "What is the largest bone in the human body ?",
        answers: ["Humerus", "Femur", "Sphenoid", "Stapes"],
        correctAnswer: "Femur"
    },
    {
        question: "Which gas holds more percentage from the atmosphere?",
        answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Nitrogen"
    }
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const answersContainer = document.querySelector(".answers");

const nextButton = document.getElementById("next-button");
const feedback = document.getElementById("feedback");
const timerDisplay = document.getElementById("timer-display");
const startQuizButton = document.getElementById("start-quiz-button");
const rulesContainer = document.querySelector(".rules-container");
const quizContainer = document.querySelector(".quiz-container");

const totalTimePerQuestionInSeconds = 20;
let timeRemainingInSeconds = totalTimePerQuestionInSeconds;
let timerInterval;

// Initialize the buttons

quizContainer.style.display = "none";

// Event listeners for navigation buttons


nextButton.addEventListener("click", goToNextQuestion);
startQuizButton.addEventListener("click", () => {
    startQuiz();
});

timerDisplay.textContent = formatTime(timeRemainingInSeconds);

function startTimer() {
    timeRemainingInSeconds = totalTimePerQuestionInSeconds;
    timerDisplay.textContent = formatTime(timeRemainingInSeconds);

    timerInterval = setInterval(() => {
        timeRemainingInSeconds--;
        timerDisplay.textContent = formatTime(timeRemainingInSeconds);

        if (timeRemainingInSeconds === 0) {
            clearInterval(timerInterval);
            goToNextQuestion();
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `Time remaining ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function startQuiz() {
    rulesContainer.style.display = "none";
    quizContainer.style.display = "block";
    displayQuestion();
    startTimer();
}



function goToNextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const userAnswer = selectedAnswer.value;
        const correctAnswer = questions[currentQuestion].correctAnswer;
        if (userAnswer === correctAnswer) {
            score++;
        }
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
        hideFeedback();
        clearInterval(timerInterval); // Clear the current timer interval
        startTimer(); // Start a new timer for the next question
    } else {
        displayFinalScore();
    }

    if (selectedAnswer) {
        selectedAnswer.checked = false;
    }
}



function hideFeedback() {
    feedback.textContent = "";
}

function updateButtonState() {
    prevButton.disabled = currentQuestion === 0;
}

function displayQuestion() {
    const current = questions[currentQuestion];

    questionText.textContent = `Question ${currentQuestion + 1}: ${current.question}`;

    answersContainer.innerHTML = "";
    current.answers.forEach((answer, index) => {
        const label = document.createElement("label");
        label.innerHTML = `
            <input type="radio" name="answer" value="${answer}"> ${String.fromCharCode(65 + index)}. ${answer}
        `;
        answersContainer.appendChild(label);
    });
   
    

    const backgroundImages = [

        "./images/blue1.jpeg",
        "./images/magenta2.jpg",
        "./images/black3.jpg",
        "./images/purple4.jpg",
        "./images/brown5.jpg"
    ];

    document.body.style.backgroundImage = `url(${backgroundImages[currentQuestion]})`;
    document.body.style.backgroundSize = "fill";

    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "Submit and View Score";
    } else {
        nextButton.textContent = "Save and Next";
    }
}

function displayFinalScore() {
    document.body.style.backgroundImage = `url('./images/thanks.jpg')`;
    timerDisplay.style.display="none";

    nextButton.style.display = "none";
    questionText.textContent = `We like to inform that you have completed the quiz succesfully !!!! Your Score: ${score} out of ${questions.length}`;
    answersContainer.innerHTML = "";
    prevButton.style.display = "none";
    feedback.textContent = "";

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    answersContainer.appendChild(restartButton);
}

// Initial display
displayQuestion();
