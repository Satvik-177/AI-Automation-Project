import express from "express"
import { login, logout, getMe } from "../Controllers/user.controller.js"

const authRoute = express.Router()

authRoute.post("/login",login)
authRoute.get("/logout",logout)
authRoute.get("/getMe",getMe)

export default authRoute