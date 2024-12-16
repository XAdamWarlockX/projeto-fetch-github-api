import { Events } from "../services/events.js"
import { User } from "../services/getuser.js"
import { Repositories } from "../services/repositories.js"

interface UserCustomer {
    avatarUrl: string
    name: string
    bio: string
    userName: string
    followers: string | number
    following: string | number
    repositories: Repositories[]
    events: Events[]
    setInfo(gitHubUser: User): void
    setRepositories(repositories: Repositories[]): void
    setEvents(events: Events[]): void
}

// Objeto que vai conter as informações de usuario que queremos do API
const user: UserCustomer = {
    avatarUrl: '',
    name: '',
    bio: '',
    userName: '',
    followers: '',
    following: '',
    repositories: [],
    events: [],
    setInfo(gitHubUser){
        this.avatarUrl = gitHubUser.avatar_url
        this.name = gitHubUser.name
        this.bio = gitHubUser.bio
        this.userName = gitHubUser.login
        this.followers = gitHubUser.followers
        this.following = gitHubUser.following
    },
    setRepositories(repositories){
        this.repositories = repositories
    },
    setEvents(events){
        this.events = events
    }
}

export { user, UserCustomer }