import * as Yup from "yup";

export const ChitMasterSchema =  Yup.object({
    companyName:Yup.string().required("Enter companyName "),
    chitName:Yup.string().required("Enter chitName "),
    chitAmount:Yup.string().required("Enter chit Amount"),
    Commission:Yup.string().required("Enter commission"),
    group:Yup.string().required("Enter group"),
    noOfPeople:Yup.string().required("Enter no Of People"),
    describeDate:Yup.string().required("Enter describeDate"),
    months:Yup.string().required("Enter Months"),
})


export const ChitMasterinitValue = {
    companyName:'',
    chitName:'',
    chitAmount:'',
    commission:'',
    group:'',
    noOfPeople:'',
    describeDate:'',
    months:''
}