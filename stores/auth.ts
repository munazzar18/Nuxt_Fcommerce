import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/services/ApiService";
import JwtService from "@/services/JwtService";
import UserService from "@/services/UserService";

const baseUrl = "http://localhost:5005/api/"

export interface User {
    access_token: string;
    user: {
        id: string;
        username: string;
        email: string;
    }
}

export const useAuthStore = defineStore("auth", () => {

    const errors = ref({});
    const user = ref<User>({} as User);
    const isAuthenticated = ref(!!JwtService.getToken());

    function setAuth(authUser: User) {
        isAuthenticated.value = true;
        user.value = authUser;
        errors.value = {};
        JwtService.saveToken(user.value.access_token);
        UserService.saveUser(user.value.user)
    }

    function setError(error: any) {
        errors.value = { ...error };
    }

    function purgeAuth() {
        isAuthenticated.value = false;
        user.value = {} as User;
        errors.value = [];
        JwtService.destroyToken();
        UserService.removeUser()
    }

    async function login(credentials: User) {
        try {
            const res = await ApiService.post(`${baseUrl}auth/login`, credentials)
            let data = res.data.data

            setAuth(data)
        } catch (error) {
            setError(error)
        }

    }

    function logout() {
        purgeAuth();
    }

    async function register(credentials: User) {
        try {
            const res = await ApiService.post(`${baseUrl}auth/register`, credentials)
            let data = res.data.data
            setAuth(data)
        } catch (error) {
            setError(error)
        }
    }

    function forgotPassword(email: string) {
        return ApiService.post("forgot_password", email)
            .then(() => {
                setError({});
            })
            .catch(({ response }) => {
                setError(response.data.errors);
            });
    }

    function verifyAuth() {
        if (!JwtService.getToken()) {
            setError("You are not authorized for this action")
            purgeAuth()
        } else {
            return isAuthenticated.value = true
        }
    }

    return {
        errors,
        user,
        isAuthenticated,
        login,
        logout,
        register,
        forgotPassword,
        verifyAuth,
    };
});
