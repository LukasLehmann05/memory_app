import '../styles/style.scss'

/**
 * End screen entry module.
 * Renders final game summary, winner state, and themed styling.
 */
import { getMatchData } from "./storage";
import { returnPawnIcons } from './theme_data';
import { returnCodeVibe } from './theme_data';
import { SLIDEOUT_DATA } from './theme_data';

const GAME_DATA = getMatchData()

const PLAYER_POINTS_BLUE = document.getElementById("player_blue") as HTMLImageElement
const PLAYER_POINTS_ORANGE = document.getElementById("player_orange") as HTMLImageElement
const SLIDEOUT = document.getElementById("slide_out")
const SLIDEOUT_IMG = document.getElementById("slideout_img") as HTMLImageElement
const TITLE_WINNER = document.getElementById("winner_title") as HTMLTitleElement
const WINNER_UPPER_TEXT = document.getElementById("winner_upper_text") as HTMLParagraphElement

/**
 * Initializes end screen content.
 */
function initEndScreen() {
    addOverviewContent()
}

/**
 * Populates all result overview sections.
 */
function addOverviewContent() {
    setPlayerPoints()
    setPlayerIcons()
    setPointDisplayStyle()
    setBodyStyle()
    setMainStyle()
    setSlideOutStyle()
    setWinnerTitle()

    if (GAME_DATA.winner) {
        SLIDEOUT?.classList.add(GAME_DATA.theme + "-" + GAME_DATA.winner.toString())
    }
}

/**
 * Writes player point totals to the end screen.
 */
function setPlayerPoints() {
    const POINTS_BLUE = document.getElementById("points_blue") as HTMLParagraphElement
    const POINTS_ORANGE = document.getElementById("points_orange") as HTMLParagraphElement

    setPointsBlue(POINTS_BLUE)
    setPointsOrange(POINTS_ORANGE)

}

/**
 * Sets points for blue player.
 * @param POINTS_BLUE Paragraph element to change
 */
function setPointsBlue(POINTS_BLUE: HTMLParagraphElement) {
    if (POINTS_BLUE) {
        if (GAME_DATA.theme == "code-vibe") {
            POINTS_BLUE.innerText += GAME_DATA.points_blue ? "Blue " + GAME_DATA.points_blue : "Blue 0"
        } else {
            POINTS_BLUE.innerText += GAME_DATA.points_blue ? GAME_DATA.points_blue : "0"
        }
    }
}

/**
 * Sets points for orange player.
 * @param POINTS_ORANGE Paragraph element to change
 */
function setPointsOrange(POINTS_ORANGE: HTMLParagraphElement) {
    if (POINTS_ORANGE) {
        if (GAME_DATA.theme == "code-vibe") {
            POINTS_ORANGE.innerText += GAME_DATA.points_orange ? "Orange " + GAME_DATA.points_orange : "Orange 0"
        } else {
            POINTS_ORANGE.innerText += GAME_DATA.points_orange ? GAME_DATA.points_orange : "0"
        }
    }
}

/**
 * Sets player icon assets based on selected theme.
 */
function setPlayerIcons() {
    if (GAME_DATA.theme == "code-vibe") {
        PLAYER_POINTS_BLUE!.src = returnCodeVibe()[0]
        PLAYER_POINTS_ORANGE!.src = returnCodeVibe()[1]
    } else {
        PLAYER_POINTS_BLUE!.src = returnPawnIcons()[0]
        PLAYER_POINTS_ORANGE!.src = returnPawnIcons()[1]
    }
}

/**
 * Sets winner headline and optional winner visuals.
 */
function setWinnerTitle() {
    if (GAME_DATA.winner == "draw") {
        WINNER_UPPER_TEXT.innerText = "It's a"
        TITLE_WINNER.innerText = "DRAW"
    } else {
        WINNER_UPPER_TEXT.innerText = "The winner is"
        TITLE_WINNER.innerText = GAME_DATA.winner?.toUpperCase() + " PLAYER"

        if (GAME_DATA.theme == "code-vibe") {
            let confetti = document.querySelector("confetti") as HTMLImageElement
            confetti.style.display = "block"
        }
    }
}

/**
 * Applies theme class to end screen body.
 */
function setBodyStyle() {
    const BODY_ENDSCREEN = document.getElementById("body_endscreen")

    if (BODY_ENDSCREEN) {
        BODY_ENDSCREEN.classList.add(GAME_DATA.theme + "-body")
    }
}


/**
 * Applies theme class to points section.
 */
function setPointDisplayStyle() {
    const POINTS_SECTION = document.getElementById("points_display_section")

    if (POINTS_SECTION) {
        POINTS_SECTION.classList.add(GAME_DATA.theme + "-points")
    }
}

/**
 * Applies theme class to main result section.
 */
function setMainStyle() {
    const MAIN_SECTION = document.getElementById("main_endscreen")

    if (MAIN_SECTION) {
        MAIN_SECTION.classList.add(GAME_DATA.theme + "-main-endscreen")
    }
}

/**
 * Applies slideout styling and starts delayed reveal.
 */
function setSlideOutStyle() {
    setTimeout(() => {
        if (SLIDEOUT) {
            SLIDEOUT.classList.add(GAME_DATA.theme + "-slide-out")
            setSlideOutImg()
        }
    }, 4000);
}

/**
 * Chooses slideout image based on theme and winner.
 */
function setSlideOutImg() {
    type WinnerKey = "blue" | "orange" | "draw";

    const themeKey =
        GAME_DATA.theme && GAME_DATA.theme in SLIDEOUT_DATA
            ? (GAME_DATA.theme as keyof typeof SLIDEOUT_DATA)
            : "code-vibe";

    const winnerKey: WinnerKey =
        GAME_DATA.winner === "blue" || GAME_DATA.winner === "orange" || GAME_DATA.winner === "draw"
            ? GAME_DATA.winner
            : "draw";

    const themeEntry = SLIDEOUT_DATA[themeKey];
    if (SLIDEOUT_IMG) {
        SLIDEOUT_IMG.src = themeEntry[winnerKey];
    }
}

if (document.body.classList.contains("body-endscreen")) {
    window.addEventListener("DOMContentLoaded", initEndScreen)
}