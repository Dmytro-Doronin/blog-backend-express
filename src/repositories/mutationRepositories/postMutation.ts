import {PostInputModelType, PostViewModelType} from "../../types/commonBlogTypeAndPosts.types";
import {postMapper} from "../../utils/mapper";
import {client} from "../../db/db";
import {CreatePostsServiceType} from "../../services/serviceTypes/postsTypes";
import {PostModel} from "../../db/schemes";

//export const dbPostCollections = client.db('Blogs').collection<PostViewModelType>('posts')

export const postMutation = {
    async createPostInDb (newPost : PostViewModelType) {
        try {

            await PostModel.create(newPost)
            const result = await PostModel.findOne({id: newPost.id}).lean()

            if (!result) {
                return null
            }

            return postMapper(result)
        } catch (e) {
            throw new Error('Post was not add')
        }

    },

    async changePostByIdInDb ({id, title, shortDescription, content, blogId}: CreatePostsServiceType) {

        try {
            const addedItem = await PostModel.findOne({id: id}).lean()

            if (!addedItem) {
                return null
            }

            const result = await PostModel.updateOne(
                {id: id},
                {
                    $set: {title, shortDescription, content, blogId }
                }
            )

            return !!result.matchedCount
        } catch (e) {
            throw new Error('Blog was not changed by id')
        }

    },

    async deletePostByIdInDb (id: string) {

        try {
            const res = await PostModel.deleteOne({id: id})

            if (res.deletedCount === 1) {
                return true
            }
            return null

        } catch (e) {
            throw new Error('Blog was nod deleted')
        }
    }
}