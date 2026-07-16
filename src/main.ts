import './styles/style.scss'

/**
 * Settings page entry module.
 * Handles selecting theme, player, and board size and persists choices.
 */

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

const ALLTHEMES: string[] = ["code-vibe", "food", "DA-Project", "gaming"]
const ALLPLAYER: string[] = ["blue", "orange"]
const ALLSIZE: string[] = ["s", "m", "l"]
const PREVIEW_BY_THEME: Record<string, string> = {
    "code-vibe": "theme-code",
    "gaming": "theme-gaming",
    "food": "theme-food",
    "DA-Project": "theme-projects"
}

/**
 * Gets called on document load, inits other functions
 */
function init() {
    initThemePreviewHover()
    showThemePreview(selectedTheme)

    setSelectedTheme()
    setSelectedPlayer()
    setSelectedBoardSize()
    setDefaultSelection()
}

/**
 * Selects a theme and updates UI and persisted settings.
 * @param theme Theme key to apply.
 */
function selectTheme(theme: string) {
    if (ALLTHEMES.includes(theme)) {
        removeMarker("theme", selectedTheme)
        selectedTheme = theme
        displaySelected(theme, "theme")
        addMarker("theme", theme)
        showThemePreview(selectedTheme)
        addToLocalStorage("theme", theme)
        setSelectedTheme()
    }
}

/**
 * Selects a player color and updates UI and persisted settings.
 * @param player Player key to apply.
 */
function selectPlayer(player: string) {
    if (ALLPLAYER.includes(player)) {
        removeMarker("player", selectedPlayer)
        selectedPlayer = player
        displaySelected(player, "player")
        addMarker("player", player)
        addToLocalStorage("player", player)
        setSelectedPlayer()
    }
}

/**
 * Selects board size and updates UI and persisted settings.
 * @param amount Board size key (s, m, l).
 */
function selectBoardSize(amount: string) {
    if (ALLSIZE.includes(amount)) {
        removeMarker("size", fieldSizeRaw)
        fieldSizeRaw = amount
        displaySelected(amount, "size")
        addMarker("size", fieldSizeRaw)
        addToLocalStorage("size", amount)
        setSelectedBoardSize()
    }
}

/**
 * Applies selected styling to a control group and clears previous selection.
 * @param id Selected element id.
 * @param group Selection group name.
 */
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

/**
 * Removes selected style from all non-selected player options.
 * @param id Selected player id.
 */
function removeOldPlayer(id: string) {
    ALLPLAYER.forEach(player => {
        if (id !== player) {
            let elementToCheck = document.getElementById(player)
            if (elementToCheck?.classList.contains("selected")) {
                elementToCheck.classList.remove("selected")
            }
        }
    });
}

/**
 * Removes selected style from all non-selected theme options.
 * @param id Selected theme id.
 */
function removeOldTheme(id: string) {
    ALLTHEMES.forEach(theme => {
        if (id !== theme) {
            let elementToCheck = document.getElementById(theme)
            if (elementToCheck?.classList.contains("selected")) {
                elementToCheck.classList.remove("selected")
            }
        }
    });
}

/**
 * Removes selected style from all non-selected board size options.
 * @param id Selected size id.
 */
function removeOldSize(id: string) {
    ALLSIZE.forEach(size => {
        if (id !== size) {
            let elementToCheck = document.getElementById(size)
            if (elementToCheck?.classList.contains("selected")) {
                elementToCheck.classList.remove("selected")
            }
        }
    });
}

/**
 * Appends selection marker markup to the selected option.
 * @param group Marker group name.
 * @param item Selected option id.
 */
function addMarker(group: string, item: string) {
    const GENERATED_ID = group + "_" + item
    const TEMPLATE = returnMarker(GENERATED_ID)
    document.getElementById(item)!.innerHTML += TEMPLATE
}

/**
 * Removes an existing marker for the given group and option.
 * @param group Marker group name.
 * @param item Option id.
 */
function removeMarker(group: string, item: string) {
    document.getElementById(group + "_" + item)?.remove()
}

/**
 * Creates initial markers for stored selections.
 */
function initMarker() {
    addMarker("theme", selectedTheme)
    addMarker("player", selectedPlayer)
    addMarker("size", fieldSizeRaw)
}

/**
 * Adds hover interactions to preview theme cards.
 */
function initThemePreviewHover() {
    ALLTHEMES.forEach(theme => {
        const themeOption = document.getElementById(theme)
        if (!themeOption) {
            return
        }

        themeOption.addEventListener("mouseenter", () => showThemePreview(theme))
        themeOption.addEventListener("mouseleave", () => showThemePreview(selectedTheme))
    })
}

/**
 * Switches the active theme preview panel.
 * @param theme Theme key whose preview should be shown.
 */
function showThemePreview(theme: string) {
    const ACTIVE_PREVIEW_ID = PREVIEW_BY_THEME[theme]
    if (!ACTIVE_PREVIEW_ID) {
        return
    }

    Object.values(PREVIEW_BY_THEME).forEach(previewId => {
        document.getElementById(previewId)?.classList.remove("current")
    })

    document.getElementById(ACTIVE_PREVIEW_ID)?.classList.add("current")
}

/**
 * Updates the displayed selected theme label.
 */
function setSelectedTheme() {
    const SELECTION_THEME = document.getElementById("selection_theme")

    if (SELECTION_THEME) {
        SELECTION_THEME.innerText = returnThemeName(selectedTheme)
    }
}

/**
 * Updates the displayed selected player label.
 */
function setSelectedPlayer() {
    const SELECTION_PLAYER = document.getElementById("selection_player")

    if (SELECTION_PLAYER) {
        SELECTION_PLAYER.innerText = returnPlayerName(selectedPlayer)
    }
}

/**
 * Updates the displayed selected board size label.
 */
function setSelectedBoardSize() {
    const SELECTION_SIZE = document.getElementById("selection_size")

    if (SELECTION_SIZE) {
        SELECTION_SIZE.innerText = returnBoardCardAmount(fieldSizeRaw)
    }
}

/**
 * Sets default selection
 */
function setDefaultSelection() {
    addToLocalStorage("theme", "code-vibe")
    addToLocalStorage("player", "blue")
    addToLocalStorage("size", "s")
}

window.selectTheme = selectTheme
window.selectPlayer = selectPlayer
window.selectBoardSize = selectBoardSize

window.addEventListener("load", init)

if (document.body.classList.contains("body-settings")) {
    window.addEventListener("DOMContentLoaded", initMarker)
}
