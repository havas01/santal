import { mongoose } from "mongoose";
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected sucessfully"); 
    } catch (error) {
        console.error("Error connecting to database: ", error);
    }
}

const schema = new mongoose.Schema({
    name: {type : String, required: false},
    password: {type: String, required: false},
    email: {type: String, required: false},
    refreshToken: {type: String, required: false},
});

const postsSchema = new mongoose.Schema({
    email: { type: String, required: false },
    Name: { type: String, required: false },
    city : {type : String, required : false},
    post: {
        title: { type: String, required: false },
        description: { type: String, required: false },
        price: { type: Number, required: false },
        location: { type: String, required : false }
    }
});



const posts = mongoose.model('Posts', postsSchema);
const User = mongoose.model('User', schema);
export { connectDb, User, posts };