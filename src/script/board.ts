import '../styles/style.scss'

/**
 * Board page entry module.
 * Builds the memory board, manages turns, and handles match scoring.
 */

import { addToLocalStorage, getFromLocalStorage } from './storage'
import { Card } from './classes/card'
import { returnCardPair } from './theme_data';
import { returnPlayerIcon } from './theme_data';
import { returnCodeVibe } from './theme_data';
import { returnPawnIcons } from './theme_data';

declare global {
    interface Window {
        toggle_card: typeof toggle_card;
        openOverlay: typeof openOverlay;
        closeOverlay: typeof closeOverlay;
        quitGame: typeof quitGame;
    }
}

let starterTheme: string | null
let starterPlayer: string
let starterSizeRaw
let starterSize: number

const OPENCARDS: HTMLElement[] = []
const LOCKEDCARDS: HTMLElement[] = []

let currentPlayer = ""

let pointsBlue = 0
let pointsOrange = 0
let winner: string
const DEVMODE = false

const ICONHEADER = document.getElementById("player_icon") as HTMLImageElement | null
const POINTS_BLUE = document.getElementById("points_blue")
const POINTS_ORANGE = document.getElementById("points_orange")
const OVERLAY = document.getElementById("board_overlay") as HTMLDialogElement

/**
 * Initializes board state and theme-specific styling.
 */
function initBoard() {
    getBoardData()
    buildBoard()

    setPlayerPointIcons()
    styleBoardBody()
    styleBoardHeader()
    styleOverlay()
}

/**
 * Reads persisted settings and applies initial player state.
 */
function getBoardData() {
    let data = getFromLocalStorage()

    starterTheme = data[0]
    starterPlayer = data[1]
    currentPlayer = starterPlayer
    starterSizeRaw = data[2]
    getStarterSize(data[2])
    setPlayerIcon()
}

/**
 * Converts size key to board card count.
 * @param size Size key from storage.
 */
function getStarterSize(size: string | null) {
    switch (size) {
        case "s":
            starterSize = 16
            break;
        case "m":
            starterSize = 24
            break;
        case "l":
            starterSize = 30
            break;
        default:
            starterSize = 16
            break;
    }
}

/**
 * Updates the current player header icon based on active theme.
 */
function setPlayerIcon() {
    if (starterTheme == "code-vibe" && ICONHEADER) {
        if (currentPlayer == "blue") {
            currentPlayer = "orange"
            ICONHEADER.src = returnCodeVibe()[1]
        } else if (currentPlayer == "orange" && ICONHEADER) {
            currentPlayer = "blue"
            ICONHEADER.src = returnCodeVibe()[0]
        }
    } else {
        if (ICONHEADER) {
            ICONHEADER.src = returnPlayerIcon()
        }
    }
}

/**
 * Creates the board DOM using a shuffled deck.
 */
function buildBoard() {
    let cardPairs: string[] = returnCardPair(starterSize / 2, starterTheme, DEVMODE)
    let deck: string[] = []

    for (let i = 1; i < cardPairs.length; i++) {
        deck.push(cardPairs[i], cardPairs[i])
    }

    buildShuffledBoard(deck)

    if (starterSize > 16) {
        document.getElementById("card_container")?.classList.add("grid-big")
    }

    initPlayerIcon()
}

/**
 * Shuffles the card deck and builds the board.
 */
function buildShuffledBoard(deck :string[]) {
    let shuffledDeck = [...deck]

    if (!DEVMODE) {
        shuffledDeck = shuffleCards(deck)
        let tries = 0

        while (hasImmediatePair(shuffledDeck) && tries < 10) {
            shuffledDeck = shuffleCards(deck)
            tries += 1
        }
    }

    shuffledDeck.forEach((cardPath, index) => {
        new Card(starterTheme, cardPath, `${index + 1}`)
    })
}

/**
 * Shuffles a card array using Fisher-Yates.
 * @param cards Input card paths.
 * @returns Shuffled card paths.
 */
function shuffleCards(cards: string[]) {
    let shuffled = [...cards]

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled
}

/**
 * Checks whether any adjacent cards form an immediate pair.
 * @param cards Deck order to validate.
 * @returns True when two neighboring cards match.
 */
function hasImmediatePair(cards: string[]) {
    for (let i = 0; i < cards.length - 1; i++) {
        if (cards[i] === cards[i + 1]) {
            return true
        }
    }

    return false
}

/**
 * Adds initial player color class for non-code-vibe themes.
 */
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

/**
 * Flips a card and triggers pair checking when two are open.
 * @param id Card button id.
 */
function toggle_card(id: string) {
    let card = document.getElementById(id)
    if (card && !LOCKEDCARDS.includes(card)) {
        OPENCARDS.push(card)
        card?.classList.toggle("flip-card")

        if (OPENCARDS.length == 2) {
            checkCardMatch()
        }
    }
}

/**
 * Compares the two open cards and routes to the matching outcome.
 */
function checkCardMatch() {
    const FIRST_CARD: HTMLElement = OPENCARDS[0]
    const SECOND_CARD: HTMLElement = OPENCARDS[1]
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

/**
 * Clear open cards array
 */
function clearOpenCards() {
    while (OPENCARDS.length > 0) {
        OPENCARDS.pop()
    }
}

/**
 * Locks matched cards and updates score/end-state checks.
 */
function cardMatch() {
    LOCKEDCARDS.push(OPENCARDS[0])
    LOCKEDCARDS.push(OPENCARDS[1])

    clearOpenCards()

    awardPoint()
    checkForGameEnd()
}

/**
 * Flips non-matching cards back after a short delay.
 */
function cardsNotMatch() {
    setTimeout(() => {
        OPENCARDS.forEach(card => {
            card.classList.toggle("flip-card")
        });

        clearOpenCards()
    }, 500);
}

/**
 * Awards a point to the active player and updates UI.
 */
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

/**
 * Switches to the next player and refreshes current player icon styling.
 */
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

/**
 * Calculates winner from total player points.
 */
function setWinner() {
    if (pointsBlue > pointsOrange) {
        winner = "blue"
    } else if (pointsBlue < pointsOrange) {
        winner = "orange"
    } else {
        winner = "draw"
    }
}

/**
 * Persists match result and navigates to end screen when board is complete.
 */
function checkForGameEnd() {
    if (starterSize === LOCKEDCARDS.length) {
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

/**
 * Sets scoreboard icons for themes that use pawn icons.
 */
function setPlayerPointIcons() {
    const ICON_BLUE = document.getElementById("player_board_icon_blue") as HTMLImageElement
    const ICON_ORANGE = document.getElementById("player_board_icon_orange") as HTMLImageElement

    if (starterTheme !== "code-vibe" && ICON_BLUE && ICON_ORANGE) {
        ICON_BLUE.src = returnPawnIcons()[0]
        ICON_ORANGE.src = returnPawnIcons()[1]
    }
}

/**
 * Applies current theme class to board body.
 */
function styleBoardBody() {
    const BODY_BOARD = document.getElementById("body_board")

    if (BODY_BOARD) {
        BODY_BOARD.classList.add(starterTheme + "-body-board")
    }
}

/**
 * Applies current theme class to board header.
 */
function styleBoardHeader() {
    const HEADER_BOARD = document.getElementById("board_header")

    if (HEADER_BOARD) {
        HEADER_BOARD.classList.add(starterTheme + "-header-board")
    }
}

/**
 * Applies current theme class to board overlay dialog.
 */
function styleOverlay() {
    if (OVERLAY) {
        OVERLAY.classList.add(starterTheme + "-overlay")
    }
}

/**
 * Opens the board menu overlay.
 */
function openOverlay() {
    if (OVERLAY) {
        OVERLAY.showModal()
    }
}

/**
 * Closes the board menu overlay.
 */
function closeOverlay() {
    if (OVERLAY) {
        OVERLAY.close()
    }
}

/**
 * Returns to the landing page.
 */
function quitGame() {
    window.location.href = "./settings.html"
}

if (document.body.classList.contains("body-board")) {
    window.addEventListener("DOMContentLoaded", initBoard)
}

window.toggle_card = toggle_card
window.openOverlay = openOverlay
window.closeOverlay = closeOverlay
window.quitGame = quitGame