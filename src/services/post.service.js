import {getRepository} from "typeorm";
import Post from "../models/post.model";

class PostService {
     postRepository() {
        return getRepository(Post);
    }

    async findAllPost() {
        return await this.postRepository().find();
    }

    async seacrhAuthor(post){
        let posts =  await this.postRepository()
            .createQueryBuilder("posts")
            .innerJoinAndSelect("posts.author", "author")
            .where(`posts.title like '%${post.title}% '` )
            .getMany();
        return posts;
    }

    async createPost(post){
        return await this.postRepository().save(post);
    }

    async updatePost(post){
        let postToUpdate = await  this.findPostById(post.id);
        this.postRepository().merge(postToUpdate,post);
        return await this.postRepository().save(postToUpdate);
    }

    async findPostById(id) {
        let post = await this.postRepository().findOne(id);
        if (!post) throw {message:"data denied ",status:404}
        return post;
    }
}
export default PostService;

