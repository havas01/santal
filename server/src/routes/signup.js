import express from 'express';
const Router = express.Router();
import { signup } from '../controllers/auth.js';
Router.post('/', async (req, res) => {
    try {
        await signup(req, res);
    } catch (error) {
        console.error("Error signing up: ", error.message);
        res.status(500).json({message: "Internal server error"});      
    }
})
const signupRouter = Router
export default signupRouter;