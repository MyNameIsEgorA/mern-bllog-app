import * as express from 'express'
import {createMainPageRouter} from "./routers/mainRouter";
import {connectDB} from "../data/connectDataBase";
import {upload} from "../servives/imagesHandler";
import {validationResult} from "express-validator";
import {userTokenMiddleware} from "./middlewares/userTokenMiddleware";

const app = express()

app.use(express.json())
app.use('/uploads', express.static('./uploads'))
app.use('/', createMainPageRouter())

const port: number = 5001

app.post("/uploads", userTokenMiddleware, upload.single('image'), (req, res) => {
    res.json({
        url: `uploads/${req.file?.originalname}`
    })
})

const startServer = async () => {

    await connectDB()

    app.listen(port,'127.0.0.1', () => {
        console.log(`Server is running on port ${port}`);
    });

}

startServer()