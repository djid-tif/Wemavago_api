import {Request, Response} from "express";
import {AuthController} from "../controller/auth";
import {PostController} from "../controller/post";
import multer, { FileFilterCallback } from 'multer'
import {AuthMiddleware} from "../middleware/auth.middleware";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./upload");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix
            + "." + file.originalname.substring(file.originalname.indexOf(".") + 1));
    },
});

const upload = multer({storage});

export class Routes {

    public contactController: AuthController = new AuthController();
    public postController: PostController = new PostController();
    public authMiddleware: AuthMiddleware = new AuthMiddleware();

    public routes(app): void {
        app.route("/auth/login")
            .post(this.contactController.login);
        app.route("/auth/register")
            .post(this.contactController.register);

        app.route("/post/create")
            .post(this.authMiddleware.authentication ,upload.single("file") ,this.postController.createPost)

        app.route("/test")
            .post(this.contactController.index);
    }
}
