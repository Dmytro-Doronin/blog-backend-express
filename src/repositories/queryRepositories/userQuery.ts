import { dbUsersCollections} from "../../db/dbCollections";
import {UsersQueryInputModel} from "../../types/users/queryUsers.types";
import {filterForSort} from "../../utils/sortUtils";
import {body} from "express-validator";
import {userMapper} from "../../utils/maper";

export const userQuery = {

    async getAllUsers (sortData: UsersQueryInputModel) {
        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection  = sortData.sortDirection ?? 'desc'
        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10
        const searchLoginTerm = sortData.searchLoginTerm ?? null
        const searchEmailTerm = sortData.searchEmailTerm ?? null

        let filter: any = {}

        if (searchEmailTerm) {
            filter['email'] = {$regex: searchEmailTerm, $options: 'i'}
        }

        if (searchLoginTerm) {
            filter['login'] = {$regex: searchLoginTerm, $options: 'i'}
        }

        // filter = {
        //     $or: [{
        //         email: {$regex: searchEmailTerm, $options: 'i'},
        //         login: {$regex: searchEmailTerm, $options: 'i'}
        //     }]
        // }

        try {
            const users = await dbUsersCollections
                .find(filter)
                .sort(filterForSort(sortBy, sortDirection))
                .skip((+pageNumber - 1) * +pageSize)
                .limit(+pageSize)
                .toArray()

            const totalCount = await dbUsersCollections.countDocuments(filter)

            const pagesCount = Math.ceil(totalCount / +pageSize)

            return {
                pagesCount,
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount,
                items: users.map(userMapper)
            }

        } catch (e) {
            throw new Error('Does not get all users')
        }
    },

    async findUserByLoginOrEmail (loginOrEmail: string) {
        return await dbUsersCollections.findOne({$or: [{email:loginOrEmail },{userName: loginOrEmail}]})
    },

    async findUserById (id: string) {
        return dbUsersCollections.findOne({id: id})
    }
}