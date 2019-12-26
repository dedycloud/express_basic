import {Router} from 'express';
import { UserService } from '../services';


const userService = new UserService();
const UserRouter = Router()
    .get('/users', async ( req, res)=>{
        try {
            const users = await userService.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })
    .post('/user', async ( req, res)=>{
        try {
            let {body} = req;
            let user = body;
             // let user = {...req.body};
            user = await userService.createUser(user);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })
    .put('/user', async ( req, res)=>{
        try {
            let {body} = req;
            let user = body;
            user = await userService.updateUser(user);
            res.status(200).json(user);

        } catch (error) {
            res.status(error.status).send(error.message)        }
    })
    .get('/user/:id', async ( req, res)=>{
        try {
            const {params} = req;
            const user = await userService.findUserById(params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(error.status).send(error.message)
        }
    })
    .get('/users/:fullname?', async ( req, res)=>{
        try {
            const {params} = req;
            const user = await userService.findFullNameWithTO(params.fullname);
            res.json(user);
        } catch (error) {
            res.status(error.status).send(error.message)
        }
    })

    .get('/userss', async ( req, res)=>{
        try {
            const {body} = req;
            const user = await userService.searchBody(body);
            res.json(user);
        } catch (error) {
            res.status(error.status).send(error.message)
        }
    })

    .get('/users-username', async ( req, res)=>{
        try {
            const {body} = req;
            const user = await userService.cari(body);
            res.status(200).json(user);
        } catch (error) {
            res.status(error.status).send(error.message)
        }
    })
    .get('/user/:email(\\S+@\\S+)', async ( req, res)=>{
        try {
            const {params} = req;
            const user = await userService.findByEmail(params.email);
            if (user) res.json(user);
            else res.status(404).json({ message : `User ID ${params.email} not found.`});
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })

    .delete('/user/:id',async (req,res)=>{
        try {
            let {params} = req;
            await userService.deleteUser(params.id);
            res.status(200).json({message:"success"});
        }catch (e) {
            res.status(e.status).send(e.message)
        }
    })
export default UserRouter;