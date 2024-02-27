import * as Yup from "yup";

export const AuctionSchema = Yup.object({
    chitAmount: Yup.string().required("Enter chit Amount"),
})

export const AuctionInitValues = Yup.object({
    ChitAmouont: "",
})