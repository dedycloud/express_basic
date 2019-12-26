import createDbConnection from "../../src/databases/connection";
import {UserService} from "../../src/services";
import {fail,deepEqual,equal,throws} from 'assert'
import configure from "../../src/config";

let connection;
let service;

describe('User Service',()=>{
    beforeAll(async ()=>{
        configure();
        connection = await createDbConnection();
        if (!connection.isConnected) fail('unable to create database connection')
        service = new UserService();
        await  service.userRepository().clear();
    });
    beforeEach(async ()=>{
        await  connection.synchronize(true)
    });

    // mock
    const mockRepo = jest.fn(()=>({
        save:jest.fn().mockImplementation((user)=>user),
        findOne:jest.fn().mockImplementation((id)=> ({id:id,username:"",emai:""})),
        findAll :jest.fn().mockImplementation((id)=>([{id:"1234",username:"",emai:""},{id:"1234",username:"",emai:""},{id:"1234",username:"",emai:""}]))
    }));


    it('createUser, should able to create a User', async ()=>{
        const expected ={
            username:"dedy.indra",
            email:"dedyindra@gmail.com",
            fullname:"dedy indra setiawan"
        };
        // // ini mock
        // let service = new UserService() ;
        // jest.spyOn(service,'createUser')
        //     .mockImplementation(()=>mockRepo().save(expected));
        //

        const actual = await service.createUser(expected);
        equal(actual.username,expected.username);

        // let service = new UserService();
        // const SPY =jest.fn(()=>expected)
        // jest.spyOn(service,'create').mockImplementation(()=>SPY(expected));
        //
        // await  service.createUser(expected);
        // expect(SPY).toHaveBeenCalledTimes(1);


    });
    it('getUser, should able to get a User', async ()=>{
        let expected ={
            username:"dedy.indra",
            email:"dedyindra@gmail.com",
            fullname:"dedy indra setiawan"
        };
        // ini mock
        let service = new UserService() ;
        jest.spyOn(service,'createUser')
            .mockImplementation(()=>mockRepo().save(expected));

        // expected = {...await service.userRepository().save(expected)};
        let actual = await service.findUserById(expected.id);
        deepEqual(actual,expected)
    });

it('update ,should able to update a user',async ()=>{
    let data = {
        username:"dedy.indra",
        email:"dedyindra351@gmail.com",
        fullname:"dedy indra setiawan"
    };
    data =  {... await service.userRepository().save(data)};
    let dataUpdate = {...data, username:"dedy.indra.setiawan"};
    let actual = await  service.updateUser(dataUpdate);
    deepEqual(actual,dataUpdate);
})

    it('throw exception, should be able throw when not denied data user', async ()=> {
        let data = {
            username:"dedy.indra",
            email:"dedyindra351@gmail.com",
            fullname:"dedy indra setiawan"
        };
        const expected = {message:"data tidak ada",status:404}
        // function exceptedError(){
        //     throw {message:"data tidak ada",status:404}
        // }
        try {
            await  service.updateUser(data);
        }catch (e) {
            deepEqual(expected,e)
       //     throws(()=>{exceptedError()},e)
        }
    });

    it('should be able delete data ', async ()=> {
        let expected ={
            username:"dedy.indra",
            email:"dedyindra@gmail.com",
            fullname:"dedy indra setiawan"
        };
        expected = {...await service.userRepository().save(expected)};
        service.deleteUser(expected.id)
        let expectedResult = 0;
        let actual = service.userRepository().findOne(expected.id);
            equal(actual.length,expectedResult)
    });
});