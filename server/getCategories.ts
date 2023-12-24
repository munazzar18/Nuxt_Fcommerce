import ApiService from "~/services/ApiService"
import { baseUrl } from "~/helper/constants"


export const getCategories = async () => {
    const res = await ApiService.get(`${baseUrl}category`)
    return res.data.data

}