import {Request, Response, Next} from "express";
import * as jwt from 'jsonwebtoken'


export class AuthMiddleware {
    public authentication(req: Request, res: Response, next: Next) {
        console.log(req.headers.authorization.split(' ')[1])
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'SECRET_KEY', function(err, decoded) {
            console.log(decoded) // bar
            console.log(err) // bar
        });
        next();
    }
}
