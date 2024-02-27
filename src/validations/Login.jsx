import * as Yup from "yup";

export const LoginSchema =  Yup.object({
    phoneNumber:Yup.string().required("Enter Valid Phonenumber"),
    password:Yup.string().required("Enter Password")
})

export const LoginInitialValue = {
    phoneNumber:"",
    password:""
}