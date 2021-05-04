const btns = document.querySelectorAll('.btn')
const btn1 = document.querySelector('.btn1')
const btn2 = document.querySelector('.btn2')
const btn3 = document.querySelector('.btn3')
const btn4 = document.querySelector('.btn4')
const btnsContainer = document.querySelector('.btn-container')
const startBtn = document.querySelector('#start')
const level = document.querySelector('#level')
const winEl = document.querySelector('#win')
const milli100 = 500;

//Start the game
startBtn.addEventListener('click', start)

//computer pattern choices
let pattern = [btn1, btn2, btn3, btn4]

let randomPattern = pattern.sort(() => Math.random() - 0.5)

let patternClicks = pattern.length

//Tracks players selections and btn clicks
let playerPattern = []
let playerClicks = 0

//Shows the computer pattern that the player must copy
function runPattern(order, time) {
    //plays pattern array
    btnFlash(order[0])
    setTimeout(() => {
        btnFlash(order[1])
    }, milli100)
    setTimeout(() => {
        btnFlash(order[2])
    }, milli100*2)
    setTimeout(() => {
        btnFlash(order[3])
    }, milli100*3)
    //adds selected class
    //removes selected class
}

//button flashes when computer selects it
function btnFlash(btn) {
    btn.classList.add('selected')
    setTimeout(() => {
        btn.classList.remove('selected')
    }, milli100)
}

//Adds playerClick to all game buttons
btns.forEach(btn => btn.addEventListener('click', playerClick))

//Adds players selections to playerPattern
function playerClick(e) {
    console.log(playerPattern)
    e.target.classList.add('userSelect')
    setTimeout(() => {
        e.target.classList.remove('userSelect')
    }, 500)
    playerClicks += 1
    playerPattern.push(e.target)
    if(playerClicks === patternClicks) {
        result()
    }
}

//Result compares playerPattern input to pattern
//if arrays are same, win
    //next level
//if arrays are different, lose
    //game over
function result() {
    console.log(playerPattern)
        let result1 = (arr1, arr2) => {
            for(let i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) return false;
            }
            return true
        }
        //Need to make pattern dynamic. 
    if(result1(playerPattern, pattern)) {
        winEl.innerHTML = `
        <h1>You win!!!</h1>
        `
        nextLevel()
    } else {
        winEl.innerHTML = `
        <h1>You lose</h1>
        `
    }
}


//Called by result() if winning condition met
//Resets DOM elements and starts next level
function nextLevel() {
    let currentLevel = parseInt(level.innerText)
    console.log(pattern)
    setTimeout(() => {
        let newPattern = pattern.sort(() => Math.random() - 0.5)
        runPattern(newPattern)
        winEl.innerHTML = ''
        level.innerText = currentLevel + 1
        pattern = newPattern
        playerPattern = []
        playerClicks = 0
    }, 3000)
}

//starts the game when start button clicked
function start() {
    setTimeout(() => {
        runPattern(randomPattern, 1)
    }, 1000)
}

// function randomFlash() {
//     let randNum = Math.floor(Math.random() * 4) + 1
//     btns[randNum].classList.add('selected')
// }

// randomFlash()

//Things to do:
//Make pattern dynamic in result() so next level has correct win condition
//runPattern() - loop through to allow more buttons in pattern

//result() compare arrays should be higher order func, every?
//pattern - make array of array. pattern in functions should become patterns[0], etc

//runPattern() space between repeated buttons in pattern