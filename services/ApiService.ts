import type { App } from "vue";
import type { AxiosResponse } from "axios";
import axios from "axios";
import JwtService from "./JwtService";
import VueAxios from "vue-axios";

const baseUrl = "http://localhost:5005/api/"

/**
 * @description service to call HTTP request via Axios
*/
class ApiService {
    /**
     * @description property to share vue instance
     */
    public static vueInstance: App;

    /**
     * @description initialize vue axios
     */
    public static init(app: App<Element>) {

        ApiService.vueInstance = app;
        ApiService.vueInstance.use(VueAxios, axios)
        ApiService.vueInstance.axios.defaults.baseURL = baseUrl
        // ApiService.vueInstance.axios.interceptors.response.use(
        //     function (response) {
        //         if (response.data.message === "Unauthenticated.") {
        //             useAuthStore().logout();
        //         }
        //         return response;
        //     },
        //     function (error) {
        //         return Promise.reject(error);
        //     }
        // )
        // ApiService.vueInstance.axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL


    }



    /**
     * @description set the default HTTP request headers
     */
    public static setHeader(): void {
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${JwtService.getToken()}`;
        axios.defaults.headers.common["Accept"] =
            "application/json";

    }

    /**
     * @description send the GET HTTP request
     * @param resource: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    // public static query(resource: any, params: any): Promise<AxiosResponse> {
    //     ApiService.setHeader();
    //     axios.get(resource, params);
    // }

    /**
     * @description send the GET HTTP request
     * @param resource: string
     * @param slug: string
     * @returns Promise<AxiosResponse>
     */
    public static get(
        resource: string,
    ): Promise<AxiosResponse> {
        return axios.get(`${resource}`);
    }

    // public static get(
    //     resource: string,
    //     slug = "" as string
    // ): Promise<AxiosResponse> {
    //     return axios.get(`${resource}/${slug}`);
    // }

    /**
     * @description set the POST HTTP request
     * @param resource: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    public static post(resource: string, params: any): Promise<AxiosResponse> {
        ApiService.setHeader();
        return axios.post(`${resource}`, params);
    }

    /**
     * @description send the UPDATE HTTP request
     * @param resource: string
     * @param slug: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    public static update(
        resource: string,
        slug: string,
        params: any
    ): Promise<AxiosResponse> {
        ApiService.setHeader();
        return axios.put(`${resource}/${slug}`, params);
    }

    /**
     * @description Send the PUT HTTP request
     * @param resource: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    public static put(resource: string, params: any): Promise<AxiosResponse> {
        ApiService.setHeader();
        return axios.put(`${resource}`, params);
    }

    /**
     * @description Send the DELETE HTTP request
     * @param resource: string
     * @returns Promise<AxiosResponse>
     */
    public static delete(resource: string): Promise<AxiosResponse> {
        ApiService.setHeader();
        return axios.delete(resource);
    }

}

export default ApiService;

