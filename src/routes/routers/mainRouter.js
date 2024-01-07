"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMainPageRouter = void 0;
var express = require("express");
var tokens_1 = require("../../servives/tokens");
var userAuthMiddleware_1 = require("../middlewares/userAuthMiddleware");
var validationResult_1 = require("../middlewares/validationResult");
var createMainPageRouter = function () {
    var router = express.Router();
    router.get('/', function (reg, res) {
        res.json('Hello world');
    });
    router.get('/login', function (req, res) {
        res.send('HELLO WORLD');
    });
    router.post('/login', userAuthMiddleware_1.authValidation, validationResult_1.errorsChecker, function (req, res) {
        var token = tokens_1.tokensHandler.createToken(req.body.email, req.body.password);
        res.json({
            success: true,
            token: token
        });
    });
    return router;
};
exports.createMainPageRouter = createMainPageRouter;
