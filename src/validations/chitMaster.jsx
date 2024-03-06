import * as Yup from "yup";

export const ChitMasterSchema =  Yup.object({
    companyName:Yup.string(),
    chitName:Yup.string().required("Enter chitName "),
    chitAmount:Yup.string().required("Enter chit Amount"),
    noOfPeople:Yup.string().required("Enter no Of People"),
    describeDate:Yup.string(),
    months:Yup.string().required("Enter Months"),
    companyId:Yup.string().required("select Company")
})


export const ChitMasterinitValue = {
    companyName:'',
    chitName:'',
    chitAmount:'',
    noOfPeople:'',
    describeDate:'',
    months:'',
    companyId:''
}