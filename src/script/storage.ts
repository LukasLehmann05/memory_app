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