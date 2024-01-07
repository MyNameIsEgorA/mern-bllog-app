"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
var express_validator_1 = require("express-validator");
var authValidation = function (req, res, next) {
    (0, express_validator_1.body)("email").isEmail();
    (0, express_validator_1.body)("password").isLength({ min: 4, max: 16 });
    (0, express_validator_1.body)("name").isString().isLength({ min: 2, max: 20 });
    (0, express_validator_1.body)('imageURL').optional().isURL();
    console.log(123123);
    next();
};
exports.authValidation = authValidation;
