import mongoose from "mongoose";
import { number } from "zod";
import { required } from "zod/mini";

const transactionSchema = new mongoose.Schema({
    
    userId: {type: String, required: true}, 
    plan: {type: String, required: true},
    amount: {type: Number, required: true},
    credits: {type: Number, required: true},
    payment: {type: Boolean, default: false},
    razorpay_payment_id: {type: String}, 
    razorpay_order_id: {type: String},
    date: {type: Number}
});

const transactionModel = mongoose.models.transaction || mongoose.model("transaction", transactionSchema);

export default transactionModel