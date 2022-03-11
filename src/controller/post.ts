import {AuthController} from "./auth";
import {Request, Response} from "express";
import {Post} from "../entity/Post";
import {getManager, getRepository} from "typeorm";
import {User} from "../entity/User";
import * as jwt from 'jsonwebtoken'




export class PostController {
    public async createPost(req: Request, res: Response) {
        let post = new Post;
        post.title = req.body.title;
        post.description = req.body.description;
        post.file_name = req.file.filename;

        // console.log(post);
        // console.log(req.file.filename);
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'SECRET_KEY', function (err, decoded) {
            console.log(decoded)
            console.log(err)
        });

        let decoded = jwt.verify(token, 'SECRET_KEY');
        console.log(decoded.userId)

        const user: User = await getManager().findOne(User, {id: decoded.userId});
        console.log(user)
        post.user = user;

        if (!user) {
            res.status(404).json({
                message: "undefined email"
            });
            return;
        }


        getRepository(Post).save(post)
            .then(() => res.status(201).json({
                message: "Hello boi  !",
                data: {post}
            }))
            .catch((err) => res.status(401).json({err}));
    }
}