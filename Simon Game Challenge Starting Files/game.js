let userClickedPattern = []

let started = false
let level = 0

//Step 1
let gamePattern = []

let buttonColour = ["red", "blue", "green", "yellow"]

// let randomChosenColour = nextSequence()

// console.log(buttonColour[randomChosenColour])


function nextSequence (randomNumber) {
    userClickedPattern = []
    level++

    $("h1").text(`Level ${level}`)

    randomNumber = Math.floor(Math.random() * 4)//(4 instead of 3) no instead from 0 to n since we are in arrays
    randomChosenColour = buttonColour[randomNumber]
    // return randomNumber

    //Randomly selecting the colour and adding it to the gamePattern array 
    gamePattern.push(randomChosenColour)
    // console.log(gamePattern)
    
    //Step 2
    // Animating the button that was randomly selected
    // Using jQuery to select the button and animate it
    $(`#${randomChosenColour}`).animate({opacity: 0.1}, 100, function () {
        $(this).animate({opacity: 1}, 100)
    })
    
    playSound(randomChosenColour)
    animatePress(randomChosenColour)

    console.log(userClickedPattern)
}

//Step 4
$(".btn").on("click", function () {
    let userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)//Adding to the new array

    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)
})

//Step 5
function playSound (name) {
    //Step 3
    //for each color selected we add the sound attached to it 
    let audio = new Audio(`./sounds/${name}.mp3`)
    audio.play()
}

//Step 6
//function that animate the button clicked 
//The current colour is selected and the class pressed is added and after 100milliseconds is removed
function animatePress (currentColour) {
    $(`#${currentColour}`).addClass("pressed")
    setTimeout(function () {
        $(`#${currentColour}`).removeClass("pressed")
    }, 100)
}


//Step 7-Start the Game
$(document).on("keypress", function (e) {
    console.log(e.key)
    if(e.key === 'a' && !started) {
        $("h1").text(`Level ${level}`)
        nextSequence()
        start = true
    }
}) 

//Step 8
function checkAnswer (currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {//using the parameter instead of the length of those arrrays
        console.log("success")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000)
        }
    } else {
        console.log("Wrong")
        //Step 9: Game Over
        playSound('wrong')
        $("body").addClass("game-over")
        
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)
        
        $("#level-title"). text("Game Over, Press Any Key to Restart")
        
        startOver()
        
    }
}

//Step 10 Resetting level, gamePattern, stared
function startOver () {
    level = 0;
    gamePattern = []
    started = false

    $("body").on("keypress", function () {
        if (!started) {
            $("#level-title").text(`Level ${level}`)
            nextSequence()
            started = true
        }
    })
}