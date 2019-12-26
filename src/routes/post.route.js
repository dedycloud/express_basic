import {Router} from 'express';
import { PostService } from '../services';
const postService = new PostService();
const PostRouter = Router()
    .get('/post', async ( req, res)=>{
        try {
            const posts = await postService.findAllPost();
            res.json(posts);
        } catch (error) {res.status(500).json({message: error.message})}
    })
    .get('/posts', async ( req, res)=>{
        try {
            let {body} = req;
            let post = body;
            const posts = await postService.seacrhAuthor(post);
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })
    .post('/post', async ( req, res)=>{
        try {
            let {body} = req;
            let post = body;
            post = await postService.createPost(post);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })
    .delete('/post/:id',async (req,res)=>{
        try {
            let {params} = req;
            await postService.deleteUser(params.id);
            res.status(200).json({message:"success"});
        }catch (e) {
            res.status(e.status).send(e.message)
        }
    });

export default PostRouter;