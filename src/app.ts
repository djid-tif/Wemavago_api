import * as bodyParser from "body-parser";
import express from "express";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import {Routes} from "./routes/routes";
import {Post} from "./entity/Post";
require('dotenv').config();


class App {
    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    // public pgUrl: string = "postgres://"+ process.env.DB_USER + ":" + process.env.DB_PASS + "@"+ process.env.DB_HOST +"/" + process.env.DB_NAME;
    constructor() {
        this.config();
        this.pgSetup();
        this.routePrv.routes(this.app);
    }
    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
            next();
        });
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files
        this.app.use(express.static("public"));
    }

    private pgSetup(): void {
        createConnection()
            .then(() => console.log("database was connected"))
            .catch((err) => {
                console.log(err);
            });
    }

}

export default new App().app;
