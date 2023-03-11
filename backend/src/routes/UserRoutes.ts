import express from "express";
import {getAuthenticatedUser} from "../controllers/UserController";

const router = express.Router()

router.get("/", getAuthenticatedUser)

export default router