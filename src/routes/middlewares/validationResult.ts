import {validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

export const errorsChecker = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req)
    if (result.isEmpty()) {
        return next()
    }

    res.status(400).json(result.array())
}