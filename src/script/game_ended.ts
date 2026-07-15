import '../styles/style.scss'
import { getMatchData } from "./storage";
import { returnPawnIcons } from './theme_data';
import { returnCodeVibe } from './theme_data';
import { SLIDEOUT_DATA } from './theme_data';

let game_data = getMatchData()

const PLAYER_POINTS_BLUE = document.getElementById("player_blue") as HTMLImageElement
const PLAYER_POINTS_ORANGE = document.getElementById("player_orange") as HTMLImageElement
const SLIDEOUT = document.getElementById("slide_out")
const SLIDEOUT_IMG = document.getElementById("slideout_img") as HTMLImageElement
const TITLE_WINNER = document.getElementById("winner_title") as HTMLTitleElement
const WINNER_UPPER_TEXT = document.getElementById("winner_upper_text") as HTMLParagraphElement

function initEndScreen() {
    console.log(game_data);

    addOverviewContent()
}

function addOverviewContent() {
    setPlayerPoints()
    setPlayerIcons()
    setPointDisplayStyle()
    setBodyStyle()
    setMainStyle()
    setSlideOutStyle()
    setWinnerTitle()

    if (game_data.winner) {
        SLIDEOUT?.classList.add(game_data.theme + "-" + game_data.winner.toString())
    }
}

function setPlayerPoints() {
    const POINTS_BLUE = document.getElementById("points_blue")
    const POINTS_ORANGE = document.getElementById("points_orange")

    if (POINTS_BLUE) {
        if (game_data.theme == "code-vibe") {
            POINTS_BLUE.innerText += game_data.points_blue ? "Blue " + game_data.points_blue : "Blue 0"
        } else {
            POINTS_BLUE.innerText += game_data.points_blue ? game_data.points_blue : "0"
        }
    }

    if (POINTS_ORANGE) {
        if (game_data.theme == "code-vibe") {
            POINTS_ORANGE.innerText += game_data.points_orange ? "Orange " + game_data.points_orange : "Orange 0"
        } else {
            POINTS_ORANGE.innerText += game_data.points_orange ? game_data.points_orange : "0"
        }
    }
}

function setPlayerIcons() {
    if (game_data.theme == "code-vibe") {
        PLAYER_POINTS_BLUE!.src = returnCodeVibe()[0]
        PLAYER_POINTS_ORANGE!.src = returnCodeVibe()[1]
    } else {
        PLAYER_POINTS_BLUE!.src = returnPawnIcons()[0]
        PLAYER_POINTS_ORANGE!.src = returnPawnIcons()[1]
    }
}

function setWinnerTitle() {
    if (game_data.winner == "draw") {
        WINNER_UPPER_TEXT.innerText = "It's a"
        TITLE_WINNER.innerText = "DRAW"
    } else {
        WINNER_UPPER_TEXT.innerText = "The winner is"
        TITLE_WINNER.innerText = game_data.winner?.toUpperCase() + " PLAYER"

        if (game_data.theme == "code-vibe") {
            let confetti = document.querySelector("confetti") as HTMLImageElement
                confetti.style.display = "block"
        }
    }
}

function setBodyStyle() {
    const BODY_ENDSCREEN = document.getElementById("body_endscreen")

    if (BODY_ENDSCREEN) {
        BODY_ENDSCREEN.classList.add(game_data.theme + "-body")
    }
}


function setPointDisplayStyle() {
    const POINTS_SECTION = document.getElementById("points_display_section")

    if (POINTS_SECTION) {
        POINTS_SECTION.classList.add(game_data.theme + "-points")
    }
}

function setMainStyle() {
    const MAIN_SECTION = document.getElementById("main_endscreen")

    if (MAIN_SECTION) {
        MAIN_SECTION.classList.add(game_data.theme + "-main-endscreen")
    }
}

function setSlideOutStyle() {
    setTimeout(() => {
        if (SLIDEOUT) {
            SLIDEOUT.classList.add(game_data.theme + "-slide-out")
            setSlideOutImg()
        }
    }, 2000);
}

function setSlideOutImg() {
    type WinnerKey = "blue" | "orange" | "draw";

    const themeKey =
        game_data.theme && game_data.theme in SLIDEOUT_DATA
            ? (game_data.theme as keyof typeof SLIDEOUT_DATA)
            : "code-vibe";

    const winnerKey: WinnerKey =
        game_data.winner === "blue" || game_data.winner === "orange" || game_data.winner === "draw"
            ? game_data.winner
            : "draw";

    const themeEntry = SLIDEOUT_DATA[themeKey];
    if (SLIDEOUT_IMG) {
        SLIDEOUT_IMG.src = themeEntry[winnerKey];
    }
}

if (document.body.classList.contains("body-endscreen")) {
    window.addEventListener("DOMContentLoaded", initEndScreen)
}