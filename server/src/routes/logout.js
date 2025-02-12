import { User } from "../lib/db.js";
import jwt from "jsonwebtoken";
import express from 'express';
const logOutRouter = express.Router();
logOutRouter.get('/', async (req, res) => {
    try {
        const d = await User.findByIdAndUpdate(req.id, {refreshToken: ""});
        res.clearCookie("jwt", {httpOnly: true, sameSite : 'None', maxAge: 7*24*60*60*1000, secure: true});

    } catch (error) {
        res.status(500).json({message: "Internal server error"});
        
    }
})
