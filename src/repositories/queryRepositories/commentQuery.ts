import {commentMapper} from "../../utils/mapper";
import {CommentModel} from "../../db/schemes";
import {filterForSort} from "../../utils/sortUtils";
import {commentsDBType} from "../../types/commonBlogTypeAndPosts.types";

export const commentQuery = {
    async getCommentById (id: string, userId: string | null = null) {

        try {
            let result
            if (!userId) {
                result = await CommentModel.findOne({id: id}).lean()
            } else {
                result = await CommentModel.aggregate([
                    {
                        $match: {postId: id}
                    },
                    {
                        $project: {
                            id: 1,
                            content: 1,
                            commentatorInfo: 1,
                            createdAt: 1,
                            likesInfo: {
                                likesCount: 1,
                                dislikesCount: 1,
                                myStatus: {
                                    $cond: [
                                        {
                                            $in: [userId, '$likesInfo.likedBy']
                                        },
                                        'Like',
                                        {
                                            $cond: [
                                                {
                                                    $in: [userId, '$likesInfo.dislikedBy']
                                                },
                                                'Dislike',
                                            ]
                                        },
                                        'None'
                                    ]
                                }
                            }
                        }
                    }
                ])
            }



            if (!result || (Array.isArray(result) && result.length === 0)) {
                return null;
            }

            if (Array.isArray(result)) {
                return commentMapper(result[0])
            }

            return commentMapper(result)


        } catch (e) {
            throw new Error('Comment was not found')
        }

    }
}