import express from "express";
import {videoRouter} from "./routes/videoRouter";
import {blogsRouter} from "./routes/blogsRouter";
import {deleteRouter} from "./routes/deleteRouter";
import {postsRouter} from "./routes/postsRouter";

export const app = express()


app.use(express.json())
//endpoints
app.use('/testing/all-data', deleteRouter)
app.use('/api', videoRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)