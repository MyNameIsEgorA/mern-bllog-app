import * as jwt from 'jsonwebtoken'
import {NextFunction, Request, Response} from "express";
import {UserOptions} from "../../servives/userServices";


export const userTokenMiddleware = async (req: any, res: Response, next: NextFunction) => {
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
                req.userID = user._id.toString();
                next(); // передаем управление следующему middleware
            }

        } catch (err) {
            res.sendStatus(401)
        }
    } else {
        res.sendStatus(401) // передаем управление следующему middleware с ошибкой
    }
}