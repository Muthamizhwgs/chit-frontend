import * as Yup from "yup";

export const CompanySchema = Yup.object({
    companyName: Yup.string().required("Enter company Name "),
    commission: Yup.string().required("Enter commission"),
    auctionDate: Yup.string().required("Enter Auction Date"),
})

export const CompanyinitValue = {
    companyName: '',
    commission: '',
    auctionDate:'',
}