import { baseUrl, eventsQuantity } from "../variables.js";

interface Commits {
    message: string
}

interface Payload {
    commits: Commits[]
    ref_type: string
}

interface Repository {
    name: string
}

interface Events {
    payload: Payload
    repo: Repository
    type: string
}

async function getEvents (userName: string): Promise<Events[]> {
    const events: Response = await fetch(`${baseUrl}/${userName}/events?per_page=${eventsQuantity}`);
    return events.json();
}

export { getEvents, Events }