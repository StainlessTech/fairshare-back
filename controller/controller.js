import dotenv from "dotenv";

import User from "../model/User.js";
import SplitBill from "../model/SplitBill.js";

dotenv.config();

export const getProfile = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await User.findOne({_id: userId});

        if (!user) {
            return res.status(404).json({message: "Profile not found"});
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};

export const Split_Bill = async (req, res) => {
    try {
        const {billRecord} = req.body;

        if (!billRecord) {
            return res.status(400).json({message: "billRecord is required"});
        }

        const {billDate, billTitle, method, participants, perPerson, total} = billRecord;

        // Validate required fields
        if (!billDate || !billTitle || !method || !participants || !perPerson || !total) {
            return res.status(400).json({message: "All fields are required"});
        }

        const newSplitBill = new SplitBill({
            billDate,
            billTitle,
            method,
            participants,
            perPerson,
            total,
        });

        await newSplitBill.save();

        return res.status(201).json({
            message: "Bill successfully saved",
            bill: newSplitBill,
        });
    } catch (error) {
        console.error("Error splitting a bill:", error);
        return res.status(500).json({message: "Internal server error"});
    }
};

export const getSplitBills = async (req, res) => {
    try {
        const bills = await SplitBill.find();
        res.json(bills);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
