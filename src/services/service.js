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