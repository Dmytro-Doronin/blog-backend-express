import express from "express";
import {videoRouter} from "./routes/videoRouter";
import {blogsRouter} from "./routes/blogsRouter";

export const app = express()


app.use(express.json())
//endpoints
app.use('/api', videoRouter)
app.use('/api/blogs', blogsRouter)
// app.use('/posts', videoRouter)