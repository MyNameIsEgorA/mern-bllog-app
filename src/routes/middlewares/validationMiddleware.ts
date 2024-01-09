import {body, ValidationChain} from 'express-validator'

export const registerValidation: ValidationChain[] = [
    body("email").isEmail().withMessage('incorrect email'),
    body("password").isLength({min: 4, max: 16}).withMessage('password length should be from 4 to 16'),
    body("name").isString().isLength({min: 2, max: 20}).withMessage('incorrect name'),
    body('imageURL').optional().isURL().withMessage('incorrect URL of avatar'),
]

export const loginValidation: ValidationChain[] = [
    body("email").isEmail().withMessage('incorrect email'),
    body("password").isLength({min: 4, max: 16}).withMessage('password length should be from 4 to 16'),
]

export const blogsValidation: ValidationChain[] = [
    body("title").isLength({min: 3}).withMessage('enter the title of the article'),
    body("text").isLength({min: 10}).withMessage('enter the text of the article'),
    body("tags").optional().isString().withMessage('incorrect tags format'),
    body('imageURL').optional().isURL().withMessage('Link should be URL'),
]