var buttonColours = ["green", "red", "yellow", "blue"];
var gameStarted = false;

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var highScore = 0;

// User clicks to start
$(".btn").on("click", function() {
    var userBtnId = $(this).attr("id");
    
    $("#" + userBtnId).fadeOut(100).fadeIn(100);

    userClickedPattern.push(userBtnId);

    playSound(userBtnId);
    animatePress(userBtnId);

    console.log(userClickedPattern); // DEBUG 🐜

    ctdwnStart();
});

// Countdown after the user clicks
function ctdwnStart() {

    if (gameStarted == false) {

        $("#level-title").text("Get ready...");
        $("#level-title").after("<h2 id='ctdwn'></h2>");
        $("#ctdwn").css({fontFamily: "'Press Start 2P', cursive", color: "white"});

        var timeLeft = 3;
        var timer = setInterval(function() {

            if (timeLeft == 0) {
                $("#ctdwn").text("Start!");
                var audio1 = new Audio("sounds/blip2.wav");
                audio1.play();

                setTimeout(function() {
                    $("#ctdwn").text("Stage " + level);
                    nextSequence();
                }, 1000);

                timeLeft -= 1;

            } else if (timeLeft > 0) {
                $("#ctdwn").text(timeLeft + "");
                var audio = new Audio("sounds/blip1.wav");
                audio.play();
            }

            timeLeft -= 1;
        }, 1000);
        gameStarted = true;
        console.log("gameStarted = " + gameStarted); // DEBUG 🐜
    } else {
        checkAnswer(userClickedPattern.length-1);
    }

}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        $("#ctdwn").text("Correct!");

        var audio = new Audio("sounds/bell1.wav");
        audio.play();

        setTimeout(function() {
            $("#ctdwn").text("Stage " + level);
        }, 1500)

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                highScore++;
                nextSequence();
            }, 1000)
        }
    } else {

        var audio1 = new Audio("sounds/wrong.mp3");
        audio1.play();

        gameOver();
    }
}

function gameOver() {

    var msgs = ["You did your best! Keep going!", "You can always do better!",
                "Keep going!", "You always improve at each try!", "You know you can get better!"];

    var randomMsg = Math.floor(Math.random() * msgs.length);
    var chosenMsg = msgs[randomMsg];

    $("body").addClass("game-over");
    $("#level-title").text("GAME OVER");
    $("#ctdwn").text("" + chosenMsg);
    $("#ctdwn").after("<h2 id='high-score'></h2>");
    $("#high-score").text("High Score: " + highScore);

    resetGame();

}

function resetGame() {

    setTimeout(function() {
        $("#ctdwn").remove();
        $("#high-score").remove();
        $("#level-title").text("Press A Key to Start");
        $("body").removeClass("game-over");
        gameStarted = false;

        gamePattern = [];
        userClickedPattern = [];

        level = 0;
    }, 4000)

}

// ----------------NEXT SEQUENCE----------------
function nextSequence() {

    console.log("nextSequence() has been called"); // DEBUG 🐜

    userClickedPattern = [];
    level++;
    $("#ctdwn").text("Stage " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    console.log(gamePattern); // DEBUG 🐜

}

// ----------------PLAY SOUND----------------
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

// ----------------ANIMATE EACH PRESS----------------
function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);

}