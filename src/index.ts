import { app } from "./app";
import {runDB} from "./db/db";

const PORT = 3002

const startApp = async () => {
    try {
        await runDB()
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }

}
startApp()


