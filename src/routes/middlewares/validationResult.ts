import {validationResult} from "express-validator";
import {Request, Response} from "express";

export const errorsChecker = (req: Request, res: Response): boolean => {
    const result = validationResult(req)
    if (result.isEmpty()) {
        return true
    }

    res.status(400).json(result.array())
    return false
}