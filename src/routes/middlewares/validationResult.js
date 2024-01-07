"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsChecker = void 0;
var express_validator_1 = require("express-validator");
var errorsChecker = function (req, res, next) {
    var result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty()) {
        console.log(8776957686795769759);
        return next();
    }
    res.status(400).json(result.array());
};
exports.errorsChecker = errorsChecker;
