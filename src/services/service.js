import useAxiosInterceptors from "../Axios/interceptors";

export const Login = async (data) => {
    let ApiResponse = await useAxiosInterceptors.post("auth/login", data);
    return ApiResponse;
};

export const AddChit = async (data) => {
    let ApiResponse = await useAxiosInterceptors.post('chit', data);
    return ApiResponse
}

export const getChits = async () => {
    let ApiResponse = await useAxiosInterceptors.get('chit/getChits')
    return ApiResponse
}

export const createUsers = async (data) => {
    let ApiResponse = await useAxiosInterceptors.post('/users/chituser/create', data)
    return ApiResponse
}

export const getChitUsers = async () => {
    let ApiResponse = await useAxiosInterceptors.get('chit/getChitUsers')
    return ApiResponse
}

export const getChitsList = async () => {
    let ApiResponse = await useAxiosInterceptors.get('chit/getChitsList');
    return ApiResponse
}

export const getUserList = async () => {
    let ApiResponse = await useAxiosInterceptors.get('chit/getUserList');
    return ApiResponse
}

export const createMap = async (data) => {
    let ApiResponse = await useAxiosInterceptors.post("chit/createMap", data);
    return ApiResponse
}

export const getChitsMaps = async () => {
    let ApiResponse = await useAxiosInterceptors.get("chit/getChitsMaps")
    return ApiResponse
}

export const getChitMapDetailsById = async (id) => {
    let ApiResponse = await useAxiosInterceptors.get("chit/getChits/" + id)
    return ApiResponse
}

export const getAdminForSuperAdmin = async () => {
    let ApiResponse = await useAxiosInterceptors.get("users/getAdmin/users")
    return ApiResponse
}
export const EditAdminForSuperAdmin = async (id, data) => {
    const ApiResponse = await useAxiosInterceptors.put("users/getAdmin/users" + id, data)
    return ApiResponse
}

export const UpdateChituserById = async (id,data)=>{
    const ApiResponse = await useAxiosInterceptors.put("users/updateChitAdmins/"+id, data)
    return ApiResponse
}


export const getUsersByAdmin = async()=>{
    const ApiResponse = await useAxiosInterceptors.get("users/getUsersfor/reference");
    return ApiResponse
}

export const getMyChits = async ()=>{
    let ApiResponse = await useAxiosInterceptors.get("chit/getchit/byUser")
    return ApiResponse
}

export const companyCreation = async (data)=>{
    let ApiResponse = await useAxiosInterceptors.post("chit/creatCompany", data)
    return ApiResponse
}

export const getAllCompany = async ()=>{
    let ApiResponse = await useAxiosInterceptors.get("chit/creatCompany")
    return ApiResponse
}

export const  editCompany = async (id, data)=>{
    let ApiResponse = await useAxiosInterceptors.put("chit/company/"+id, data)
    return ApiResponse

}

export const getChitReports = async ()=>{
    let ApiResponse = await useAxiosInterceptors.get("chit/getChitReports")
    return ApiResponse
}

export const UpdateChitcompanyById = async (id,data)=>{
    const ApiResponse = await useAxiosInterceptors.put("chit/company/"+id, data)
    return ApiResponse
}

export const getChitCompany = async () => {
    let ApiResponse = await useAxiosInterceptors.get('chit/creatCompany')
    return ApiResponse
}

export const getAuctionDetails = async (company, group)=>{   
     let ApiResponse = await useAxiosInterceptors.get(`chit/getAuction/details/admin?company=${company}&group=${group}`)
    return ApiResponse
}

export const getAuctionDetailsByChit = async (id)=>{   
    let ApiResponse = await useAxiosInterceptors.get('chit/getauctions/Detail/byChit/'+id)
   return ApiResponse
}

export const Monthly_Auction = async (data)=>{   
    let ApiResponse = await useAxiosInterceptors.post('chit/auction/month', data)
   return ApiResponse
}

export const getGroupByCompany = async (id)=>{   
    let ApiResponse = await useAxiosInterceptors.get('chit/getgroups/bycompany/'+id)
   return ApiResponse
}

// getgroups/bycompany/:id