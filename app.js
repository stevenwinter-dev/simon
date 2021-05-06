const btns = document.querySelectorAll('.btn')
const btn1 = document.querySelector('.btn1')
const btn2 = document.querySelector('.btn2')
const btn3 = document.querySelector('.btn3')
const btn4 = document.querySelector('.btn4')
const btnsContainer = document.querySelector('.btn-container')
const startBtn = document.querySelector('#start')
const levelSpan = document.querySelector('#level')
const winEl = document.querySelector('#win')
const levelEl = document.querySelector('#level-container')
const cardPicker = document.querySelector('.card-picker')
const deckContainer = document.querySelector('.deck-container')
const milli100 = 500;

//Start the game
startBtn.addEventListener('click', start)

//computer pattern choices
let pattern = [btn1, btn2, btn3, btn4]

let randomPattern = pattern.sort(() => Math.random() - 0.5)

let patternClicks = randomPattern.length

//Tracks players selections and btn clicks
let playerPattern = []
let playerClicks = 0
let level = 1

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
    
    setTimeout(() => {
        if(level === 2) {
            btnFlash(order[4])
        }  
    }, milli100*4)
    setTimeout(() => {
        if(level === 3) {
            btnFlash(order[4])
            btnFlash(order[5])
        }  
    }, milli100*5)
    setTimeout(() => {
        if(level === 4) {
            btnFlash(order[4])
            btnFlash(order[5])
            btnFlash(order[6])
        }  
    }, milli100*6)
    
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
        let result1 = (arr1, arr2) => {
            for(let i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) return false;
            }
            return true
        } 
    if(result1(playerPattern, pattern)) {
        winEl.innerHTML = `
        <h2>You win!!!</h2>
        `
        //prolly add win function here with if statement. make level global variable
        nextLevel()
    } else {
        winEl.innerHTML = `
        <h2>You lose</h2>
        `
    }
}


//Called by result() if winning condition met
//Resets DOM elements and starts next level
function nextLevel() {
    youWin()
    setTimeout(() => {
        showCardChoices()
    
    if (cardArr.length === level) {
        setTimeout(() => {
            levelChange()
            hideCardChoices()
            fetching()
        }, 3000); /* Timer until next level starts, after card picked*/
    } else {
        setTimeout(() => {
            nextLevel()
        }, 500) /* Timer to check if card has been picked */
    }
    }, 2000); /* Timer until cardChoices shown */
    
}

function levelChange() {
    pattern.push(pattern[Math.floor(Math.random())*pattern.length])
    let newPattern = pattern.sort(() => Math.random() - 0.5)
    level += 1
    setTimeout(() => {
        runPattern(newPattern)
        winEl.innerHTML = ''
        levelSpan.innerText = level
        pattern = newPattern
        patternClicks = newPattern.length
        playerPattern = []
        playerClicks = 0
    }, 2000)
}

function youWin() {
    if(level === 5) {
        levelEl.remove()
        winEl.remove()
        btnsContainer.innerHTML = `
        <h1>You Win!</h1>
        `
    }
}

//starts the game when start button clicked
function start() {
    setTimeout(() => {
        runPattern(randomPattern, 1)
    }, 1000)
    startBtn.remove()
}
//143-176 commented out for phone data
async function fetching() {
    fetch('https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/classic', {
    headers: {
        "x-rapidapi-key": "8f0f6fa807mshfb295bf6d28f26ap1b675djsnda08c4e1eaa1",
	    "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
	    "useQueryString": true
    }    
})
    .then(res => res.json())
    .then(data => {
        createCard(data)
        createCard(data)
        createCard(data)
    })
}

fetching()
function createCard(data) {
    const randNum = Math.floor(Math.random() * 388)
    if(data[randNum].img) {
        const cardChoice = document.createElement('div')
        cardChoice.addEventListener('click', pickCard)
        cardChoice.classList.add('card')
        cardChoice.innerHTML = `
            <img src="${data[randNum].img}" alt="">
        `
        cardPicker.append(cardChoice)
        cardPicker.style.display = 'none'
    } else {
        createCard(data)
    }
}
let cardArr = []

function pickCard(e) {
    const card = e.target
    cardArr.push(card)
    card.classList.add('added')
}

function showCardChoices() {
    cardPicker.style.display = 'flex'
}

function hideCardChoices() {
    cardPicker.style.display = 'none'
    cardPicker.innerHTML = ''
}

function showDeck() {
    deckContainer.style.display = 'flex'
}



// Add repeat btns by expanding the pattern array
// function newLevel() {
//     pattern.push(btn1, btn2, btn1, btn2)
//     console.log(pattern)
// }

//Things to do:
//runPattern() - loop through to allow more buttons in pattern

//result() compare arrays should be higher order func, every?

//runPattern() space between repeated buttons in pattern

// function runPat(pat) {
//     const num = pat.length
//     console.log(pat)
//     for(i = 0; i < num; i++) {
//     setTimeout(() => {
//         for(i = 0; i < num; i++) {
//             console.log(pat[i])
//         }
//     }, milli100 * i)
// }
// }
// runPat(pattern)