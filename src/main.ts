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
let selectedSize: number = 16
let fieldSizeRaw = "s"

import { returnMarker } from './script/template'

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
    initMarker()
    initThemePreviewHover()
    showThemePreview(selectedTheme)
}

function selectTheme(theme: string) {
    if (allThemes.includes(theme)) {
        removeMarker("theme", selectedTheme)
        selectedTheme = theme
        displaySelected(theme, "theme")
        addMarker("theme", theme)
        showThemePreview(selectedTheme)
    }
}

function selectPlayer(player: string) {
    if (allPlayer.includes(player)) {
        removeMarker("player", selectedPlayer)
        selectedPlayer = player
        displaySelected(player, "player")
        addMarker("player", player)
    }
}

function selectBoardSize(amount: string) {
    switch (amount) {
        case "s":
            setBoardSizeVisual("s", 16)
            break;
        case "m":
            setBoardSizeVisual("m", 24)
            break;
        case "l":
            setBoardSizeVisual("l", 32)
            break;

        default:
            setBoardSizeVisual("s", 16)
            break;
    }
}

function setBoardSizeVisual(sizeRaw: string, size: number) {
    removeMarker("size", fieldSizeRaw)
    selectedSize = 16
    fieldSizeRaw = sizeRaw
    displaySelected(sizeRaw, "size")
    addMarker("size", fieldSizeRaw)
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

window.selectTheme = selectTheme
window.selectPlayer = selectPlayer
window.selectBoardSize = selectBoardSize

window.addEventListener("load", init)
