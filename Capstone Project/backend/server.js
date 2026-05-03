import exp from 'express'
import { config } from 'dotenv'
import { connect } from 'mongoose'
import { userApp } from './APIs/userAPI.js'
import { authorApp } from './APIs/authorAPI.js'
import { adminApp } from './APIs/adminAPI.js'
import { commonApp } from './APIs/commonAPI.js'
import cookieParser from 'cookie-parser'
config()
import cors from "cors";



const app = exp()
const port = process.env.PORT || 4000
app.use(cors({
  origin: "mongodb://lmaddula10_db_user:N98iqvDvvRmNnAEm@ac-adsxlr4-shard-00-00.yzlktjw.mongodb.net:27017,ac-adsxlr4-shard-00-01.yzlktjw.mongodb.net:27017,ac-adsxlr4-shard-00-02.yzlktjw.mongodb.net:27017/?ssl=true&replicaSet=atlas-b4xmpg-shard-0&authSource=admin&appName=blogappcluster",
  credentials: true
}));
app.use(exp.json())
app.use(cookieParser())
app.use("/user-api", userApp)
app.use("/author-api", authorApp)
app.use("/admin-api", adminApp)
app.use("/auth", commonApp)

async function connectDB() {
        await connect(process.env.DB_URL)

        console.log("Database connected")

        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })

}

connectDB()