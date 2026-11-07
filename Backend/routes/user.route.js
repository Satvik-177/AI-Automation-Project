import express from "express"
import { login, logout, getMe } from "../Controllers/user.controller.js"
import protect from "../middleware/protect.js"

const authRoute = express.Router()

authRoute.post("/login",login)
authRoute.get("/logout",logout)
authRoute.get("/getMe",protect,getMe)

export default authRoute