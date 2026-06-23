const CARDS_CODE_VIBE = [
    "../img/themes/code_vibe/card_icons/angular.svg",
    "../img/themes/code_vibe/card_icons/bootstrap.svg",
    "../img/themes/code_vibe/card_icons/css.svg",
    "../img/themes/code_vibe/card_icons/db.svg",
    "../img/themes/code_vibe/card_icons/django.svg",
    "../img/themes/code_vibe/card_icons/firebase.svg",
    "../img/themes/code_vibe/card_icons/git.svg",
    "../img/themes/code_vibe/card_icons/html.svg",
    "../img/themes/code_vibe/card_icons/javascript.svg",
    "../img/themes/code_vibe/card_icons/nodejs.svg",
    "../img/themes/code_vibe/card_icons/python.svg",
    "../img/themes/code_vibe/card_icons/react.svg",
    "../img/themes/code_vibe/card_icons/scss.svg",
    "../img/themes/code_vibe/card_icons/terminal.svg",
    "../img/themes/code_vibe/card_icons/typescript.svg",
    "../img/themes/code_vibe/card_icons/vite.svg",
    "../img/themes/code_vibe/card_icons/vscode.svg",
]

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

export function returnCardPair(amount: number, theme: string | null) {
    switch (theme) {
        case "code-vibe":
            let requestedCards = requestCardPair(amount, CARDS_CODE_VIBE)
            return requestedCards

        default:
            let requestedCardsDefault = requestCardPair(amount, CARDS_CODE_VIBE)
            return requestedCardsDefault
    }
}

function requestCardPair(amount: number, array: string[]) {
    let selectedCards: string[] = []
    for (let i = 0; i <= amount; i++) {
        let randomCard = array[Math.floor(Math.random() * array.length)]
        selectedCards.push(randomCard)
    }

    return selectedCards
}