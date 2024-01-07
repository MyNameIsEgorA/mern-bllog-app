"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokensHandler = void 0;
var jwt = require("jsonwebtoken");
exports.tokensHandler = {
    createToken: function (log, pass) {
        return jwt.sign({
            login: log,
            password: pass
        }, 'secret');
    },
    unCypherToken: function () {
        console.log(123);
    }
};
