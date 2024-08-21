import { getUser } from "./services/getuser.js"
import { getRepositories } from "./services/repositories.js"

import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"


// Evento para buscar perfil
document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value

    if(validateEmtyInput(userName)) return

    getUserData(userName)
})

// Evento de busca ao pressionar a tecla "enter"
document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode // pegando o código da chave enter
    const isEnterKeyPressed = key === 13 // 13 é código da tecla enter

    // verificando se a tecla enter foi pressionada e exutando a função de adicionar os elementos
    if(isEnterKeyPressed){
        
        if(validateEmtyInput(userName)) return

        getUserData(userName)
    }
})

// Função que verifica se o campo esta preenchido ao buscar ou dar enter
function validateEmtyInput (userName){
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub.')
        return true // esse retorno é importante para parar o código e não dar continuidade.
    }
}

// Função que adiciona as informações e repositorios do usuario recebidos do API no HTML
async function getUserData (userName) {
    const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return // esse retorno é importante para parar o código e não dar continuidade.
    }

    const repositoriesResponse = await getRepositories(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)

    screen.renderUser(user)
}