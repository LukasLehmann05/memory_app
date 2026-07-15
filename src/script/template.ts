/**
 * HTML template helpers used across the app.
 */

/**
 * Creates marker markup used for selected options.
 * @param id Marker element id.
 * @returns Marker HTML string.
 */
export function returnMarker(id:string) {
    return `<div class="underline-container rotate-180 " id="${id}"><div class="underline-block"></div><div class="underline-line-short"></div></div>`
}

/**
 * Creates one memory card button template.
 * @param path_hidden Path for the card front image.
 * @param path_visible Path for the revealed card back image.
 * @param id Card id suffix.
 * @returns Card HTML string.
 */
export function returnCard(path_hidden :string, path_visible :string,id :string) {
    return `
        <button class="card" id="toggle_card_${id}" onclick="toggle_card('toggle_card_${id}')">
            <div class="card__inner">
                <img src="${path_hidden}" alt="memory card" class="card__face">
                <img src="${path_visible}" alt="memory card" class="card__face card__face--back">
            </div>
        </button>
    `
}