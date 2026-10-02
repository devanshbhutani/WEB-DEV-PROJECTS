const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0; // index of the current question
let score = 0;
let answersDisabled = false; // to prevent multiple answers being selected

totalQuestionsSpan.textContent = quizQuestions.length; // set total questions in the UI using above array 
maxScoreSpan.textContent = quizQuestions.length; // set max score in the UI using above array

// event listeners
startButton.addEventListener("click", startQuiz); // when the start button is clicked, call the startQuiz function
restartButton.addEventListener("click", restartQuiz); // when the restart button is clicked, call the restartQuiz function

function startQuiz() {   
  // reset vars
  currentQuestionIndex = 0; 
  score = 0;
  scoreSpan.textContent = 0; // reset score in the UI

  startScreen.classList.remove("active"); // hide start screen
  quizScreen.classList.add("active"); // show quiz screen

  showQuestion(); // show the first question
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex]; // get the current question object from the quizQuestions array

  currentQuestionSpan.textContent = currentQuestionIndex + 1; // set current question number in the UI (index + 1 because index starts at 0)

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100; // calculate the progress percentage based on the current question index and total number of questions
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question; // set the question text in the UI

  answersContainer.innerHTML = ""; // clear previous answers and create new answer buttons for the current question

  currentQuestion.answers.forEach((answer) => { // loop through the answers array of the current question object
    const button = document.createElement("button"); // create a button element for each answer
    button.textContent = answer.text; // set the button text to the answer text
    button.classList.add("answer-btn"); // add a class to the button for styling
    // classlist.add() is a method that adds a class to the button element, in this case "answer-btn" is added to the button element for styling purposes
    // in this project the "answer-btn" class is used to style the answer buttons in the quiz, for example, it can be used to set the background color, font size, padding, etc. of the buttons

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct; // set a data attribute on the button element to indicate whether the answer is correct or not, this is used later to check if the selected answer is correct or not 
    // how? it will check the value of the data attribute when the button is clicked, if the value is "true" then the answer is correct, if the value is "false" then the answer is incorrect
    // here it will check the array of answers for the current question object, and  see the correct property of each answer object, if the correct property is true then it will set the data attribute to "true", if the correct property is false then it will set the data attribute to "false" 

    button.addEventListener("click", selectAnswer); // add an event listener to the button element that listens for a click event, when the button is clicked it will call the selectAnswer function and pass the event object as an argument

    answersContainer.appendChild(button);  // append the button element to the answers container in the UI, this will display the answer buttons on the screen for the user to select from
    // appendChild() is a method that adds a child element to a parent element, in this case it will add the button element to the answers container element
    // in this project the answers container is a div element that contains all the answer buttons for the current question, when the user selects an answer it will check if the answer is correct or not and then show the next question or the results screen so here it will add the button element to the answers container so that the user can see the answer buttons on the screen and select one of them
  });
}

function selectAnswer(event) { // event is the event object that is passed to the function when the button is clicked, it contains information about the event, such as the target element that was clicked


  // optimization check
  if (answersDisabled) return; // if answersDisabled is true, it means that the user has already selected an answer and we don't want to allow them to select another answer, so we return from the function and do nothing

  answersDisabled = true; 

  const selectedButton = event.target; // get the button element that was clicked from the event object, event.target is a property of the event object that refers to the element that triggered the event, in this case it will be the button element that was clicked
  const isCorrect = selectedButton.dataset.correct === "true"; // check if the selected answer is correct by checking the value of the data attribute on the button element, if the value is "true" then the answer is correct, if the value is "false" then the answer is incorrect

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) { // if the button is the one that was clicked and it is not correct, then we add the "incorrect" class to it 
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => { // setTimeout is a built-in JavaScript function that allows you to execute a function after a specified amount of time (in milliseconds) has passed, in this case it will wait for 1 second (1000 milliseconds) before executing the function that shows the next question or the results screen
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active"); // hide quiz screen
  resultScreen.classList.add("active"); // show result screen

  finalScoreSpan.textContent = score; // set final score in the UI

  const percentage = (score / quizQuestions.length) * 100; // calculate the percentage of correct answers based on the score and total number of questions

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active"); // hide result screen

  startQuiz(); // restart the quiz by calling the startQuiz function
}