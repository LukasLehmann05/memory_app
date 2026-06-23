import '../styles/style.scss'

import { getFromLocalStorage } from './storage'
import { Card } from './classes/card'
import { returnCardPair } from './theme_data';

declare global {
    interface Window {
        toggle_card: typeof toggle_card;
    }
}

let starterTheme: string | null
let starterPlayer
let starterSizeRaw
let starterSize: number

let openCards: HTMLElement[] = []
let lockedCards: HTMLElement[] = []

function initBoard() {
    getBoardData()
    buildBoard()
}

function getBoardData() {
    let data = getFromLocalStorage()

    starterTheme = data[0]
    starterPlayer = data[1]
    starterSizeRaw = data[2]
    getStarterSize(data[2])
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

function buildBoard() {
    let cardPairs: string[] = returnCardPair(starterSize / 2, starterTheme)
    for (let i = 0; i < cardPairs.length; i++) {
        new Card(starterTheme, cardPairs[i], `${i}`)
        new Card(starterTheme, cardPairs[i], i + "_back")
    }

    if (starterSize > 16) {
        document.getElementById("card_container")?.classList.add("grid-big")
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
}

function cardMatch() {
    lockedCards.push(openCards[0])
    lockedCards.push(openCards[1])

    openCards = []
}

function cardsNotMatch() {
    setTimeout(() => {
        openCards.forEach(card => {
            card.classList.toggle("flip-card")
        });

        openCards = []
    }, 500);
}

if (document.body.classList.contains("body-board")) {
    window.addEventListener("DOMContentLoaded", initBoard)
}

window.toggle_card = toggle_card