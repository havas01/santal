import { User } from "../lib/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
    try {
        const {userName, password, email} = req.body;
        const {findUser, findEmail} = await Promise.all([User.find({name : userName}), User.find({email})]);
        if(findUser || findEmail) {
            return res.status(400).json({message: "UserName or Email already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({name : userName, password: hashedPassword, email});
        await user.save();
        res.status(201).json({message: "User created successfully"});
    } catch (error) {
        console.error("Error signing up: ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

const login = async (req, res) => { 
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const RefreshToken = jwt.sign({userId : user._id}, process.env.REFRESH_TOKEN, {expiresIn: "7d"});
        user.refreshToken = RefreshToken;
        await user.save();
        const userName = user.name;
        const accessToken = jwt.sign({userId : user._id, userName, email}, process.env.ACCESS_TOKEN, {expiresIn: "15m"});
        res.cookie("refreshToken", RefreshToken, {httpOnly: true, sameSite : 'None', secure: true});
        res.json({accessToken, userName, email});
    } catch (error) {
        console.error("Error signing up: ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export { login, signup };
