import express from "express";
// import {videoRouter} from "./routes/videoRouter";
import {blogsRouter} from "./routes/blogsRouter";
import {deleteRouter} from "./routes/deleteRouter";
import {postsRouter} from "./routes/postsRouter";
import {usersRouter} from "./routes/usersRouter";
import {authRouter} from "./routes/authRouter";
import {commentRouter} from "./routes/commentsRouter";
import cookieParser from "cookie-parser";
import {deviceRouter} from "./routes/securityDevice";
export const app = express()
import cors from 'cors'

app.use(cors())
// app.use(registrationLimiter)
app.set('trust proxy', true)
app.use(cookieParser())
app.use(express.json())

//endpoints
app.use('/api/testing/all-data', deleteRouter)
// app.use('/api', videoRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/posts', postsRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/comments', commentRouter)
app.use('/api/security/devices', deviceRouter)