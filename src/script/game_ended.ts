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
    setPointDisplayStyle()
    setBodyStyle()
    setMainStyle()
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
             POINTS_ORANGE.innerText += game_data.points_orange ?  game_data.points_orange : "0"
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

if (document.body.classList.contains("body-endscreen")) {
    window.addEventListener("DOMContentLoaded", initEndScreen)
}