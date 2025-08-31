import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    amount: {type: Number, required: true},
    category: {type: String, required: true},
    date: {type: Date, default: Date.now},
    description: String

}, {timestamps:true})

export default mongoose.model("Expense", expenseSchema)