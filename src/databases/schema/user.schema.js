import {EntitySchema} from "typeorm";
import User from "../../models/user.model";

const UserSchema = new EntitySchema({
    name: 'User',
    target: User,
    tableName: 'users',
    columns: {
        id: {
            primary: true,
            type:"uuid",
            generated: "uuid"
        },
        username: {
            type: 'varchar',
            unique: true,
            nullable: false
        },
        email: {
            type: 'varchar',
            nullable: false
        },
        fullname: {
            type: 'varchar',
            nullable: false
        }
    },
    relations: {
        posts: {
            target: 'Post',
            type: 'one-to-many',
            inverseSide: 'author',
            joinColumn: true,
            cascade: true,
            eager: true
        }
    }
})

export default UserSchema;