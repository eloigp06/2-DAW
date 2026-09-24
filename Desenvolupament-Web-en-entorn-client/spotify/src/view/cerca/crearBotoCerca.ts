export function crearBotoCerca(): HTMLButtonElement {

    const botoCerca: HTMLButtonElement = document.createElement("button")

    botoCerca.type = "button";
    botoCerca.textContent = "Cerca";
    botoCerca.addEventListener("click", () => {
        console.log("boto clicat");
    });
    return botoCerca;
}