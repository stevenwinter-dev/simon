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
const header = document.querySelector('header')
const headerTitle = document.querySelector('header h1')
const headerSub = document.querySelector('header h2')
const main = document.querySelector('main')
const footer = document.querySelector('footer')
const instructionContainer = document.querySelector('.instruction-container')
const readyBtn = document.querySelector('#ready')
const time = 500

let pattern = [btn1, btn2, btn3, btn4]
let randomPattern = pattern.sort(() => Math.random() - 0.5)
let patternClicks = randomPattern.length
let playerPattern = []
let playerClicks = 0
let level = 1
let isPlayingPattern = false
let cardArr = []

//Game ready
readyBtn.addEventListener('click', ready)

function ready() {
    instructionContainer.remove()
    btns.forEach(btn => btn.style.display='block')
}

//Start the game
startBtn.addEventListener('click', start)

function start() {
    setTimeout(() => {
        runPattern(randomPattern)
    }, 1000)
    startBtn.remove()
}

//Shows the computer pattern that the player must copy
function runPattern(order) {
    isPlayingPattern = true
    btnFlash(order[0])
    setTimeout(() => {
        btnFlash(order[1])
    }, time)
    setTimeout(() => {
        btnFlash(order[2])
    }, time*2)
    setTimeout(() => {
        btnFlash(order[3])
        isPlayingPattern = false
    }, time*3)
    setTimeout(() => {
        if(level === 2) {
            btnFlash(order[4])
            isPlayingPattern = false
        }  
    }, time*4)
    setTimeout(() => {
        if(level === 3) {
            setTimeout(() => {
                btnFlash(order[4])    
            }, time)
            setTimeout(() => {
                btnFlash(order[5])
                isPlayingPattern = false
            }, time * 2)
        }  
    }, time*3.2)
    setTimeout(() => {
        if(level === 4) {
            setTimeout(() => {
                btnFlash(order[4])    
            }, time)
            setTimeout(() => {
                btnFlash(order[5])
            }, time * 2)
            setTimeout(() => {
                btnFlash(order[6])
                isPlayingPattern = false
            }, time * 3)
        }  
    }, time*3.2)
    setTimeout(() => {
        if(level === 5) {
            setTimeout(() => {
                btnFlash(order[4])    
            }, time)
            setTimeout(() => {
                btnFlash(order[5])
            }, time * 2)
            setTimeout(() => {
                btnFlash(order[6])
            }, time * 3)
            setTimeout(() => {
                btnFlash(order[6])
                isPlayingPattern = false
            }, time * 4)  
        }  
    }, time*3.2)
}

//button flashes when computer selects it
function btnFlash(btn) {
    btn.classList.toggle('selected')
    setTimeout(() => {
        btn.classList.toggle('selected')
    }, time/4)
}

//Adds playerClick to all game buttons
btns.forEach(btn => btn.addEventListener('click', playerClick))

//Adds players selections to playerPattern
function playerClick(e) {
    if(!isPlayingPattern) {
        e.target.classList.add('userSelect')
        setTimeout(() => {
            e.target.classList.remove('userSelect')
        }, 150)
        playerClicks += 1
        playerPattern.push(e.target)
        if(playerClicks === patternClicks) {
            result()
        }
    }
}

//Result compares playerPattern input to pattern
function result() {
    let result1 = (arr1, arr2) => {
        for(let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true
    } 
    if(result1(playerPattern, pattern)) {
        winEl.innerHTML = `
        <h2>Great job!</h2>
        `
        nextLevel()
    } else {
        winEl.innerHTML = `
            <h2>You lose</h2>
            <button class='start' id='playAgain'><i class="far fa-play-circle"></i></button>
            <p>Play again?</p>
        `
        const playAgain = document.querySelector('#playAgain')
        playAgain.addEventListener('click', function() {
            location.reload()
        })
    }
}

//Called by result() if winning condition met
function nextLevel() {
    if(level !== 5) {
        setTimeout(() => {
            showCardChoices()
            if (cardArr.length === level) {
                setTimeout(() => {
                    levelChange()
                    hideCardChoices()
                    fetching()
                }, time) /* Timer until next level starts, after card picked */
            } else {
                setTimeout(() => {
                    nextLevel()
                }, time * 2) /* Timer to check if card has been picked */
            }
        }, 1000) /* Timer until cardChoices shown */
    } else {
        youWin()
    }
}

//Resets DOM and makes a new pattern
function levelChange() {
    pattern.push(pattern[Math.floor(Math.random())*pattern.length])
    let newPattern = pattern.sort(() => Math.random() - 0.5)
    level += 1
    hideDeck()
    setTimeout(() => {
        runPattern(newPattern)
        winEl.innerHTML = ''
        levelSpan.innerText = level
        pattern = newPattern
        patternClicks = newPattern.length
        playerPattern = []
        playerClicks = 0
    }, 3000)
}

//Shows the win screen and ends the game
function youWin() {
    if(level === 5) {
        showCardChoices()
        setTimeout(() => {
            cardArrFunc()
            showDeck()
            hideCardChoices()
            cleanUp()
            const gameOver = document.createElement('div')
            gameOver.classList.add('winScreen')
            gameOver.innerHTML = `
                <h1>You Win!</h1>
                <h2>Here's your deck!</h2>
                <p>Play again?</p>
                <button class='start' id='playAgain'><i class="far fa-play-circle"></i></button>
            `
            main.append(gameOver)
            const playAgain = document.querySelector('#playAgain')
            playAgain.addEventListener('click', function() {
                location.reload()
            })
        }, 5000)  
    }
}

//Removes DOM elements for win screen
function cleanUp() {
    levelEl.remove()
    winEl.remove()
    btnsContainer.remove()
    header.classList.add('bg-overlay')
    main.classList.add('bg-overlay')
    footer.classList.add('bg-overlay')
    headerTitle.style.opacity = '0'
    headerSub.style.opacity = '0'
}

//Fetch API data and creates 3 random cards
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

//Creates a random card from the API data
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

//Adds the selected card to the players deck
function pickCard(e) {
    const card = e.target
    cardArr.push(card.src)
    card.classList.add('added')
}

//Displays the card choices
function showCardChoices() {
    cardPicker.style.display = 'flex'
}

//Hides the card choices
function hideCardChoices() {
    cardPicker.style.display = 'none'
    cardPicker.innerHTML = ''
}

//Shows the players deck
function showDeck() {
    deckContainer.style.display = 'flex' 
}

//Hides the players deck
function hideDeck() {
    deckContainer.style.display = 'none'
}

//Populates the DOM with the players deck card images
function cardArrFunc() {
    cardArr.forEach((card) => {
        if(!deckContainer.firstElementChild){
        deckContainer.innerHTML += `
            <img src="${card}" alt="">
        ` 
        } else if(deckContainer.lastElementChild.childNodes) {
            if(deckContainer.lastElementChild.src !== card) {
                deckContainer.innerHTML += `
                    <img src="${card}" alt="">
                `  
            }
        }
    })
}

//Cheat
headerTitle.addEventListener('click', function() {
    playerPattern = pattern
    result()
})