import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';



const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const openRoutes = ['/auth/sign-in', '/auth/register'];

    if (openRoutes.includes(req.path)) {
        return next(); 
    }
    
    const token = req.cookies['jwt'];

    if (!token) {
        return res.status(401).send("Unauthorized: No token provided");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        req.body.userID= decoded; // reset the user info for  future usage 
        next(); 
    } catch (err) {
        return res.status(403).send("Forbidden: Invalid token");
    }
};

export default authenticateJWT;
