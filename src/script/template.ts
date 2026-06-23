export function returnMarker(id:string) {
    return `<div class="underline-container rotate-180 " id="${id}"><div class="underline-block"></div><div class="underline-line-short"></div></div>`
}

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