import { returnCardImage } from "../theme_data";
import { returnCard } from "../template";

/**
 * Represents one rendered card on the board.
 */
export class Card {

    /**
     * Creates and mounts a new card into the board container.
     * @param theme Selected theme key.
     * @param card_path Path to revealed card image.
     * @param card_amount Card index suffix.
     */
    constructor(theme: string | null, card_path :string, card_amount: string) {
        let image_path: string = returnCardImage(theme)
        let render_container = document.getElementById("card_container")
        this.create_card(image_path,card_path, "card" + card_amount)

    }

    /**
     * Appends the card HTML template into the board container.
     * @param src Path to hidden card face image.
     * @param card_path Path to revealed card face image.
     * @param id Card element id.
     */
    create_card(src :string,card_path :string,id :string) {
        let render_container = document.getElementById("card_container")
        let cardTemplate = returnCard(src,card_path,id)
        render_container!.innerHTML += cardTemplate
    }
}