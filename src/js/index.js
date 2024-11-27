import { getUser } from "./services/getuser.js"
import { getRepositories } from "./services/repositories.js"
import { getEvents } from "./services/events.js"

import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"


// Evento para buscar perfil
document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value;

    if(validateEmtyInput(userName)) return;

    getUserData(userName);
})

// Evento de busca ao pressionar a tecla "enter"
document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode;
    const isEnterKeyPressed = key === 13;

    if(isEnterKeyPressed){
        
        if(validateEmtyInput(userName)) return;

        getUserData(userName);
    }
})

// Função que verifica se o campo esta preenchido ao buscar ou dar enter
function validateEmtyInput (userName){
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub.');
        return true;
    }
}

// Função que adiciona as informações e repositorios do usuario recebidos do API no HTML
async function getUserData (userName) {
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