const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText =document.getElementById('progressText');
const scoretext = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let avaiableQuestions = [];

let questions = [];
fetch("questions.json")
    .then(res => {
    return res.json();
})
    .then(loadedQuestions => {
    console.log(loadedQuestions);
    questions = loadedQuestions;
    startGame();
})
.catch(err => {
    console.error(err);
});



//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    avaiableQuestions = [...questions];
    //console.log(avaiableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if(avaiableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore",score);
        // go to the end page 
        return window.location.assign("/end.html");
    }

    questionCounter++;
    //console.log(questionCounter);
    progressText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;
    // update the progressbar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100 }%`;

    const questionIndex = Math.floor(Math.random() * avaiableQuestions.length);
    currentQuestion = avaiableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });
    avaiableQuestions.splice(questionIndex,1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        //console.log(e.target);
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        /*const classToApply = 'incorrect';
        if (selectedAnswer === currentQuestion.answer){
            classToApply ='correct';
        } */
        //console.log(selectedAnswer,currentQuestion.answer);
        const classToApply = 
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        //console.log(selectedAnswer);
        if(classToApply == "correct") {
            incrementScore(CORRECT_BONUS);
        };

        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout( () => {            
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000);               
    });
});

incrementScore = num =>{
    score += num;
    scoretext.innerText = score;
};

