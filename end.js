const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

username.addEventListener ("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    Console.log("Clicked the Save Button");
    e.preventDefault();
}