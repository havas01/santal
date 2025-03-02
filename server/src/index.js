import express from 'express';
import signupRouter from './routes/signup.js';
import loginRouter from './routes/login.js';
import cookieParser from 'cookie-parser';
import verifyToken from './middleware/verifyToken.js';
import postsRouter from './routes/posts.js';
import refreshRouter from './routes/refresh.js';
import { connectDb } from './lib/db.js';
import personalRouter from './routes/personalPosts.js'
import cors from 'cors';
connectDb();
const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
    }));
app.use(cookieParser())
app.use(express.json());
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/refresh', refreshRouter);
app.use('/posts', postsRouter);
app.use(verifyToken);
app.use('/personalPosts', personalRouter);

app.listen('5000', () => {
    console.log(`Server is running on http://localhost:5000`);
});