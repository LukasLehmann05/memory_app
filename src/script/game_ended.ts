import '../styles/style.scss'
import { getMatchData } from "./storage";
import { returnPawnIcons } from './theme_data';
import { returnCodeVibe } from './theme_data';

let game_data = getMatchData()

const PLAYER_POINTS_BLUE = document.getElementById("player_blue") as HTMLImageElement | null
const PLAYER_POINTS_ORANGE = document.getElementById("player_orange") as HTMLImageElement | null

function initEndScreen() {
    addOverviewContent()
}

function addOverviewContent() {
    setPlayerPoints()
    setPlayerIcons()
}

function setPlayerPoints() {
    const POINTS_BLUE = document.getElementById("points_blue")
    const POINTS_ORANGE = document.getElementById("points_orange")

    if (POINTS_BLUE) {
        POINTS_BLUE.innerText = game_data.points_blue ? "BLUE " + game_data.points_blue : "BLUE 0"
    }

    if (POINTS_ORANGE) {
        POINTS_ORANGE.innerText = game_data.points_orange ? "ORANGE " + game_data.points_orange : "ORANGE 0"
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

if (document.body.classList.contains("body-endscreen")) {
    window.addEventListener("DOMContentLoaded", initEndScreen)
}