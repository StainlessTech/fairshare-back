import express from "express";
import {getProfile, getSplitBills, Split_Bill} from "../controller/controller.js";
import {user_login, user_register} from "../controller/UserAuth.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

router.post("/register", user_register);
router.post("/login", user_login);

router.get("/user-profile/:userId", getProfile);

router.post("/split-bill", Split_Bill);
router.get("/history", getSplitBills);
export default router;
