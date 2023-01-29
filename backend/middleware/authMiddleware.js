import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async(req, res, next) => {
    let fullToken, token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            fullToken = req.headers.authorization;
            token = fullToken.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id)
            next();
        }catch(error){
            res.status(401);
            throw new Error('Not authorized. Invalid token');
        }
    }

    if(!fullToken){
        res.status(401);
        throw new Error('Not authorized. Token not found');
    }
});

export default protect