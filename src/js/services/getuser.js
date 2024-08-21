import { baseUrl } from "../variables.js"

// Função que busca os dados do perfil no API do github
async function getUser (userName) {
    const response = await fetch(`${baseUrl}/${userName}`);
    return response.json();
}

export { getUser }