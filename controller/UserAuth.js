import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const user_register = async (req, res) => {
    try {
        const {fullName, password, email} = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({msg: "Email already in use."});
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            password: passwordHash,
            email,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const user_login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const CheckUser = await User.findOne({email}).select("+password");
        if (!CheckUser) {
            return res.status(400).json({msg: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, CheckUser.password);
        if (!isMatch) {
            return res.status(400).json({msg: "Invalid credentials."});
        }

        const token = jwt.sign({id: CheckUser._id}, process.env.JWT_SECRET, {
            expiresIn: "3d",
        });

        const {password: _, ...UserData} = CheckUser._doc;

        res.status(200).json({token, User: UserData});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
