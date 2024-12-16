import { getUser } from "./services/getuser.js"
import { getRepositories } from "./services/repositories.js"
import { getEvents } from "./services/events.js"

import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"


// Evento para buscar perfil
const btnSearch = document.getElementById('btn-search') as HTMLButtonElement 

btnSearch.addEventListener('click', () => {
    const userName = document.getElementById('input-search') as HTMLInputElement

    const userNameValue: string = userName.value

    if(validateEmtyInput(userNameValue)) return;

    getUserData(userNameValue);
})

// Evento de busca ao pressionar a tecla "enter"
const inputSearc = document.getElementById('input-search') as HTMLInputElement

inputSearc.addEventListener('keyup', (e: any) => {
    const userName: string = e.target.value
    const key: number = e.which || e.keyCode;
    const isEnterKeyPressed: boolean = key === 13;

    // verificando se a tecla enter foi pressionada e exutando a função de adicionar os elementos
    if(isEnterKeyPressed){
        
        if(validateEmtyInput(userName)) return;

        getUserData(userName);
    }
})

// Função que verifica se o campo esta preenchido ao buscar ou dar enter
function validateEmtyInput (userName: string): true | undefined{
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub.');
        return true;
    }
}

// Função que adiciona as informações e repositorios do usuario recebidos do API no HTML
async function getUserData (userName: string): Promise<void> {

    const userResponse = await getUser(userName);

    if(userResponse.message === "Not Found"){
        screen.renderNotFound();
        return;
    }
    
    const repositoriesResponse = await getRepositories(userName);
    
    const eventsResponse = await getEvents(userName);

    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse);
    user.setEvents(eventsResponse);

    screen.renderUser(user);
}

