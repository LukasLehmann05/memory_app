import '../styles/style.scss'
import { getMatchData } from "./storage";

let game_data = getMatchData()

function initEndScreen() {
    console.log(game_data);
}

function addOverviewContent() {
    
}

if (document.body.classList.contains("body-endscreen")) {
    window.addEventListener("DOMContentLoaded", initEndScreen)
}