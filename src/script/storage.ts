export function addToLocalStorage(group:string, value:string) {
    localStorage.setItem(group,value)
}

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

export function getMatchData() {
    let Data = {
        winner: localStorage.getItem("winner"),
        points_blue: localStorage.getItem("points_blue"),
        points_orange: localStorage.getItem("points_orange"),
        theme: localStorage.getItem("starter_theme")
    }

    return Data
}