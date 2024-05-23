var buttonPartern = [];
var playerPartern = [];
var level = 0;
var started = false;
var colorList = ["green", "red", "yellow", "blue"];
var highscore = localStorage.getItem("highscore") || 0;
$("#highscore").text("Highscore: " + highscore);
//Press Enter to start
$(document).on("keypress", function (event) {
  if (event.which == 13) {
    if (!started) {
      $("#level-title").text("level " + level);
      nextLevel();
      started = true;
    }
  }
});
//Set event on press keyboard
$(document).on("keyup", function (event) {
  if (
    event.key === "q" ||
    event.key === "w" ||
    event.key === "a" ||
    event.key === "s"
  ) {
    switch (event.key) {
      case "q":
        var playerChooseColor = "green";
        break;
      case "w":
        var playerChooseColor = "red";
        break;
      case "a":
        var playerChooseColor = "yellow";
        break;
      case "s":
        var playerChooseColor = "blue";
        break;
    }
    playSound(playerChooseColor);
    pressAnimation(playerChooseColor);
    playerPartern.push(playerChooseColor);
    checkAnswer(playerPartern.length - 1);
  } else return;
});
//Set event on click for button
$(".btn").click(getPlayerChoose);
//Save player choose to Array
function getPlayerChoose() {
  var playerChooseColor = $(this).attr("id");
  playSound(playerChooseColor);
  pressAnimation(playerChooseColor);
  playerPartern.push(playerChooseColor);
  checkAnswer(playerPartern.length - 1);
}
//Play Sound
function playSound(buttonColor) {
  var buttonSound = new Audio("./sounds/" + buttonColor + ".mp3");
  buttonSound.play();
}

//Press Animation
function pressAnimation(buttonColor) {
  $("." + buttonColor).addClass("pressed");
  setTimeout(function () {
    $("." + buttonColor).removeClass("pressed");
  }, 100);
}
//Increase Level
function nextLevel() {
  playerPartern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNum = Math.floor(Math.random() * 4);
  buttonPartern.push(colorList[randomNum]);
  $("#" + colorList[randomNum])
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(colorList[randomNum]);
}

//Compare
function checkAnswer(currentLevel) {
  if (playerPartern[currentLevel] === buttonPartern[currentLevel]) {
    if (playerPartern.length === buttonPartern.length) {
      setTimeout(function () {
        nextLevel();
      }, 1000);
    }
  } else {
    playSound("wrong"); //Game Over
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Enter to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    gameOver();
  }
}

function gameOver() {
  if (highscore < level) {
    highscore = level - 1;
    localStorage.setItem("highscore", highscore);
  }
  level = 0;
  buttonPartern = [];
  started = false;
  $("#highscore").text("Highscore: " + highscore);
}
