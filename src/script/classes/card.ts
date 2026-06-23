import { returnCardImage } from "../theme_data";
import { returnCard } from "../template";

export class Card {

    constructor(theme: string | null, card_path :string, card_amount: string) {
        let image_path: string = returnCardImage(theme)
        let render_container = document.getElementById("card_container")
        this.create_card(image_path,card_path, "card" + card_amount)

    }

    create_card(src :string,card_path :string,id :string) {
        let render_container = document.getElementById("card_container")
        let cardTemplate = returnCard(src,card_path,id)
        render_container!.innerHTML += cardTemplate
    }


}