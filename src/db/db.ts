import {VideoTypes} from "../types/video.types";
import {VideoResolution} from "../types/video.types";
import {BlogDbType} from "../types/blogDB.types";
export let db: VideoTypes[] = []


// export const blogDB: BlogDbType = {
//     blogs: [],
//     posts: []
// }
import * as dotenv from 'dotenv'
import {MongoClient} from "mongodb";


dotenv.config()

const url = process.env.MONGO_URL

if (!url) {
    throw new Error('Url doesn`t find')
}

export const client = new MongoClient(url)



export async function runDB ()  {
    try {
        await client.connect()
        console.log('Connected succes to server')
    } catch (e) {
        console.log(e)
        await client.close()
    }
}

