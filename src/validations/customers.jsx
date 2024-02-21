import * as Yup from "yup";

export const CustomerSchema = Yup.object({
    name: Yup.string().required("Enter customer Name "),
    phoneNumber: Yup.string().required("Enter Phone number"),
    address: Yup.string().required("Enter Address"),
    reference: Yup.string()
})


export const CustomerInitValue = {
    name: '',
    phoneNumber: '',
    address: '',
    reference: '',
}