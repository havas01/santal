import jwt from 'jsonwebtoken';
const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const email = req.headers.email;
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) {
                return res.status(401).json({message: "Unauthorized"});
            }
            if (user.email !== email) {
                return res.status(401).json({message: "Unauthorized"});
            }
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(401).json({message: "Unauthorized"});
    }
}

export default verifyToken;