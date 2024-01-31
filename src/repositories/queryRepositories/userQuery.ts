import { dbUsersCollections} from "../../db/dbCollections";
import {UsersQueryInputModel} from "../../types/users/queryUsers.types";
import {filterForSort} from "../../utils/sortUtils";
import {body} from "express-validator";
import {userMapper} from "../../utils/mapper";

export const userQuery = {

    async getAllUsers (sortData: UsersQueryInputModel) {
        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection  = sortData.sortDirection ?? 'desc'
        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10
        const searchLoginTerm = sortData.searchLoginTerm ?? null
        const searchEmailTerm = sortData.searchEmailTerm ?? null

        // let filter: any = {}
        //
        // if (searchEmailTerm) {
        //     filter['email'] = {$regex: searchEmailTerm, $options: 'i'}
        // }
        //
        // if (searchLoginTerm) {
        //     filter['login'] = {$regex: searchLoginTerm, $options: 'i'}
        // }

        let filter: any = {$or: []};
        if (searchEmailTerm) {
            filter['$or']?.push({email: {$regex: searchEmailTerm, $options: 'i'}});
        }
        if (searchLoginTerm) {
            filter['$or']?.push({login: {$regex: searchLoginTerm, $options: 'i'}});
        }
        if (filter['$or']?.length === 0) {
            filter['$or']?.push({});
        }


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
        const user = await dbUsersCollections.findOne({$or: [{'accountData.email':loginOrEmail },{'accountData.login': loginOrEmail}]})
        return user
    },

    async findUserById (id: string) {
        return dbUsersCollections.findOne({id: id})
    }
}