console.log("hello");

//console.log is friend

//this are all the get elements, to retrieve information from within the js and from the html and also to fuction like a bridge between the two of them 
const question = document.getElementById("question");
const choices= Array.from(document.getElementsByClassName("fixed-text"));
console.log(choices);
const progressMetric=document.getElementById("progressMetric");
const scoreText=document.getElementById("score");
const filledBar=document.getElementById("filledBar");
const timerDisplay=document.getElementById("timerDisplay");

//this are the beginning variables at the start of the game 

let currentQuestion={}
let acceptingAnswers= false;
let score= 0;
let questionCounter= 0;
let availableQuestions=[]

//here we can find the questions, but it works as an object array

let questions = [
    
    {
    question: "Ash is 10 years old, but how many years of experience does he have? ",
    choice1: "More than 20",
    choice2:"Less than 1",
    choice3:"Between 1-5",
    choice4:"Between 6-10",
    answer: 1
},

{
    question: "Which is the first Pokemon in the Pokedex?",
    choice1: "Pikachu",
    choice2:"Mewtoo",
    choice3:"Bulbasaur",
    choice4:"Charmander",
    answer: 3
},

{
    question: "Which was the first Pokemon Game",
    choice1: "Pokemon Red and Blue",
    choice2:"Pokemon Yellow",
    choice3:"Pokemon FireRed and LeafGreen ",
    choice4:"Pokemon Red and Green",
    answer: 4
},

{
    question: "Which of this is not a Pokemon",
    choice1: "Rayquaza",
    choice2:"WarGreymon",
    choice3:"Alcremie",
    choice4:"Pyukumuku",
    answer: 2
},

{
    question: "Pikachu is the most famous pokemon, but who is the runner up?",
    choice1: "Charizard",
    choice2:"Charmander",
    choice3:"Eevee",
    choice4:"Pichu",
    answer: 1
},

]

// Timer function
const startTimer = (duration) => {
    let timer = duration;
    timerInterval = setInterval(() => {
      const seconds = timer % 60;
      const displaySeconds = seconds < 10 ? "0" + seconds : seconds;
      timer--;
      timerDisplay.innerText = `${displaySeconds}s`;
      if (timer < 0) {
        clearInterval(timerInterval);
               blocker();
      }
    }, 1000);
  };

//these are the points you get with every question so you get a 100/100 max and we have max number of questions: 5. 
const POINTS=20;
const  NUMBEROFQUESTIONS=5;

const resetTimer = (duration) => {
    clearInterval(timerInterval); // Clear any existing timer interval

    let timer = duration;
    timerDisplay.innerText = `${timer}s`;

    timerInterval = setInterval(() => {
        timer--;
        const seconds = timer % 60;
        const displaySeconds = seconds < 10 ? "0" + seconds : seconds;
        timerDisplay.innerText = `${displaySeconds}s`;
        if (timer <= 0) {
            clearInterval(timerInterval);
            acceptingAnswers = false;
            getNewQuestion();
        }
    }, 1000);
};


//this is the main function
startGame=()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[...questions]; //this creates a new array called availableQuestions and assigns it the values of the questions array(object). The spread operator (...) is used to create a shallow copy of the questions array
    console.log(availableQuestions) //consolelog is still friend
    startTimer(10);
    getNewQuestion();
}


/*with this function  we get a random question with the math.floor and math random variables
later if we finished all the available questions we go to the results screen where you can see how much you payed attention 20 years ago
we also increment the question counter and with this we fill up the bar with every new question.

we also have an splice function to remove the questions we already used 
*/
getNewQuestion=()=>{

    if (availableQuestions.length===0||questionCounter>=NUMBEROFQUESTIONS){
        localStorage.setItem("mostRecentScore",score);
        return window.location.assign("./results.html");
    };
    resetTimer(10);
    questionCounter++;
    progressMetric.innerText="Question: "+questionCounter+"/"+NUMBEROFQUESTIONS;

   //console.log((questionCounter/NUMBEROFQUESTIONS)*100)
   filledBar.style.width = `${(questionCounter / NUMBEROFQUESTIONS) * 100}%`;


    const questionIndex= Math.floor(Math.random()*availableQuestions.length);
    currentQuestion=availableQuestions[questionIndex];
    question.innerText=currentQuestion.question;
    
    choices.forEach(choice=>{
        const number=choice.dataset['number'];
        choice.innerText=currentQuestion['choice'+number]
    })

    availableQuestions.splice(questionIndex,1);
    acceptingAnswers=true;

};

/* this is an event listener which reacts if you select a wrong or correct answer 
we use a timeout to give a pause between every question
*/
choices.forEach(choice=>{
    choice.addEventListener("click",e=>{
        
        if(!acceptingAnswers) return;

        acceptingAnswers=false;
        const selectedChoice = e.target;
        const selectedAnwswer = selectedChoice.dataset["number"];

        let classToApply = "wrong";
        if(selectedAnwswer==currentQuestion.answer){
            classToApply="correct"
        }
        console.log(classToApply)


        if(classToApply=="correct"){
            incrementScore(POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(()=> {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        } ,1000);
      
        
        console.log(selectedAnwswer==currentQuestion.answer);


    });

    });

incrementScore=num=>{
    score+=num;
    scoreText.innerText=score;
}




startGame()