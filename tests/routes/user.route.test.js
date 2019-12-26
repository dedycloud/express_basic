import mockRequest from 'supertest';
import {app} from '../../src/app';
import UserService from '../../src/services/user.service'
import {application} from "express";

let appTest;
let service;

describe('user route', () => {

    beforeAll(async () => {
        appTest = await app();
        service = new UserService();
        await service.userRepository().clear();
    })

    beforeEach(async () => {
        await service.userRepository().clear();
    })

    it('post should create a user', async () => {
        const response = await mockRequest(appTest)
            .post('/user').set('Accept', 'application/json')
            .send({username: "dedy.indaaa", email: "dedyindra351@gmail.com", fullname: "dedy indra setiawan"});
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.username).toEqual('dedy.indaaa')
    });
    it('get should get a user by id', async () => {
        let expected ={
            username:"dedy.indra",
            email:"dedyindra@gmail.com",
            fullname:"dedy indra setiawan"
        };
             let expectedUser = await service.userRepository().save(expected)
            const response = await mockRequest(appTest)
            .get(`/user/${expectedUser.id}`);
            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual(expectedUser);
    });

    it('get should get a user', async () => {
        let expected ={
            username:"dedy.indra",
            email:"dedyindra@gmail.com",
            fullname:"dedy indra setiawan"
        };
         await service.userRepository().save(expected)
        const response = await mockRequest(appTest)
            .get('/users').set('Accept', 'application/json');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveLength(1);
    });
});