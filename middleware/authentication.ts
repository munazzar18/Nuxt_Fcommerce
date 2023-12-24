import { useAuthStore } from "@/stores/auth"
import UserService from "~/services/UserService"

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore()
    const user = UserService.getUser()
    const isAuthenticated = auth.isAuthenticated
    const isAdmin = user?.role === 'seller'
    if (to.path.startsWith('/admin')) {
        if (!isAuthenticated || (isAuthenticated && !isAdmin)) {
            return '/not-found' // Redirect to a forbidden page or another appropriate route
        }
    }
})
