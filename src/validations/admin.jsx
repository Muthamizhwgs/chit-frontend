import * as Yup from "yup";

export const AdminSchema = Yup.object({
    name: Yup.string().required("Enter Name "),
    phonenumber: Yup.string().required("Enter phone number"),
    address: Yup.string().required("Enter address"),
})

export const AdminInitValues = {
    name: '',
    phonenumber: '',
    address: '',
}