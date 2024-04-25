export default {
    name: "ImageCard",
    emits: ['image-card'],
    template: `
        <div id="card">
            <div id="image" class="image"></div>
            <p id="name"></p>
            <nav>
                <ul>
                    <li><button id="ja">Ja</button></li>
                    <li><button id="nej">Nej</button></li>
                </ul>
            </nav>
        </div>`
}