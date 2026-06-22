export function returnCardImage(theme: string | null) {
    switch (theme) {
        case "code-vibe":
            return `../img/themes/code_vibe/card_hidden.svg`
        case "gaming":
            return `../img/themes/games/card_hidden.svg`
        case "DA-Project":
            return `../img/themes/da_projects/card_hidden.svg`
        case "food":
            return `../img/themes/food/card_hidden.svg`
        default:
            return `../img/themes/code_vibe/card_hidden.svg`
            break;
    }
}