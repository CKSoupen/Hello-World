
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;
var plays = 1;

$(document).keypress( function(){
    //invokes first part of game sequence
    if(!started)
    {
        $('#level').text("level " + level);
        nextSequence();
        started = true;
        $('#restart').text("");
    }
});


$('.gamepad').click( function(){
    var userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userPattern.length - 1);
    });

function checkAnswer (currentLevel){
    
    
    if(gamePattern[currentLevel]===userPattern[currentLevel])
    {
        if(userPattern.length === gamePattern.length)
        {
            setTimeout(function()
            {
                //invokes all consecutive parts of game sequence
                nextSequence();

            }, 1000);
            console.log("Game pattern: " + gamePattern);
            console.log("User pattern: " +  userPattern);
        }   

    }  
    else
    {
        playSound('wrong');

        $('body').addClass('game-over');

        $('#level').text("GAME OVER");

        $('#restart').text(" PRESS ANY KEY TO RESTART");
        $('#games-played').text("No. of games played: " + plays);
        setTimeout(function()
            {
                $('body').removeClass('game-over');
            }, 200);

                startOver();
                plays++;
    }
}


function nextSequence(){
    userPattern = [];
    level++;
    $('#level').text("level " + level); 

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}


    
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $('#' + currentColour).addClass('pressed');

    setTimeout(function(){
        $('#' + currentColour).removeClass('pressed');

    }, 100);
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}