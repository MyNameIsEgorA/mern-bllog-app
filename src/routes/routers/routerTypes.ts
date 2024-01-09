import {Request} from "express";

export type reqWithBody<T> = Request<{}, {}, T> & { userID?: string };