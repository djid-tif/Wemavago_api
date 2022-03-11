import {Request, Response} from "express";
import {getManager, getRepository} from "typeorm";
import {User} from "../entity/User";
import * as bcrypt from 'bcrypt';
import {Utils} from "./utils";
import * as jwt from 'jsonwebtoken'
import {Post} from "../entity/Post";


export class AuthController {
    public async index(req: Request, res: Response) {

        const entityManager = getManager();
        const user: User = await entityManager.findOne(User, {
            where: {
                id: "b3155db6-3c0c-498d-846e-240b1b753694",
            },
            relations: ["posts"]
        });
        const post: Post = await entityManager.findOne(Post, {
            where: {
                id: "01ecfdfb-2c4c-49b4-a45b-dab98bc2b0c5",
            },
            relations: ["user"]
        });
        console.log(user)
        res.json({
            message: "Hello boi  !",
            data: {
                user: user,
                post : post
            }
        });
    }
    public createUser(req: Request, res: Response) {

        const user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.userName = req.body.userName;
        getRepository(User).save(user)
            .then(() => res.status(201).json({
                message: "Hello boi  !",
                data: {user}
            }))
            .catch((err) => res.status(401).json({err}));
    }

    public async login(req: Request, res: Response) {

        const email:string = req.body.email;
        const password:string = req.body.password;

        const entityManager = getManager();
        const user:User = await entityManager.findOne(User, {email: email});

        if (!user) {
            res.status(404).json({
                message: "email or password are not valid"
            });
            return;
        }

        let err, result = await bcrypt.compare(password, user.password);
        if (!result) {
            res.status(404).json({
                message: "email or password are not valid"
            });
            return;
        }

        let error, token = await jwt.sign({ userId: user.id }, 'SECRET_KEY', { expiresIn: '1h' });
        if (error == null) {
            res.status(200).json({
                data: {user,token: token}
            });

        }
    }

    public async register(req: Request, res: Response) {
        let user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.userName = req.body.userName;
        user.password = req.body.password;

        const entityManager = getManager();
        const existingEmail:User = await entityManager.findOne(User, {email: user.email});
        console.log(existingEmail)
        if (existingEmail) {
            res.status(404).json({
                message: "existing email !"
            });
            // return;
        }

        const existingUserName = await entityManager.findOne(User, {userName: user.userName});
        console.log(existingUserName)
        if (existingUserName) {
            res.status(404).json({
                message: "existing username !"
            });
            // return;
        }


        if (!Utils.isValidPassword(user.password)) {
            res.status(404).json({
                message: "invalid password !"
            });
            // return;
        }

        let err, password = await bcrypt.hash(user.password, 10);
        if (!err) {
            user.password = password;
        }

        await entityManager.save(user)
        res.status(201).json({data: {user}})

    }
}
