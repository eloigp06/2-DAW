export function crearBotoCerca(
    getSearchText: () => string,
    cerca: (searchText: string) => void
): HTMLButtonElement {

    const botoCerca: HTMLButtonElement = document.createElement("button")

    botoCerca.type = "button";
    botoCerca.textContent = "Cerca";
    botoCerca.addEventListener("click",
        () => {
            cerca(getSearchText());
        });
    return botoCerca;
}