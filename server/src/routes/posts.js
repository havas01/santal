import express from 'express';
import { getPosts, createPost } from '../controllers/post.controller.js';
const Router = express.Router();
Router.get('/', async (req, res) => {
    try {
        await getPosts(req, res);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
})
Router.post('/', async (req, res) => {
    try {
        await createPost(req, res);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
})

const postsRouter = Router;
export default postsRouter;