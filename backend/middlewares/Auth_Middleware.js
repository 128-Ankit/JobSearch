const jwt = require("jsonwebtoken");
require("dotenv").config();

const Auth = async (req, res, next) => {
    try {
        //extract token from middleware
        const token = req.cookies.token;
        console.log("Token from middleware: ", token);
        //validation - is token present or not
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        };
        //verify token
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        //validation - is token valid or not
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        };
        req.id = decode.userId;
        console.log("From middleware - re.id: ", req.id);
        
        next();
    } catch (error) {
        console.log("Error from middleware: ", error);
    }
};

module.exports = { Auth };