import { baseUrl } from "../variables.js"

interface User {
    avatar_url: string
    name: string
    bio: string
    followers: number
    following: number
    login: string
    message: string
}

// Função que busca os dados do perfil no API do github
async function getUser (userName: string): Promise<User> {
    const response: Response = await fetch(`${baseUrl}/${userName}`);
    return response.json();
}

export { getUser, User }