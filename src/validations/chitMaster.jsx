import * as Yup from "yup";

export const ChitMasterSchema =  Yup.object({
    chitName:Yup.string().required("Enter chitName "),
    chitAmount:Yup.string().required("Enter chit Amount"),
    group:Yup.string().required("Enter group"),
    noOfPeople:Yup.string().required("Enter no Of People"),
    describeDate:Yup.string().required("Enter describeDate"),
    months:Yup.string().required("Enter Months"),
})


export const ChitMasterinitValue = {
    chitName:'',
    chitAmount:'',
    group:'',
    noOfPeople:'',
    describeDate:'',
    months:''
}