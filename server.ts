import * as http from "http";
import app from "./src/app";
const PORT = 3000;

http.createServer(app).listen(PORT, () => {
    console.log("Express server listening on port " + PORT);
});
