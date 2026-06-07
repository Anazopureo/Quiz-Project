// questions and anwers
const questions  = [
    {
        question : "What are the colors on the Nigeria's flag?",
        answers: [ 
            {text : "Red, White, and blue", correct: false},
            {text: "Green, and White", correct: true},
            {text: "Red, and White" , correct: false},
            {text: "Brown",  correct: false}
        ],
    },

    {
        question : "Where is the capital city for Nigeria?",
        answers : [ 
            {text : "Jos", correct: false},
            {text: "Niger", correct: false},
            {text: "Abuja", correct: true},
            {text: "Ikeja",  correct: false}
        ],

    },

    {
        question : "How Presidents has been on seat since Independence?",
        answers: [ 
            {text: "14", correct: true},
            {text : "16", correct: false},
            {text: "8" , correct: false},
            {text: "15",  correct: false}
        ],
    },

    {
        question : "What was the name of the first Uiversity in Nigeria?",
        answers: [ 
            {text : "Obafemi Awolowo University", correct: false},
            {text: "University of Lagos" , correct: false},
            {text: "University of Ibadan", correct: true},
            {text: "University of Ilorin",  correct: false}

        ],
        },

    {
        question : "What is the longest river in Nigeria?",
        answers: [ 
            {text : "Benue River", correct: false},
            {text: "Niger River", correct: true},
            {text: "Gongola River" , correct: false},
            {text: "Sokoto River",  correct: false}
        ],
        },

    {
        question : "Where is the confluence town?",
       answers : [ 
            {text : "Osogbo", correct: false},
            {text: "Lokoja", correct: true},
            {text: "Ilesa" , correct: false},
            {text: "Ikeja",  correct: false}
        ],
        },

    {
        question : "How many federal universities are there?",
       answers : [ 
            {text : "48", correct: false},
            {text: "35" , correct: false},
            {text: "46",  correct: false},
            {text: "52", correct: true}
        ],
        },

    {
        question : "Where is the center for excellence?",
        answers: [ 
            {text : "Osun", correct: false},
            {text: "Lagos", correct: true},
            {text: "Sokoto" , correct: false},
            {text: "Kaduna",  correct: false}
        ],
        },

    {
        question : "What is the tallest building in Nigeria??",
        answers: [ 
            {text: "NECOM house", correct: true},
            {text : "Azuri Towers", correct: false},
            {text: "WTC Tower" , correct: false},
            {text: "Champagne Pearl Tower",  correct: false}
        ],
        },
 
    {
        question : "Which state has the largest gold deposit in Nigeria?",
        answers : [ 
            {text : "Osun", correct: false},
            {text: "Zamfara ", correct: true},
            {text: "Port Harcourt" , correct: false},
            {text: "Ondo",  correct: false}
        ],
        },
]

// Constants
const startPage = document.getElementById("start-page");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn")
const nextBtn = document.getElementById("next-btn")
const quizScreen = document.getElementById("quiz-screen");
const username = document.getElementById("username");
const questionNumberEl = document.getElementById("question-number");
const timerEl = document.getElementById("timer");
const optionBtnEl = document.getElementById("option-btn");
const questionEl = document.getElementById("question");
const restartScreen = document.getElementById("restart-screen");
const resultMsg = document.getElementById("result-msg");
const welcomeMsg = document.getElementById("welcome-msg");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highscore");


const userName = document.getElementById("username")

// Variable for later use
let timer;
let timeLeft = 30;
let currentQuestionIndex = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

// Define Buttons
startBtn.addEventListener("click", startQuiz);
startBtn.addEventListener("click", () => {
    const userNameValue = userName.value;
    welcomeMsg.textContent = `Weclome ${userNameValue}, Let's get started`;
});

restartBtn.addEventListener("click", homePage);
nextBtn.addEventListener("click", nextQuestion);

// function for homepage
function homePage(){
    startPage.classList.remove("hidden");
    quizScreen.classList.add("hidden");
    restartScreen.classList.add("hidden");

    if(score > highScore){
        highScore = score;
        localStorage.setitem("highScore", highScore);
     }

     highScoreEl.textContent = highScore;
}

// function for quiz screen
function startQuiz(){

    currentQuestionIndex = 0;
    score = 0;

    quizScreen.classList.remove("hidden");
    quizScreen.classList.add("align");
    restartScreen.classList.add("hidden");
    startPage.classList.add("hidden")
    
    loadQuestion();
}

// function for Timer
function startTimer(){
    clearInterval(timer);

    timeLeft = 30;
    timerEl.textContent = timeLeft;

    timer = setInterval(()=> {
        timeLeft--;
        timerEl.innerText = timeLeft;
        if(timeLeft === 0){
            nextQuestion();
        }
    }, 1000);
}


function loadQuestion(){
    startTimer();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionEl.innerHTML = questionNumber+ ". " + currentQuestion.question;
    questionNumberEl.innerText = questionNumber;

    optionBtnEl.innerHTML="";
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("option");
        button.classList.add("btn")
        optionBtnEl.appendChild(button);
// what would happen when an option is clicked
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", pickAnswer)
    });
    nextBtn.style.display = "none";
}

function pickAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        scoreEl.textContent = score;
       
    }else{
        selectedBtn.classList.add("incorrect");
    }
    // uncomment to show answer if option checked is wrong
    // Array.from(optionBtnEl.children).forEach(button => {
    //     if(button.dataset.correct === "true"){
    //         button.classList.add("correct")
    //     }
    //     button.disabled = true;
    // });

    


    nextBtn.style.display = "block";
}



function nextQuestion(){
    currentQuestionIndex++;
    welcomeMsg.classList.add("hidden");
    if(currentQuestionIndex < questions.length){
       loadQuestion()
    }else{
        endQuiz()
    };
}

function endQuiz(){

    quizScreen.classList.add("hidden");
    quizScreen.classList.remove("align")
    startPage.classList.add("hidden");
    restartScreen.classList.remove("hidden");

     if(score > highScore){
        highScore = score;
        localStorage.setitem("highScore", highScore);
     }

     highScoreEl.textContent = highScore;

     if(score >= 8){
        resultMsg.textContent = "Congrations, You know Nigeria Well";
     }
     else if(score >= 5){
        resultMsg.textContent = "Impressive, you can do better";
     }
     else{
        resultMsg.textContent = "Try Again";
     }

}

