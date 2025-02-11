import express from 'express';
const Router = express.Router();
import { login } from '../controllers/auth.js';
Router.post('/', async (req, res) => {
    try {
        await login(req, res);
    } catch (error) {
        console.error("Error logging in: ", error.message);
        res.status(500).json({message: "Internal server error"});      
    }
})
const loginRouter = Router;
export default loginRouter;