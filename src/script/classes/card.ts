import { returnCardImage } from "../theme_data";
import { returnCard } from "../template";

export class Card {

    constructor(theme :string | null) {
        let image_path :string = returnCardImage(theme)
        let card_template = returnCard(image_path)
        let render_container = document.getElementById("card_container")
        if (render_container) {
            render_container.innerHTML += card_template
        }
    }
}