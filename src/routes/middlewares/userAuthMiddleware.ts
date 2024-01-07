import {body, ValidationChain} from 'express-validator'

export const authValidation: ValidationChain[] = [
    body("email").isEmail().withMessage('incorrect email'),
    body("password").isLength({min: 4, max: 16}).withMessage('password length should be from 4 to 16'),
    body("name").isString().isLength({min: 2, max: 20}).withMessage('incorrect name'),
    body('imageURL').optional().isURL().withMessage('incorrect URL of avatar')
]