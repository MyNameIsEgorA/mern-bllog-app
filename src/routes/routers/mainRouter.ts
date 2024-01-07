import * as express from "express";
import {reqWithBody} from "./mainRouterTypes";
import {authDataModel, loginUserModel, userWithToken} from "./mainRouterModels";
import {authValidation} from "../middlewares/userAuthMiddleware";
import {errorsChecker} from "../middlewares/validationResult";
import {UserOptions} from "../../servives/userServices";
import {cypher} from "../../servives/tokens";
import {userTokenMiddleware} from "../middlewares/userTokenMiddleware";

export const createMainPageRouter = () => {

    const router = express.Router()

    router.get('/', (reg, res) => {
        res.json('Hello world')
    })

    router.get('/login', (req, res) => {
        res.send('HELLO WORLD')
    })

    router.post('/auth',

        ...authValidation,

        async (req: reqWithBody<authDataModel>, res) => {
        if (!errorsChecker(req, res)) {
            return
        }

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

    router.post('/login', async (req: reqWithBody<loginUserModel>, res) => {
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
                user: UserOptions.userAPI(user),
            })

        } catch (err) {
            console.log(err)
            res.sendStatus(400)
        }
    })

    router.get('/auth/me', userTokenMiddleware,
        (req: reqWithBody<any>, res) => {
            try {
                res.json({success: true, user: req.body.data})
            } catch (err) {
                res.sendStatus(401)
            }
        })


    return router
}