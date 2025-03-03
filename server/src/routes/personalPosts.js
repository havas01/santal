import { posts } from "../lib/db.js";
import mongoose from "mongoose";
import express from "express";
const Router = express.Router();
Router.get('/', async (req, res) => {
    try {
        const user = req.user;
        const email = user.email;
        const data = await posts.find({email});
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
})
Router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const pos= await posts.findById(id);
        if(pos.email !== req.user.email){
            res.sendStatus(403);
            return;
        }
        
        const post = await posts.findByIdAndDelete(id);
        res.json({message : 'succesfully deleted'})
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})
Router.post('/', async (req, res) => {
    try {
        const post = req.body;
        post.email = req.user.email;
        await new posts(post).save();
        res.status(201).send('sucess full')
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})
export default Router;