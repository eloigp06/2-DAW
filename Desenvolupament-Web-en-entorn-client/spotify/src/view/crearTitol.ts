export function crearTitol():HTMLHeadElement {
    const titol: HTMLHeadingElement = document.createElement("h1")

    titol.textContent = "Spotify"
    return titol;
}