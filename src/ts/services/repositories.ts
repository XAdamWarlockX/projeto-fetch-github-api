import { baseUrl, repositoriesQuantity } from "../variables.js"

interface Repositories {
    name: string
    html_url: string
    forks: number
    stargazers_count: number
    watchers_count: number
    language: string
}

// Função que busca os repositorios do perfil no API do github
async function getRepositories (userName: string): Promise<Repositories[]> {
    const response: Response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`);
    return response.json();
}

export { getRepositories, Repositories }