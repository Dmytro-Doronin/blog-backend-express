import {PostInputModelType, PostViewModelType} from "../../types/commonBlogTypeAndPosts.types";
import {commentMapper, postMapper} from "../../utils/mapper";
import {client} from "../../db/db";
import {CreatePostsServiceType} from "../../services/serviceTypes/postsTypes";
import {CommentModel, PostModel} from "../../db/schemes";
import {filterForSort} from "../../utils/sortUtils";
import {QueryCommentsInputModel} from "../../types/posts/queryPosts.types";

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
    },

    async getAllCommentForPostFromDb(postId: string, sortData: QueryCommentsInputModel) {
        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection = sortData.sortDirection ?? 'desc'
        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10


        try {
            const comment = await CommentModel
                .find({postId: postId})
                .sort(filterForSort(sortBy, sortDirection))
                .skip((+pageNumber - 1) * +pageSize)
                .limit(+pageSize)
                .lean()

            const totalCount = await CommentModel.countDocuments({postId: postId})

            const pagesCount = Math.ceil(totalCount / +pageSize)

            return {
                pagesCount,
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount,
                items: comment
            }


        } catch (e) {
            throw new Error('Comments was not get')
        }
    }
}