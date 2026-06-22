export function addToLocalStorage(group:string, value:string) {
    localStorage.setItem(group,value)
}

export function getFromLocalStorage() {
    let theme = localStorage.getItem("theme")
    let player = localStorage.getItem("player")
    let size = localStorage.getItem("size")

    return [theme,player,size]
}