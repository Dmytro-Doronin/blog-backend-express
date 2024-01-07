import {PostInputModelType, PostViewModelType} from "../../types/commonBlogTypeAndPosts.types";
import {postMapper} from "../../utils/maper";
import {client} from "../../db/db";
import {CreatePostsServiceType} from "../../services/serviceTypes/postsTypes";
import {dbPostCollections} from '../../db/dbCollections'

//export const dbPostCollections = client.db('Blogs').collection<PostViewModelType>('posts')

export const postMutation = {
    async createPostInDb (newPost : PostViewModelType) {
        try {

            await dbPostCollections.insertOne(newPost)
            const result = await dbPostCollections.findOne({id: newPost.id})

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
            const addedItem = await dbPostCollections.findOne({id: id})

            if (!addedItem) {
                return null
            }

            const result = await dbPostCollections.updateOne(
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
            const res = await dbPostCollections.deleteOne({id: id})

            if (res.deletedCount === 1) {
                return true
            }
            return null

        } catch (e) {
            throw new Error('Blog was nod deleted')
        }
    }
}