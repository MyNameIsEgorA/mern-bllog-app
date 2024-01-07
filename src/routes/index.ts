import * as express from 'express'
import {createMainPageRouter} from "./routers/mainRouter";
import {connectDB} from "../data/connectDataBase";

const app = express()

app.use(express.json())
app.use('/', createMainPageRouter())

const port: number = 5001

const startServer = async () => {

    await connectDB()

    app.listen(port,'127.0.0.1', () => {
        console.log(`Server is running on port ${port}`);
    });

}

startServer()