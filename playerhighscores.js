//this is a mini code to retrieve the highscore array and assing it to a constant, then we parse it as json, setting an array and empty array just in case there is nothing.
//we use the map funcstion to retun a list of the highscores, we are using values from the results.js like trainer level and id.

const highScoresList=document.getElementById("highScoresList");
const highScores=JSON.parse(localStorage.getItem("highScores"))||[];
console.log(highScores);


highScoresList.innerHTML =
    highScores.map(score=>{
        return `<li class="high-score">${score.trainerID} - ${score.trainerLevel}</li>`;
    }).join("");