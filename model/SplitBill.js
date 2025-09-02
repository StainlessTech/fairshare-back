import mongoose from "mongoose";

const SplitBillSchema = new mongoose.Schema(
    {
        billDate: {type: String, required: true},
        billTitle: {type: String, required: true},
        method: {type: String, required: true},

        participants: [
            {
                name: {type: String, required: true},
                phone: {type: String},
                avatar: {type: String},
                percentage: {type: Number},
            },
        ],

        perPerson: [{type: Number, required: true}],
        total: {type: Number, required: true},
    },
    {timestamps: true}
);

export default mongoose.model("SplitBill", SplitBillSchema);
