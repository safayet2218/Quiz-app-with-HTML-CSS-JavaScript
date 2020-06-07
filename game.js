const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText =document.getElementById('questionCounter');
const scoretext = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let avaiableQuestions = [];

let questions = [
    {
        question: "Inside which HTML element do we put the Javascript ??",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scriptiong>",
        answer: 1
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js '?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src ='xxx.js'>",
        choice4: "<script file ='xxx.js>",
        answer: 3
    },
    {
        question: "How do you write 'Hello World' in an alert box ?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
    }
];


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
        // go to the end page 
        return window.location.assign("/end.html");
    }

    questionCounter++;
    console.log(questionCounter);
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

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

startGame();