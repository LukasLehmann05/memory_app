import '../styles/style.scss'

import { getFromLocalStorage } from './storage'
import { Card } from './classes/card'
import { returnCardPair } from './theme_data';

declare global {
    interface Window {
        toggle_card: typeof toggle_card;
    }
}

let starterTheme :string |null
let starterPlayer
let starterSizeRaw
let starterSize :number

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
    let cardPairs :string[] = returnCardPair(starterSize / 2, starterTheme)
    for (let i = 0; i < cardPairs.length; i++) {
        new Card(starterTheme,cardPairs[i] , `${i}`)
        new Card(starterTheme,cardPairs[i] , i + "_back")
    }

    if (starterSize > 16) {
        document.getElementById("card_container")?.classList.add("grid-big")
    }
}

function toggle_card(id :string) {
    document.getElementById(id)?.classList.toggle("flip-card")
}

if (document.body.classList.contains("body-board")) {
    window.addEventListener("DOMContentLoaded", initBoard)
}

window.toggle_card = toggle_card