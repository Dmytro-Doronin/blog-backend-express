import express from "express";
import {videoRouter} from "./routes/videoRouter";
import {blogsRouter} from "./routes/blogsRouter";
import {deleteRouter} from "./routes/deleteRouter";

export const app = express()


app.use(express.json())
//endpoints
app.use('/testing/all-data', deleteRouter)
app.use('/api', videoRouter)
app.use('/api/blogs', blogsRouter)
// app.use('/posts', videoRouter)