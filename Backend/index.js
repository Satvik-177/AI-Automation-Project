import express from "express"
import dotenv from "dotenv"
import connectDB from "./Config/db.js"
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config()

const port = process.env.PORT || 8000
const app = express()

app.use(express.json())

app.use(cors({
    origin:"http://localhost:8000",
    credentials:true
  })
)

app.use(cookieParser())


app.listen(port,()=>{

    connectDB()
    console.log(`Server started on port ${port}`)
})
