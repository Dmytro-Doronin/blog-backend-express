import express from "express";
import {router} from "./routes/route";

export const app = express()


app.use(express.json())
//endpoints
app.use('/api', router)