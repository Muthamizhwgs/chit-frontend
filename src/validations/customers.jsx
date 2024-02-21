import * as Yup from "yup";

export const CustomerSchema = Yup.object({
    Name: Yup.string().required("Enter customer Name "),
    phoneNumber: Yup.string().required("Enter Phone number"),
    adress: Yup.string().required("Enter Address"),
    reference: Yup.string()

})


export const CustomerInitValue = {
    Name: '',
    phoneNumber: '',
    adress: '',
    reference: '',
}