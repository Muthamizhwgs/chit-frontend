import * as Yup from "yup";

export const CompanySchema = Yup.object({
    companyName: Yup.string().required("Enter company Name "),
    commissionAmount: Yup.string().required("Enter commission Amount"),
})

export const CompanyinitValue = {
    companyName: '',
    commissionAmount: '',
}