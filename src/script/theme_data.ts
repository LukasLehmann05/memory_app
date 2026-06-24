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

const CARDS_PROJECTS = [
    "../img/themes/da_projects/card_icons/arrow.svg",
    "../img/themes/da_projects/card_icons/bowl.svg",
    "../img/themes/da_projects/card_icons/chefhat.svg",
    "../img/themes/da_projects/card_icons/cuisine.svg",
    "../img/themes/da_projects/card_icons/dabubble.svg",
    "../img/themes/da_projects/card_icons/deliveryapp.svg",
    "../img/themes/da_projects/card_icons/egg.svg",
    "../img/themes/da_projects/card_icons/flower.svg",
    "../img/themes/da_projects/card_icons/join.svg",
    "../img/themes/da_projects/card_icons/messenger.svg",
    "../img/themes/da_projects/card_icons/pokedex.svg",
    "../img/themes/da_projects/card_icons/polloloco.svg",
    "../img/themes/da_projects/card_icons/project1.svg",
    "../img/themes/da_projects/card_icons/ramen.svg",
    "../img/themes/da_projects/card_icons/smiley.svg",
    "../img/themes/da_projects/card_icons/swap.svg",
    "../img/themes/da_projects/card_icons/tictactoe.svg",
    "../img/themes/da_projects/card_icons/wave.svg",
]

const CARDS_FOOD = [
    "../img/themes/food/card_icons/burger.svg",
    "../img/themes/food/card_icons/cake.svg",
    "../img/themes/food/card_icons/chicken.svg",
    "../img/themes/food/card_icons/chocolate.svg",
    "../img/themes/food/card_icons/corndog.svg",
    "../img/themes/food/card_icons/cupcake.svg",
    "../img/themes/food/card_icons/donut.svg",
    "../img/themes/food/card_icons/fries.svg",
    "../img/themes/food/card_icons/icecream.svg",
    "../img/themes/food/card_icons/lavacake.svg",
    "../img/themes/food/card_icons/macarons.svg",
    "../img/themes/food/card_icons/pizza.svg",
    "../img/themes/food/card_icons/pretzel.svg",
    "../img/themes/food/card_icons/salad.svg",
    "../img/themes/food/card_icons/sandwich.svg",
    "../img/themes/food/card_icons/sushi.svg",
    "../img/themes/food/card_icons/wrap.svg",
]

const CARDS_GAMING = [
    "../img/themes/games/card_icons/banana.svg",
    "../img/themes/games/card_icons/card.svg",
    "../img/themes/games/card_icons/char1.svg",
    "../img/themes/games/card_icons/char2.svg",
    "../img/themes/games/card_icons/char3.svg",
    "../img/themes/games/card_icons/circle.svg",
    "../img/themes/games/card_icons/coin.svg",
    "../img/themes/games/card_icons/controller.svg",
    "../img/themes/games/card_icons/creeper.svg",
    "../img/themes/games/card_icons/cube.svg",
    "../img/themes/games/card_icons/gameboy.svg",
    "../img/themes/games/card_icons/medal.svg",
    "../img/themes/games/card_icons/pac.svg",
    "../img/themes/games/card_icons/pacman.svg",
    "../img/themes/games/card_icons/play.svg",
    "../img/themes/games/card_icons/puzzle.svg",
    "../img/themes/games/card_icons/shroom.svg",
    "../img/themes/games/card_icons/snake.svg",
]

const PLAYER_CODE = [
    "../img/themes/code_vibe/blue_icon.svg",
    "../img/themes/code_vibe/orange_icon.svg",
]

const PAWN_ICONS = [
    "../img/themes/player_pawn_blue.svg",
    "../img/themes/player_pawn_orange.svg"
]

const PLAYER_OTHER = "../img/themes/playerIcon.svg"

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
    }
}

export function returnPlayerIcon() {
    return PLAYER_OTHER
}

export function returnCodeVibe() {
    return PLAYER_CODE
}

export function returnPawnIcons() {
    return PAWN_ICONS
}

export function returnCardPair(amount: number, theme: string | null) {
    switch (theme) {
        case "code-vibe":
            let requestedCards = requestCardPair(amount, CARDS_CODE_VIBE)
            return requestedCards
        case "DA-Project":
            let requestedCards2 = requestCardPair(amount, CARDS_PROJECTS)
            return requestedCards2
        case "food":
            let requestedCards3 = requestCardPair(amount, CARDS_FOOD)
            return requestedCards3
        case "gaming":
            let requestedCards4 = requestCardPair(amount, CARDS_GAMING)
            return requestedCards4
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