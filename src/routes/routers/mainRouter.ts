import * as express from "express";
import {extendUserRouter} from "./userRouter";
import {extendBlogsRouter} from "./blogsRouter";

export const createMainPageRouter = () => {

    const router = express.Router()

    router.get('/', (reg, res) => {
        res.json('Hello world')
    })

    extendUserRouter(router)
    extendBlogsRouter(router)

    return router
}