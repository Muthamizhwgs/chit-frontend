import useAxiosInterceptors from "../Axios/interceptors";


export const getChitReports = async ()=>{
    let ApiResponse = await useAxiosInterceptors.get("chit/getChits/customer/details")
    return ApiResponse
}


