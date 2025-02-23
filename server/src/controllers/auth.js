import { User } from "../lib/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
    try {
        const {userName, password, email} = req.body;
        let userExists = await User.findOne({ email }) || await User.findOne({ name: userName });
        if(userExists !== null){
            return res.status(400).json({message: "User already exists"});
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
        const accessToken = jwt.sign({userId : user._id, userName, email}, process.env.ACCESS_TOKEN, {expiresIn: "120m"});
        res.cookie("refreshToken", RefreshToken, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7, sameSite: 'None', secure: true});
        res.json({userName, email, accessToken});
    } catch (error) {
        console.error("Error signing up: ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export { login, signup };
