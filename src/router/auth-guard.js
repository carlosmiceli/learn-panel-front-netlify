import { store } from "../store"

export default async (to, from, next) => {
    if (!store.getters.loggedIn) {
        await store.dispatch("checklogin")
    }
    
    if (store.getters.loggedIn) {
        next()
    }
    else next("/login")
}