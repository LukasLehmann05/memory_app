import '../styles/style.scss'

import { addToLocalStorage, getFromLocalStorage } from './storage'
import { Card } from './classes/card'
import { returnCardPair } from './theme_data';
import { returnPlayerIcon } from './theme_data';
import { returnCodeVibe } from './theme_data';

declare global {
    interface Window {
        toggle_card: typeof toggle_card;
    }
}

let starterTheme: string | null
let starterPlayer: string
let starterSizeRaw
let starterSize: number

let openCards: HTMLElement[] = []
let lockedCards: HTMLElement[] = []

let currentPlayer = "blue"

let pointsBlue = 0
let pointsOrange = 0
let winner: string

const ICONHEADER = document.getElementById("player_icon") as HTMLImageElement | null
const POINTS_BLUE = document.getElementById("points_blue")
const POINTS_ORANGE = document.getElementById("points_orange")

function initBoard() {
    getBoardData()
    buildBoard()
}

function getBoardData() {
    let data = getFromLocalStorage()

    starterTheme = data[0]
    starterPlayer = data[1]
    currentPlayer = starterPlayer
    starterSizeRaw = data[2]
    getStarterSize(data[2])
    setPlayerIcon()
}

function getStarterSize(size: string | null) {
    switch (size) {
        case "s":
            starterSize = 16
            break;
        case "m":
            starterSize = 24
            break;
        case "l":
            starterSize = 36
            break;
        default:
            starterSize = 16
            break;
    }
}

function setPlayerIcon() {
    if (starterTheme == "code-vibe" && ICONHEADER) {
        if (currentPlayer == "blue") {
            currentPlayer = "orange"
            ICONHEADER.src = returnCodeVibe()[0]
        } else if (currentPlayer == "orange" && ICONHEADER) {
            currentPlayer = "blue"
            ICONHEADER.src = returnCodeVibe()[1]
        }
    } else {
        if (ICONHEADER) {
            ICONHEADER.src = returnPlayerIcon()
        }
    }
}

function buildBoard() {
    let cardPairs: string[] = returnCardPair(starterSize / 2, starterTheme)
    for (let i = 1; i < cardPairs.length; i++) {
        new Card(starterTheme, cardPairs[i], `${i}`)
        new Card(starterTheme, cardPairs[i], i + "_back")
    }

    if (starterSize > 16) {
        document.getElementById("card_container")?.classList.add("grid-big")
    }

    initPlayerIcon()
}

function initPlayerIcon() {
    if (starterTheme !== "code-vibe") {
        if (starterPlayer == "blue") {
            if (ICONHEADER) {
                ICONHEADER.classList.add("player-blue")
            }
        } else {
            if (ICONHEADER) {
                ICONHEADER.classList.add("player-orange")
            }
        }
    }
}

function toggle_card(id: string) {
    let card = document.getElementById(id)
    if (card && !lockedCards.includes(card)) {
        openCards.push(card)
        card?.classList.toggle("flip-card")

        if (openCards.length == 2) {
            checkCardMatch()
        }
    }
}

function checkCardMatch() {
    const FIRST_CARD: HTMLElement = openCards[0]
    const SECOND_CARD: HTMLElement = openCards[1]
    const firstBackImage = FIRST_CARD.querySelector<HTMLImageElement>(".card__face--back")
    const secondBackImage = SECOND_CARD.querySelector<HTMLImageElement>(".card__face--back")

    if (firstBackImage && secondBackImage) {
        const IS_MATCH = firstBackImage.getAttribute("src") === secondBackImage.getAttribute("src")
        if (IS_MATCH) {
            cardMatch()
        } else {
            cardsNotMatch()
        }
    }

    nextPlayer()
}

function cardMatch() {
    lockedCards.push(openCards[0])
    lockedCards.push(openCards[1])

    openCards = []

    awardPoint()
    checkForGameEnd()
}

function cardsNotMatch() {
    setTimeout(() => {
        openCards.forEach(card => {
            card.classList.toggle("flip-card")
        });

        openCards = []
    }, 500);
}

function awardPoint() {
    if (currentPlayer == "blue") {
        pointsBlue += 1
        if (POINTS_BLUE) {
            POINTS_BLUE.innerText = pointsBlue.toString()
        }
    } else {
        pointsOrange += 1
        if (POINTS_ORANGE) {
            POINTS_ORANGE.innerText = pointsOrange.toString()
        }
    }
}

function nextPlayer() {
    setTimeout(() => {
        if (starterTheme == "code-vibe") {
            setPlayerIcon()
        } else {
            if (currentPlayer == "blue") {
                currentPlayer = "orange"
                ICONHEADER?.classList.add("player-orange")
                ICONHEADER?.classList.remove("player-blue")
            } else {
                currentPlayer = "blue"
                ICONHEADER?.classList.remove("player-orange")
                ICONHEADER?.classList.add("player-blue")
            }
        }
    }, 300);
}

function setWinner() {
    if (pointsBlue > pointsOrange) {
        winner = "blue"
    } else if (pointsBlue < pointsOrange) {
        winner = "orange"
    } else {
        winner = "draw"
    }
}

function checkForGameEnd() {
    if (starterSize === lockedCards.length) {
        setWinner()
        addToLocalStorage("points_blue", pointsBlue.toString())
        addToLocalStorage("points_orange", pointsOrange.toString())
        addToLocalStorage("winner", winner)
        if (starterTheme) {
            addToLocalStorage("starter_theme", starterTheme)
        }


        setTimeout(() => {
            window.location.href = "../html/endscreen.html"
        }, 2000);
    }
}

if (document.body.classList.contains("body-board")) {
    window.addEventListener("DOMContentLoaded", initBoard)
}

window.toggle_card = toggle_card