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
    name: {type : String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    refreshToken: {type: String, required: false},
});

const postsSchema = new mongoose.Schema({
    email: { type: String, required: true },
    Name: { type: String, required: true },
    city : {type : String, required : true},
    post: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        location: { type: String, required : true }
    }
});



const posts = mongoose.model('Posts', postsSchema);
const User = mongoose.model('User', schema);

export { connectDb, User, posts };