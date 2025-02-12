import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../lib/db.js';
const Router = express.Router();
Router.get('/', async (req, res) => {
    try {
        const cookie = req.cookies.jwt;
        if (!cookie) return res.status(401).json({message: "Unauthorized"});
        jwt.verify(cookie, process.env.REFRESH_TOKEN, async (err, user) => {
            const user1 = await User.findById(user.userId);
            if (!user1) return res.status(401).json({message: "Unauthorized"});
            if(user1.refreshToken !== cookie) return res.status(401).json({message: "Unauthorized"});
            const accessToken = jwt.sign({userId : user1._id, userName: user1.name, email: user1.email}, process.env.ACCESS_TOKEN, {expiresIn: "15m"});
            res.cookie("accessToken", accessToken, {httpOnly: true, sameSite : 'None', maxAge: 15*60*1000, secure: true});
            res.json({userName: user1.name, email: user1.email});
        })
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
})

const refreshRouter = Router;
export default refreshRouter;