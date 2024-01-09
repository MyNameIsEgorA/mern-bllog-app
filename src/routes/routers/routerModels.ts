export type authDataModel = {
    email: string,
    password: string,
    name: string,
    imageURL?: string,
}

export type loginUserModel = {
    email: string,
    password: string,
}

export type createPostModel = {
    title: string,
    text: string,
    tags: string,
    imageURL?: string,
}

declare module 'express-serve-static-core' {
    interface Request {
        userID?: string;
    }
}