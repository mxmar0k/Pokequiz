

//this are de variables that we got from the results.html which will be used in the next lines
const trainerID=document.getElementById("trainerID");
const saveScoreButton=document.getElementById('saveScoreButton');
const trainerResult= document.getElementById("trainerResult");
const mostRecentScore = localStorage.getItem("mostRecentScore");


//we have a max array of scores, so it will log the hightest 5
const MAX_HIGH_SCORES=5;

//this retrieves the highscores and converted into a json string, we used an "or" condition to display an empty array in case it does not work
const highScores=JSON.parse(localStorage.getItem("highScores"))||[];
console.log(highScores);

//console log is always friend

trainerResult.innerText="Trainer Level: "+mostRecentScore;//we display this into the html


//the save button is disabled till the trainer id form is filled

trainerID.addEventListener('keyup',()=>{
    saveScoreButton.disabled=!trainerID.value;
    console.log(trainerID.value)
});


//as stated before, we only need to save the 5 highest earners, so we used a function to replace the lowest with the highest until we have 5, and then it will replace the lowest
//we used json strings to 



saveHighScore = e => {
    console.log("Clicked the save button!");
    e.preventDefault();//we have a function to save the score with an event button, we use console log because it helps a lot, and we prevented the default action from ocurring

//here we created an object with properties of trainer level and id, at the end of the function we save the highscores to the local storage, and finally we redirect us to the begining, like when you were young and Cartoon Network started pokemon from ep. 1 and you were in season 5 (screams). 
const score = {
    trainerLevel: mostRecentScore,
    trainerID: trainerID.value
};
highScores.push(score);

highScores.sort((a,b)=>b.trainerLevel-a.trainerLevel);

highScores.splice(5)

localStorage.setItem("highScores", JSON.stringify(highScores))
window.location.assign("./index.html")

console.log(highScores);

}