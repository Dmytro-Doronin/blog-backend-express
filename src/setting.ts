import express from "express";
import {videoRouter} from "./routes/route";

export const app = express()


app.use(express.json())
//endpoints
app.use('hometask_01/api', videoRouter)