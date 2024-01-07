import * as jwt from 'jsonwebtoken'
import {Request, Response} from "express";
import {NextFunction} from "express";
import {UserOptions} from "../../servives/userServices";
import {errorsChecker} from "./validationResult";
import UsersData from "../../data/usersData";


export const userTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token: string = (req.headers.authorization || '').replace('Bearer ', '')

    if (token) {
        try {
            const decodedToken = jwt.verify(token, 'secret')
            if (typeof (decodedToken) === "string") {
                res.sendStatus(401)
                return 0;
            }
            const user = await UserOptions.findUser(decodedToken.login, decodedToken.password)
            if (user) {
                req.body.data = UserOptions.userAPI(user)
                next(); // передаем управление следующему middleware
            }

        } catch (err) {
            res.sendStatus(401)
        }
    } else {
        res.sendStatus(401) // передаем управление следующему middleware с ошибкой
    }
}