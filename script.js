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
var doneMessage = document.getElementById("done-message")
var scoreMessage = document.getElementById("score-message")
var initialsLabel = document.getElementById("initials-label")
var initialsTextbox = document.getElementById("initials-textbox")
var initialsButton = document.getElementById("initials-btn")
var initialsError = document.getElementById("error-message")
var highScoreElement = document.getElementById("high-score")
var initials = document.getElementById("user-initials")
var userScore = document.getElementById("user-score")
var highScoreButton = document.getElementById("view-highscores")
var highScoreResults = document.getElementById("high-score-results")

//Create Variables
var runningQuestionIndex = 0;
var lastQuestionIndex = questions.length - 1;
var questionTime = 75;
var stopTimer;
var clearInitials;

//Create Event Listeners
startButton.addEventListener('click', startGame)
initialsButton.addEventListener('click',submitScore)
highScoreButton.addEventListener('click',viewHighScores)

//Function to Start the Game
function startGame(){
    time.innerHTML = 75;
    questionTime=75;
    runningQuestionIndex = 0;
    lastQuestionIndex = questions.length - 1;
    time.classList.remove("hide")
    startButton.classList.add("hide")
    //startButton.classList.remove("btn")
    //startButton.classList.remove("btn-primary")
    highScoreElement.classList.add("hide")
    questionContainerElement.classList.remove("hide")
    clearInitials = initialsTextbox.value="";
    renderQuestion()
    stopTimer = setInterval(renderTimer, 1000);
}

//Function to Create the Timer
function renderTimer () {
    questionTime--;
    time.innerHTML = questionTime;
    if (questionTime === 0){
        endGame();
    }
}

//Function to Display the appropriate Question
function renderQuestion(){
    //correctElement.classList.add("hide")
    //wrongElement.classList.add("hide")
    questionElement.innerHTML = questions[runningQuestionIndex].title;
    answerA.innerHTML = questions[runningQuestionIndex].choices[0];
    answerB.innerHTML = questions[runningQuestionIndex].choices[1];
    answerC.innerHTML = questions[runningQuestionIndex].choices[2];
    answerD.innerHTML = questions[runningQuestionIndex].choices[3];
}

//Function to check if the answer is correct or incorrect
function checkAnswer(answer){
    //console.log(answer)
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
 
//Function to perform next steps if user response is correct
function answerIsCorrect() {
    correctElement.classList.add("text-success")
    correctElement.classList.remove("hide")
    setTimeout(function (){
        correctElement.classList.add("hide")
    },1000)
    questionTime += 5;
    renderQuestion()

}

//Function to perform next steps if user response is incorrect
function answerIsWrong() {
    wrongElement.classList.remove("hide")
    wrongElement.classList.add("text-danger")
    setTimeout(function (){
        wrongElement.classList.add("hide")
    },1000)
    questionTime-= 5;
    renderQuestion(stopTimer);
}

//Actions to perform if the game has ended
function endGame(){
    scoreMessage.innerHTML="Your Score is "+ questionTime;
    clearInterval(stopTimer);
    //console.log("game has ended");
    questionContainerElement.classList.add("hide")
    correctElement.classList.add("hide")
    wrongElement.classList.add("hide")
    timer.classList.add("hide")

    doneMessage.classList.remove("hide")
    scoreMessage.classList.remove("hide")
    initialsLabel.classList.remove("hide")
    initialsTextbox.classList.remove("hide")
    initialsButton.classList.remove("hide")
}

//Actions to Perform when the user selects the Submit CTA
function submitScore(){
    var initialsValue = document.getElementById("initials-textbox").value;
    if(initialsValue===""){
        initialsError.classList.add("text-warning")
        initialsError.classList.remove("hide")
    }
    else{
        localStorage.setItem("initials", initialsValue);
        localStorage.setItem("score", questionTime);
        highScore()
    }
}

//Actions to display the high score
function highScore() {
    doneMessage.classList.add("hide")
    scoreMessage.classList.add("hide")
    initialsLabel.classList.add("hide")
    initialsTextbox.classList.add("hide")
    initialsButton.classList.add("hide")
    initialsError.classList.add("hide")

    startButton.classList.remove("hide")
    //startButton.classList.add("btn")
    //startButton.classList.add("btn-primary")
    highScoreElement.classList.remove("hide")
    var lastInitials = localStorage.getItem("initials");
    var lastScore = localStorage.getItem("score");
    console.log(lastInitials, lastScore);
    var newDiv = document.createElement("div")
    newDiv.classList.add("card-body");
    highScoreResults.appendChild(newDiv);
    var initialsSpan = document.createElement("span");
    var scoreSpan = document.createElement("span");
    scoreSpan.classList.add("badge");
    scoreSpan.classList.add("badge-info");
    newDiv.appendChild(initialsSpan);
    newDiv.appendChild(scoreSpan);
    initialsSpan.textContent = lastInitials;
    scoreSpan.textContent = lastScore;
}    

//Actions to perform when the user selects the view high score CTA
function viewHighScores(){
    startButton.classList.remove("hide")
    //startButton.classList.add("btn")
    //startButton.classList.add("btn-primary")
    highScoreElement.classList.remove("hide")
    
    timer.classList.add("hide");
    questionContainerElement.classList.add("hide")
    doneMessage.classList.add("hide")
    scoreMessage.classList.add("hide")
    initialsLabel.classList.add("hide")
    initialsTextbox.classList.add("hide")
    initialsButton.classList.add("hide")
    initialsError.classList.add("hide")
    correctElement.classList.add("hide")
    wrongElement.classList.add("hide")

    clearInterval(stopTimer);
}