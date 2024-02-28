import * as Yup from "yup";

export const AuctionSchema = Yup.object({
    chitAmount: Yup.string().required("Enter Bidding Amount"),
})

export const AuctionInitValues = {
    chitAmount: "",
}