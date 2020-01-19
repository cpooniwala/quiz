//Questions
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        correct: "C"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correct: "C"
    },
    {
        title: "Inside which HTML element do we put the JavaScript? ____.",
        choices: ["script", "javascript", "scripting", "js"],
        correct: "A"
    },
    {
        title: "What is the correct syntax for referring to an external script called? ____.",
        choices: ["script src='xxx.js'", "script href='xxx.js'", "script name='xxx.js'", "script type='xxx.js'"],
        correct: "A"
    },
    {
        title: "How do you create a function in JavaScript? ____.",
        choices: ["function = myFunction()", "function myFunction()", "function::myFunction()", "function.myFunction()"],
        correct: "B"
    }
]

//Grab Elements from HTML
var startText = document.getElementById("start-text")
var questionContainerElement = document.getElementById("question-container")
var nextButton = document.getElementById("next-btn")
var startButton = document.getElementById("start-btn")
var questionElement = document.getElementById("question")
var answerButtons =  document.getElementById("answer-buttons")
var answerA = document.getElementById("A")
var answerB = document.getElementById("B")
var answerC = document.getElementById("C")
var answerD = document.getElementById("D")
var correctElement = document.getElementById("response-correct")
var wrongElement = document.getElementById("response-wrong")
var time = document.getElementById("timer")

//Create Variables
var runningQuestionIndex = 0;
var lastQuestionIndex = questions.length - 1;
var questionTime = 15;
var stopTimer;

//Create Event Listeners
startButton.addEventListener('click', startGame)

function startGame(){
    startButton.classList.add("hide")
    questionContainerElement.classList.remove("hide")
    renderQuestion()
    stopTimer = setInterval(renderTimer, 1000);
}

function renderTimer () {
    questionTime--;
    time.innerHTML = questionTime;
    if (questionTime === 0){
        endGame();
    }
}


function renderQuestion(){
    questionElement.innerHTML = questions[runningQuestionIndex].title;
    answerA.innerHTML = questions[runningQuestionIndex].choices[0];
    answerB.innerHTML = questions[runningQuestionIndex].choices[1];
    answerC.innerHTML = questions[runningQuestionIndex].choices[2];
    answerD.innerHTML = questions[runningQuestionIndex].choices[3];
}

function checkAnswer(answer){
    console.log(answer)
    if(questions[runningQuestionIndex].correct === answer){
        answerIsCorrect()
    }

    else{
        answerIsWrong()
    }

    if(runningQuestionIndex < lastQuestionIndex){
        runningQuestionIndex++;
        renderQuestion()
    }
    else{
        endGame();
    }
}
 
function answerIsCorrect() {
    correctElement.classList.remove("hide")
    questionTime += 5;
    renderQuestion()
}

function answerIsWrong() {
    wrongElement.classList.remove("hide")
    questionTime-= 5;
    renderQuestion(stopTimer);
}


function endGame(){
    clearInterval(stopTimer);
    console.log("game has ended");
} 