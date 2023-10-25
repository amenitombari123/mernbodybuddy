import jwt from 'jsonwebtoken';
import ENV from '../config.js';

/** auth middleware */
export default async function Auth(req, res, next) {
    try {
        // Access the Authorization header to validate the request
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: "No Authorization header provided." });
        }

        // Split the Authorization header to extract the token
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: "No token provided." });
        }

        // Verify the token and decode user details
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);

        req.user = decodedToken;

        // Continue with the next middleware
        next();
    } catch (error) {
        res.status(401).json({ error: "Authentication Failed!" });
    }
}

export function localVariables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}