import { posts } from '../lib/db.js';

const getPosts = async (req, res) => {
    try {
        let allPosts;
        const city = req.query.city.charAt(0).toUpperCase() + req.query.city.slice(1);
        if(!city) {
            allPosts = await posts.find({});
        } else{
            allPosts = await posts.find({city : city});
        }
        res.json(allPosts);
    } catch (error) {
        console.error("Error getting posts: ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

const createPost = async (req, res) => {
    try {
        const { name, content } = req.body;
        const email = req.headers.email;
        const post = new posts({email : email, posts: content, postsname: name});
        await post.save();
        res.status(201).json({message: "Post created successfully"});
    } catch (error) {
        console.error("Error creating post: ", error.message);
        res.status(500).json({message: "Internal server error"});
        
    }
}

export { getPosts, createPost };