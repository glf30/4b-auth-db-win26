const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");

dotenv.config()

// custom middleware to verify the token 
// middleware - we need this verification to happen BEFORE we hit the protected route
const verifyToken = (req, res, next) => {

    // our token will be located in the request headers if it exists
    // Authorization headers are for tokens
    const token = req.header("Authorization")

    if(!token){
        // 401 - unauthorized - token not provided
        // in middleware, need to return response to end middleware function
        return res.status(401).json({
            message: "failure",
            payload: "Token not provided"
        })
    }
    // they do have the token!!
    // verify token against our secret key!!!
    // if successful, returns our token data
    const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);

   
    // we can attach that tokenData to our request!!!!
    req.username = tokenData.username;
    
    // next function brings us to our protected route
    next();
}

module.exports = verifyToken;