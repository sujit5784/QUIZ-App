const questions =[
    {
        question:"Who is the Father of HTML?",
        answers:[
            {text: "Dennis M.Ritchie", correct: false},
            {text: "Tim Berners_Lee", correct: true},
            {text: "Brendan Eich", correct: false},
            {text: "Bjarne Stroustrup", correct: false},
        ]
    },
   {
    question:"HTML Developed in _____.",
    answers:[
        {text: "1970", correct: false},
        {text: "1989", correct: false},
        {text: "1990", correct: false},
        {text: "1993", correct: true},
    ]
   },
   {
    question:"Who is the Father of CSS?",
    answers:[
        {text: "Tim Berners_Lee", correct: false},
        {text: "Brendan Eich", correct: false},
        {text: "Hakon Wium Lie", correct:true},
        {text: "Bjarne Stroustrup", correct: false},
    ]
   },
   {
    question:"CSS Developed in _____.",
    answers:[
        {text: "1994", correct: true},
        {text: "1965", correct: false},
        {text: "1950", correct: false},
        {text: "1993", correct: false},
    ]
   },
   {
    question:"Who is the father of JavaScript?",
    answers:[
        {text: "jarne Stroustrup", correct: false},
        {text: "Brendan Eich", correct: true},
        {text: "Dennis M.Ritchie", correct: false},
        {text: "Tim Berners_Lee", correct: false},
    ]
   },
   {
    question:"JavaScript Developed in _____.",
    answers:[
        {text: "1994", correct: false},
        {text: "1995", correct: true},
        {text: "1996", correct: false},
        {text: "1993", correct: false},
    ]
   }
   
   
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score =0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){

    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}


function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
   
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();