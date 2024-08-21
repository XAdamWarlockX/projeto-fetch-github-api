import { baseUrl, repositoriesQuantity } from "../variables.js"

// Função que busca os repositorios do perfil no API do github
async function getRepositories (userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`);
    return response.json();
}

export { getRepositories }