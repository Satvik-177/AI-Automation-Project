import express from "express"
import dotenv from "dotenv"
import connectDB from "./Config/db.js"

dotenv.config()

const port = process.env.PORT || 8000
const app = express()

app.listen(port,()=>{

    connectDB()
    console.log(`Server started on port ${port}`)
})
