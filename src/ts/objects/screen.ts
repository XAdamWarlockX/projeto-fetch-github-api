import { UserCustomer } from "./user.js";

//Adicionando elementos na tela
const screen = {
    userProfile: document.querySelector('.profile-data') as HTMLDivElement,
    renderUser(user: UserCustomer): void {
        this.userProfile.innerHTML =
            `<div class="info">
                <img src="${user.avatarUrl}" alt="Foto de perfil do usuário"></img>
                <div class="data">
                    <h1>${user.name ?? 'Não possui nome cadastrado 😕'}</h1>
                    <p>📝 ${user.bio ?? 'Não possui bio cadastrada 😕'}</p>
                    <p>👥 Seguidores: ${user.followers}</p>
                    <p>👤 Seguindo: ${user.following}</p>
                </div>
            </div>`

        // Repositorios
        let repositoriesItens: string = ''
        user.repositories.forEach((repo) => repositoriesItens +=
            `<li>
                <a href="${repo.html_url}" target="_blank">${repo.name}
                    <div>
                        <p>🍴${repo.forks}</p>
                        <p>⭐${repo.stargazers_count}</p>
                        <p>👀${repo.watchers_count}</p> 
                        <p>💻${repo.language ?? 'Não identificada'}</p>
                    </div>
                </a>
            </li>`
        );

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML +=
                `<div class="repositories section">
                    <h2>Repositórios</h2>
                    <ul>${repositoriesItens}</ul>
                </div>`
        }

        // Eventos
        let eventsItens: string = ''
        user.events.forEach((event) => {
            if (event.type === "PushEvent") {
                eventsItens +=
                    `<li>
                        <p>
                            <span>${event.repo.name}</span> - ${event.payload.commits[0].message}
                        </p>
                    </li>`
            } else{
                eventsItens +=
                    `<li>
                        <p>
                            <span>${event.repo.name}</span> - Criado um ${event.payload.ref_type}
                        </p>
                    </li>`
            }

        });

        if (user.events.length > 0) {
            this.userProfile.innerHTML +=
                `<div class="events">
                    <h2>Eventos</h2>
                    <ul>${eventsItens}</ul>
                </div>`
        } else {
            this.userProfile.innerHTML +=
                `<div class="events">
                    <h2>Eventos</h2>
                    <p>Usuário não possui Eventos</p>
                </div>`
        }
    },
    renderNotFound(): void {
        this.userProfile.innerHTML = 
            "<h3>Usuário não encontrado</h3>"
    }
};

export { screen };