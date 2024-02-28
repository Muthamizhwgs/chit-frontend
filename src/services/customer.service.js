import useAxiosInterceptors from "../Axios/interceptors";


export const getChitReports = async ()=>{
    let ApiResponse = await useAxiosInterceptors.get("chit/getChits/customer/details")
    return ApiResponse
}

export const MonthlyAuction = async (data)=>{
    let ApiResponse = await useAxiosInterceptors.post("chit/auction/details", data)
    return ApiResponse
}



