import {EntitySchema} from "typeorm";
import Post from "../../models/post.model";

const PostSchema = new EntitySchema({
    name:'Post',
    target:Post,
    tableName:'posts',
    columns:{
        id:{
            primary:true,
            type:'uuid',
            generated:'uuid'
        },
        title:{
            type:'varchar',
            nullable:false
        },
        content:{
            type:'varchar',
            nullable: false
        },
        createAt:{
            name:'createdAt',
            type:'date',
            nullable:false,
            default:()=>'CURRENT_TIMESTAMP'
        },
        updateAt:{
            name:'updated_at',
            type:'date',
            nullable:false,
            default:()=>'CURRENT_TIMESTAMP'
        },
    },
    relations:{
        author:{
            target:"User",
            type:"many-to-one",
            joinColumn:true,
            eager:false
        }
    }
})
export default PostSchema;