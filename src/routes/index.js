import express from 'express';
import UserRouter from "./user.route";
import PostRouter from "./post.route";

export default express.Router()
    .use(UserRouter)
    .use(PostRouter)
    .use('./uploads',express.static('uploads'));