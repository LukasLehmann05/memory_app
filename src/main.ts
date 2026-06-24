import './styles/style.scss'

declare global {
    interface Window {
        selectTheme: typeof selectTheme
        selectPlayer: typeof selectPlayer
        selectBoardSize: typeof selectBoardSize
    }
}

let selectedTheme: string = "code-vibe"
let selectedPlayer: string = "blue"
let fieldSizeRaw = "s"

import { returnMarker } from './script/template'
import { addToLocalStorage } from './script/storage'
import { returnThemeName } from './script/theme_data'
import { returnPlayerName } from './script/theme_data'
import { returnBoardCardAmount } from './script/theme_data'

const allThemes: string[] = ["code-vibe", "food", "DA-Project", "gaming"]
const allPlayer: string[] = ["blue", "orange"]
const allSize: string[] = ["s", "m", "l"]
const previewByTheme: Record<string, string> = {
    "code-vibe": "theme-code",
    "gaming": "theme-gaming",
    "food": "theme-food",
    "DA-Project": "theme-projects"
}

function init() {
    initThemePreviewHover()
    showThemePreview(selectedTheme)

    setSelectedTheme()
    setSelectedPlayer()
    setSelectedBoardSize()
}

function selectTheme(theme: string) {
    if (allThemes.includes(theme)) {
        removeMarker("theme", selectedTheme)
        selectedTheme = theme
        displaySelected(theme, "theme")
        addMarker("theme", theme)
        showThemePreview(selectedTheme)
        addToLocalStorage("theme", theme)
        setSelectedTheme()
    }
}

function selectPlayer(player: string) {
    if (allPlayer.includes(player)) {
        removeMarker("player", selectedPlayer)
        selectedPlayer = player
        displaySelected(player, "player")
        addMarker("player", player)
        addToLocalStorage("player", player)
        setSelectedPlayer()
    }
}

function selectBoardSize(amount: string) {
    if (allSize.includes(amount)) {
        removeMarker("size", fieldSizeRaw)
        fieldSizeRaw = amount
        displaySelected(amount, "size")
        addMarker("size", fieldSizeRaw)
        addToLocalStorage("size", amount)
        setSelectedBoardSize()
    }
}

function displaySelected(id: string, group: string) {
    if (group == "player") {
        removeOldPlayer(id)
    } else if (group == "size") {
        removeOldSize(id)
    } else if (group == "theme") {
        removeOldTheme(id)
    }
    document.getElementById(id)?.classList.add("selected")
}

function removeOldPlayer(id: string) {
    allPlayer.forEach(player => {
        if (id !== player) {
            let elementToCheck = document.getElementById(player)
            if (elementToCheck?.classList.contains("selected")) {
                elementToCheck.classList.remove("selected")
            }
        }
    });
}

function removeOldTheme(id: string) {
    allThemes.forEach(theme => {
        if (id !== theme) {
            let elementToCheck = document.getElementById(theme)
            if (elementToCheck?.classList.contains("selected")) {
                elementToCheck.classList.remove("selected")
            }
        }
    });
}

function removeOldSize(id: string) {
    allSize.forEach(size => {
        if (id !== size) {
            let elementToCheck = document.getElementById(size)
            if (elementToCheck?.classList.contains("selected")) {
                elementToCheck.classList.remove("selected")
            }
        }
    });
}

function addMarker(group: string, item: string) {
    let generatedID = group + "_" + item
    let template = returnMarker(generatedID)
    document.getElementById(item)!.innerHTML += template
}

function removeMarker(group: string, item: string) {
    document.getElementById(group + "_" + item)?.remove()
}

function initMarker() {
    addMarker("theme", selectedTheme)
    addMarker("player", selectedPlayer)
    addMarker("size", fieldSizeRaw)
}

function initThemePreviewHover() {
    allThemes.forEach(theme => {
        const themeOption = document.getElementById(theme)
        if (!themeOption) {
            return
        }

        themeOption.addEventListener("mouseenter", () => showThemePreview(theme))
        themeOption.addEventListener("mouseleave", () => showThemePreview(selectedTheme))
    })
}

function showThemePreview(theme: string) {
    const activePreviewId = previewByTheme[theme]
    if (!activePreviewId) {
        return
    }

    Object.values(previewByTheme).forEach(previewId => {
        document.getElementById(previewId)?.classList.remove("current")
    })

    document.getElementById(activePreviewId)?.classList.add("current")
}

function setSelectedTheme() {
    const SELECTION_THEME = document.getElementById("selection_theme")

    if (SELECTION_THEME) {
        SELECTION_THEME.innerText = returnThemeName(selectedTheme)
    }
}

function setSelectedPlayer() {
    const SELECTION_PLAYER = document.getElementById("selection_player")

    if (SELECTION_PLAYER) {
        SELECTION_PLAYER.innerText = returnPlayerName(selectedPlayer)
    }
}

function setSelectedBoardSize() {
    const SELECTION_SIZE = document.getElementById("selection_size")

    if (SELECTION_SIZE) {
        SELECTION_SIZE.innerText = returnBoardCardAmount(fieldSizeRaw)
    }
}

window.selectTheme = selectTheme
window.selectPlayer = selectPlayer
window.selectBoardSize = selectBoardSize

window.addEventListener("load", init)

if (document.body.classList.contains("body-settings")) {
    window.addEventListener("DOMContentLoaded", initMarker)
}
