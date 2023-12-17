import {postMapper} from "../maper";

import {client} from "../../db/db";
import {PostViewModelType} from "../../types/commonBlogTypeAndPosts.types";
import {dbPostCollections} from "../dbCollections";


export const postQuery = {
    async getAllPostsFromDb () {
        try {
            const post = await dbPostCollections.find({}).toArray()
            return post.map(postMapper)
        } catch (e) {
            throw new Error('Posts was not get')
        }
    },

    async getPostByIdFromDb (id: string) {
        try {
            const result = await dbPostCollections.findOne({id: id})

            if (!result) {
                return null
            }

            return postMapper(result)
        } catch (e) {
            throw new Error('Blog was not found')
        }

    },
}