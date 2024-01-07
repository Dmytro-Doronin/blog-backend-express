import express from "express";
// import {videoRouter} from "./routes/videoRouter";
import {blogsRouter} from "./routes/blogsRouter";
import {deleteRouter} from "./routes/deleteRouter";
import {postsRouter} from "./routes/postsRouter";
import {usersRouter} from "./routes/usersRouter";
import {authRouter} from "./routes/authRouter";


export const app = express()


app.use(express.json())
//endpoints
app.use('/api/testing/all-data', deleteRouter)
// app.use('/api', videoRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/posts', postsRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)