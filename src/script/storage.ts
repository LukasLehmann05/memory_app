/**
 * Local storage helpers for settings and match results.
 */

/**
 * Stores a value under a local storage key.
 * @param group Storage key.
 * @param value Value to persist.
 */
export function addToLocalStorage(group:string, value:string) {
    localStorage.setItem(group,value)
}

/**
 * Retrieves saved settings, returning defaults when missing.
 * @returns Tuple of theme, player, and board size key.
 */
export function getFromLocalStorage() {
    let theme = localStorage.getItem("theme")
    let player = localStorage.getItem("player")
    let size = localStorage.getItem("size")

    if (theme && player &&size) {
        return [theme,player,size]
    } else {
        return ["code-vibe", "blue", "s"]
    }
}

/**
 * Collects match result data used by the end screen.
 * @returns Winner, point totals, and starter theme.
 */
export function getMatchData() {
    let Data = {
        winner: localStorage.getItem("winner"),
        points_blue: localStorage.getItem("points_blue"),
        points_orange: localStorage.getItem("points_orange"),
        theme: localStorage.getItem("starter_theme")
    }

    return Data
}