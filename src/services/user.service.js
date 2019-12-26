import {getConnection, getRepository, Like} from 'typeorm';
import User from '../models/user.model';

class UserService {
    userRepository() {
        return getRepository(User);
    }

    async findAll() {
        return await this.userRepository().find();
    }

    async findFullName(fullname) {
        return await this.userRepository()
            .createQueryBuilder("users")
            .where(`users.fullname like '%${fullname}%'`)
            .getMany();
    }

    async findFullNameWithTO(name) {
        let user = await this.userRepository().find({fullname: Like(`%${name}%`)});
        if (user === undefined) {
            throw {message: "data tidak ada", status: 404}
        }
        return user;
    }

    async searchUser(user) {
        if (!user.username) {
            return await this.userRepository()
                .createQueryBuilder("users")
                .where(`users.email like '%${user.email}%'`)
                .andWhere(`users.fullname like '%${user.fullname}%'`)
                .getMany()
        }
        if (!user.email) {
            return await this.userRepository()
                .createQueryBuilder("users")
                .where(`users.username like '%${user.username}%'`)
                .andWhere(`users.fullname like '%${user.fullname}%'`)
                .getMany()
        }
        if (!user.fullname) {
            return await this.userRepository()
                .createQueryBuilder("users")
                .where(`users.username like '%${user.username}%'`)
                .andWhere(`users.email like '%${user.email}%'`)
                .getMany()
        }
    }

    async searchBody(user) {
        return await this.userRepository().find(this.getCriteria(user))
    }

    getCriteria(keyword) {
        let keywords = {};
        if (!(keyword.username === undefined) && !(!keyword.username === "")) {
            keywords = {...keywords, username: Like(`%${keyword.username}%`)}
        }
        if (!(keyword.email === undefined) && !(!keyword.email === "")) {
            keywords = {...keywords, email: Like(`%${keyword.email}%`)}
        }
        if (!(keyword.fullname === undefined) && !(!keyword.fullname === "")) {
            keywords = {...keywords, fullname: Like(`%${keyword.fullname}%`)}
        }
        return keywords;
    }


    async cari(keyword) {
        let criteria = this.getData(keyword);
        return await this.userRepository().createQueryBuilder("users").leftJoinAndSelect("users.posts"," posts").where(criteria.stringQuery , criteria.queryParams).getMany();
    }

    getData(keyword) {
        let keywords = {
            stringQuery: " 1=1",
            queryParams: {}
        };

        if (!(keyword.username === undefined) && !(!keyword.username === "")) {
            keywords = {...keywords, stringQuery: keywords.stringQuery + "AND users.username like :username"};
            keywords = {...keywords, queryParams: {...keywords.queryParams, username: `%${keyword.username}%`}}
        }
        if (!(keyword.email === undefined) && !(!keyword.email === "")) {
            keywords = {...keywords, stringQuery: keywords.stringQuery + "AND users.email like :email"};
            keywords = {...keywords, queryParams: {...keywords.queryParams, email: `%${keyword.email}%`}}
        }
        if (!(keyword.fullname === undefined) && !(!keyword.fullname === "")) {
            keywords = {...keywords, stringQuery: keywords.stringQuery + "AND users.fullname like :fullname"};
            keywords = {...keywords, queryParams: {...keywords.queryParams, fullname: `%${keyword.fullname}%`}}
        }
        if (!(keyword.title === undefined) && !(!keyword.title === "")) {
            keywords = {...keywords, stringQuery: keywords.stringQuery + "AND posts.title like :title"};
            keywords = {...keywords, queryParams: {...keywords.queryParams, title: `%${keyword.title}%`}}
        }
        return keywords;
    }

    async findByEmail(email) {
        let user = await this.userRepository()
            .createQueryBuilder("users")
            .where("users.email = :email", {email: email})
            .getOne();
        if (!user) {
            throw {message: "email not  define", status: 404}
        }
        return user;
    }

    async createUser(user) {
        return await this.userRepository().save(user);
    }

    async updateUser(user) {
        let userToUpdate = await this.findUserById(user.id)
        this.userRepository().merge(userToUpdate, user)
        return await this.userRepository().save(userToUpdate);
    }

    async findUserById(id) {
        let user = await this.userRepository().findOne(id);
        if (!user) throw {message: "data tidak ada", status: 404}
        return user;
    }

    async deleteUser(id) {
        let user = await this.findUserById(id)
        return await this.userRepository().delete(user);
    }
}

export default UserService