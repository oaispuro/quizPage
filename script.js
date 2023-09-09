const questionContainer = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")
const restartButton = document.getElementById("restart-btn")
const resultDiv = document.getElementById("result")

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
    {
        question: "What is the best candidate for a web developer job?",
        answers: [
            {text: "Octavio Aispuro", correct: true},
            {text: "Lord Voldemort", correct: false},
            {text: "Donkey", correct: false},
            {text: "Tony Tony Chopper", correct: false},
        ]
    },
    {
        question: "What does the c stand for in E=mc^2?",
        answers: [
            {text: "Correlation", correct: false},
            {text: "Coherence", correct: false},
            {text: "The speed of sound", correct: false},
            {text: "The speed of light", correct: true},
        ]
    },
    {
        question: "These are all ways to decrease page load time, except...",
        answers: [
            {text: "Image optimization", correct: false},
            {text: "Reload the page", correct: true},
            {text: "Browser cache", correct: false},
            {text: "Compress and optimize content", correct: false},
        ]
    },
    {
        question: "What does git push do?",
        answers: [
            {text: "Upload content from local repository to a remote repository", correct: true},
            {text: "Undo local changes to the state of a Git repo", correct: false},
            {text: "Fetch and download content from a remote repository", correct: false},
            {text: "View the changes made to a file", correct: false},
        ]
    },
    {
        question: "What is the virtual DOM?",
        answers: [
            {text: "A new version of a website", correct: false},
            {text: "A different version of a website", correct: false},
            {text: "The lightweight version of the real DOM that React retains in memory", correct: true},
            {text: "None of the above", correct: false},
        ]
    }
]

startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
}