
import {
    BlackListModel,
    BlogModel,
    CommentModel,
    DeviceModel,
    LikeModel,
    PostModel,
    RateModel,
    UserModel
} from "../../db/schemes";

export const deleteAllDataMutation = {
    async deleteAllDataFromDb () {
        try {
            await BlogModel.deleteMany({})
            await PostModel.deleteMany({})
            await UserModel.deleteMany({})
            await CommentModel.deleteMany({})
            await BlackListModel.deleteMany({})
            await DeviceModel.deleteMany({})
            await RateModel.deleteMany({})
            await LikeModel.deleteMany({})
        } catch (e) {
            console.log(e)
            throw new Error('All data was not deleted')
        }
    }
}