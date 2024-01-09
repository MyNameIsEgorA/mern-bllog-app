import {Response, Router} from "express";
import {reqWithBody} from "./routerTypes";
import {authDataModel, loginUserModel} from "./routerModels";
import {loginValidation, registerValidation} from "../middlewares/validationMiddleware";
import {errorsChecker} from "../middlewares/validationResult";
import {UserOptions} from "../../servives/userServices";
import {cypher} from "../../servives/tokens";
import {userTokenMiddleware} from "../middlewares/userTokenMiddleware";

export const extendUserRouter = (router: Router) => {

    router.post('/auth',

        ...registerValidation,
        errorsChecker,

        async (req: reqWithBody<authDataModel>, res: Response) => {

            const [user, token] = await UserOptions.createUser(req.body.email, req.body.password, req.body.name, req.body.imageURL)
            if (!user) {
                return res.status(409).json({error: "Account with this email already exists"})
            }
            res.json({
                success: true,
                user: user,
                token: token
            })

        })

    router.post('/login',

        ...loginValidation,
        errorsChecker,

        async (req: reqWithBody<loginUserModel>, res: Response) => {

            try {
                const user = await UserOptions.findUser(req.body.email, req.body.password)
                if (!user) {
                    return res.sendStatus(404)
                }

                const token: string = cypher.createToken(
                    req.body.email, req.body.password
                )

                res.status(200).json({
                    success: true,
                    token: token,
                    user: user,
                })

            } catch (err) {
                console.log(err)
                res.sendStatus(400)
            }
        }
    )

    router.get('/auth/me', userTokenMiddleware,
        (req, res: Response) => {
            try {
                res.json({success: true, user: req.userID})
            } catch (err) {
                res.sendStatus(401)
            }
        })


    return router
}