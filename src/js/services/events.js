import { baseUrl, eventsQuantity } from "../variables.js"

// Função que busca os eventos do perfil no API do github
async function getEvents (userName) {
    const events = await fetch(`${baseUrl}/${userName}/events?per_page=${eventsQuantity}`);
    return events.json();
}

export { getEvents }