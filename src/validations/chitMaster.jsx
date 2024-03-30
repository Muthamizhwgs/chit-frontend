import * as Yup from "yup";

export const ChitMasterSchema =  Yup.object({
    companyName:Yup.string(),
    chitName:Yup.string().required("Enter chitName "),
    chitAmount:Yup.string().required("Enter chit Amount"),
    noOfPeople:Yup.string().required("Enter no Of People"),
    months:Yup.string().required("Enter Months"),
    companyId:Yup.string().required("select Company"),
    describeDate: Yup.string().required("Auction date is required"),
//     groups: Yup.array()
//     .min(1, "At least one group is required")
//     .required("Groups are required"),
 })


export const ChitMasterinitValue = {
    companyName:'',
    chitName:'',
    chitAmount:'',
    noOfPeople:'',
    describeDate:'',
    months:'',
    companyId:'',
    // groups:''
}