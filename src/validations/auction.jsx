import * as Yup from "yup";

export const AuctionSchema = Yup.object({
    
    chitName: Yup.string().required("Enter chitName "),
    chitAmount: Yup.string().required("Enter chit Amount"),
})

export const AuctionInitValues = Yup.object({
    chitName:"",
    ChitAmouont:"",
})