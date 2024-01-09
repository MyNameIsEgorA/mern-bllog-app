import {Router, Request, Response} from "express";
import {PostOptions} from "../../servives/postServices";
import {reqWithBody} from "./routerTypes";
import {createPostModel} from "./routerModels";
import {userTokenMiddleware} from "../middlewares/userTokenMiddleware";
import {blogsValidation} from "../middlewares/validationMiddleware";
import {errorsChecker} from "../middlewares/validationResult";
import mongoose from "mongoose";


export const extendBlogsRouter = (router: Router) => {

    router.post(
        '/blogs',
        ...blogsValidation,
        errorsChecker,
        userTokenMiddleware,
        async (req: reqWithBody<createPostModel>, res: Response) => {
        const result = await PostOptions.createPost(
            req.body.title,
            req.body.text,
            req.body.tags,
            req.body.imageURL || '',
            req.userID || '',
        )

        if (!result) {
            res.sendStatus(422)
        }

        res.json(result)

    })

    router.get('/blogs', userTokenMiddleware, async (req, res) => {
        const result = await PostOptions.findAllPosts()
        if (!result) {
            return res.sendStatus(404)
        }

        res.json(result)

    })

    router.get('/blogs/:id', userTokenMiddleware, async (req: Request, res: Response) => {

        const post: false | mongoose.Document = await PostOptions.findPostById(req.params.id)

        post ? res.json(post) : res.sendStatus(404)

    })

    router.delete('/blogs/:id', userTokenMiddleware, async (req: Request, res: Response) => {
        const result = await PostOptions.deleteById(req.params.id)

        result ? res.sendStatus(200) : res.sendStatus(400)
    })

    router.patch(
        '/blogs/:id',
        ...blogsValidation,
        errorsChecker,
        userTokenMiddleware,
        async (req: Request, res: Response) => {
            const result = await PostOptions.updatePost(
                req.params.id,
                req.body.title,
                req.body.text,
                req.body.tags,
                req.body.imageURL || '',
                req.userID || '',
            )

            if (!result) {
                res.sendStatus(422)
            }

            res.json(result)
        })

    return router
}
