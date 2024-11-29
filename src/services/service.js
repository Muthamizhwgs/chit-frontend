import useAxiosInterceptors from "../Axios/interceptors";

export const Login = async (data) => {
  let ApiResponse = await useAxiosInterceptors.post("auth/login", data);
  return ApiResponse;
};

export const AddChit = async (data) => {
  let ApiResponse = await useAxiosInterceptors.post("chit", data);
  return ApiResponse;
};

export const getChits = async () => {
  let ApiResponse = await useAxiosInterceptors.get("chit/getChits");
  return ApiResponse;
};

export const createUsers = async (data) => {
  let ApiResponse = await useAxiosInterceptors.post(
    "/users/chituser/create",
    data
  );
  return ApiResponse;
};

export const getChitUsers = async () => {
  let ApiResponse = await useAxiosInterceptors.get("chit/getChitUsers");
  return ApiResponse;
};

export const getChitsList = async () => {
  let ApiResponse = await useAxiosInterceptors.get("chit/getChitsList");
  return ApiResponse;
};

export const getUserList = async () => {
  let ApiResponse = await useAxiosInterceptors.get("chit/getUserList");
  return ApiResponse;
};

export const createMap = async (data) => {
  let ApiResponse = await useAxiosInterceptors.post("chit/createMap", data);
  return ApiResponse;
};

export const getChitsMaps = async () => {
  let ApiResponse = await useAxiosInterceptors.get("chit/getChitsMaps");
  return ApiResponse;
};

export const getChitMapDetailsById = async (id) => {
  let ApiResponse = await useAxiosInterceptors.get("chit/getChits/" + id);
  return ApiResponse;
};

export const getAdminForSuperAdmin = async () => {
  let ApiResponse = await useAxiosInterceptors.get("users/getAdmin/users");
  return ApiResponse;
};
export const EditAdminForSuperAdmin = async (id, data) => {
  const ApiResponse = await useAxiosInterceptors.put(
    "users/getAdmin/users" + id,
    data
  );
  return ApiResponse;
};

export const UpdateChituserById = async (id, data) => {
  const ApiResponse = await useAxiosInterceptors.put(
    "users/updateChitAdmins/" + id,
    data
  );
  return ApiResponse;
};

export const getUsersByAdmin = async () => {
  const ApiResponse = await useAxiosInterceptors.get(
    "users/getUsersfor/reference"
  );
  return ApiResponse;
};

export const getMyChits = async () => {
  let ApiResponse = await useAxiosInterceptors.get("chit/getchit/byUser");
  return ApiResponse;
};

export const companyCreation = async (data) => {
  let ApiResponse = await useAxiosInterceptors.post("chit/creatCompany", data);
  return ApiResponse;
};

export const getAllCompany = async () => {
  let ApiResponse = await useAxiosInterceptors.get("chit/creatCompany");
  return ApiResponse;
};

export const editCompany = async (id, data) => {
  let ApiResponse = await useAxiosInterceptors.put("chit/company/" + id, data);
  return ApiResponse;
};

export const getChitReports = async () => {
  let ApiResponse = await useAxiosInterceptors.get("chit/getChitReports");
  return ApiResponse;
};

export const UpdateChitcompanyById = async (id, data) => {
  const ApiResponse = await useAxiosInterceptors.put(
    "chit/company/" + id,
    data
  );
  return ApiResponse;
};

export const getChitCompany = async () => {
  let ApiResponse = await useAxiosInterceptors.get("chit/creatCompany");
  return ApiResponse;
};

export const getAuctionDetails = async (company, group) => {
  let ApiResponse = await useAxiosInterceptors.get(
    `chit/getAuction/details/admin?company=${company}&group=${group}`
  );
  return ApiResponse;
};

//from2.0
export const ResetAuction = async (data)=>{
  let ApiResponse = await useAxiosInterceptors.post("chit/reset/auctions", data);
  return ApiResponse
}
export const updateAuctioToEveryOne = async (id, data) => {
  let ApiResponse = await useAxiosInterceptors.put(
    "chit/update/auction/toeveryone/" + id,
    data
  );
  return ApiResponse;
};

export const getAuctionDetailsByChit = async (id) => {
  let ApiResponse = await useAxiosInterceptors.get(
    "chit/getauctions/Detail/byChit/" + id
  );
  return ApiResponse;
};

export const Monthly_Auction = async (data) => {
  let ApiResponse = await useAxiosInterceptors.post("chit/auction/month", data);
  return ApiResponse;
};

export const getGroupByCompany = async (id) => {
  let ApiResponse = await useAxiosInterceptors.get(
    "chit/getgroups/bycompany/" + id
  );
  return ApiResponse;
};
export const getchitsByCompany = async (id) => {
  let ApiResponse = await useAxiosInterceptors.get(
    "chit/getchits/bycompany/" + id
  );
  return ApiResponse;
};

export const getgroupsBychits = async (id) => {
  let ApiResponse = await useAxiosInterceptors.get(
    "chit/get/groups/bychits/" + id
  );
  return ApiResponse;
};

export const getcustomersbyDates = async (id) => {
  let ApiResponse = await useAxiosInterceptors.get(
    "chit/getchit/customers/bydates/" + id
  );
  return ApiResponse;
};

export const getCustomersByGroups = async (id) => {
  let ApiResponse = await useAxiosInterceptors.get(
    "chit/getcustomers/bygroups/" + id
  );
  return ApiResponse;
};

export const Monthly_AuctionSubmit = async (data) => {
  let ApiResponse = await useAxiosInterceptors.post(
    "chit/submit/monthly/auction",
    data
  );
  return ApiResponse;
};

export const getPayments = async () => {
  let ApiResponse = await useAxiosInterceptors.get("chit/getPayments");
  return ApiResponse;
};

export const getAuctionsDates = async () => {
  let ApiResponse = await useAxiosInterceptors.get("chit/get/auctions/dates");
  return ApiResponse;
};

export const getHolds = async () => {
  let ApiResponse = await useAxiosInterceptors.get("chit/get/holds/data");
  return ApiResponse;
};

export const hold_To_Completed = async (id) => {
  let ApiResponse = await useAxiosInterceptors.get("chit/hold/to/completed/"+id);
  return ApiResponse;
};

export const PayAndPrint = async (id,chitId,grpId)=>{
  let ApiResponse = await useAxiosInterceptors.get('chit/getpayments/detailsByUser/'+id+'/'+chitId+'/'+grpId)
  return ApiResponse
}

export const getUserData = async (id) => {
  let ApiResponse = await useAxiosInterceptors.get(
    "chit/get/payments/details/" + id
  );
  return ApiResponse;
};

export const PDFGend = async (data)=>{
  let ApiResponse  = await useAxiosInterceptors.post('chit/generate/Pdf', data)
  return ApiResponse
}


export const updateChitById = async (id,data)=>{
  let ApiResponse  = await useAxiosInterceptors.put('chit/updateChitById/'+id, data)
  return ApiResponse
}


export const getChitMapsById = async (id)=>{
  let ApiResponse  = await useAxiosInterceptors.get('chit/getChits/mapsbyId/'+id)
  return ApiResponse
}