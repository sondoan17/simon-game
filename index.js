$(document).on("keypress", function () {
  if (!started) {
    $("#level-title").text("level " + level);
    nextLevel();
    started = true;
  }
});
var buttonPartern = [];
var playerPartern = [];
var level = 0;
var started = false;
var colorList = ["green", "red", "yellow", "blue"];
$(".btn").click(function () {
  var playerChooseColor = $(this).attr("id");
  playSound(playerChooseColor);
  pressAnimation(playerChooseColor);
  playerPartern.push(playerChooseColor);
  checkAnswer(playerChooseColor.length - 1);
});

function playSound(buttonColor) {
  var buttonSound = new Audio("./sounds/" + buttonColor + ".mp3");
  buttonSound.play();
}
function pressAnimation(buttonColor) {
  $("." + buttonColor).addClass("pressed");
  setTimeout(function () {
    $("." + buttonColor).removeClass("pressed");
  }, 100);
}
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
function checkAnswer(currentLevel) {
  if (playerPartern[currentLevel] === buttonPartern[currentLevel]) {
    if (playerPartern.length === buttonPartern.length) {
      setTimeout(function () {
        nextLevel();
      }, 1000);
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      gameOver();
    }
  }
}

function gameOver() {
  level = 0;
  buttonPartern = [];
  started = false;
}
