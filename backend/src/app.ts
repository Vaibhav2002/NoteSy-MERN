import express from 'express'
import logger from 'morgan'
import {errorMiddleware, notFoundMiddleware} from "./middleware/ErrorMiddlewares";
import noteRoutes from "./routes/NoteRoutes";
import authRoutes from "./routes/AuthRoutes";
import session from "express-session";
import validateEnv from "./util/validateEnv";
import MongoStore from "connect-mongo";
import authMiddleware from "./middleware/AuthMiddleware";
import userRoutes from "./routes/UserRoutes";

const app = express()

app.use(express.json())
app.use(logger("dev"))

app.use(session({
    secret: validateEnv.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: validateEnv.MONGO_DB_CONNECTION_STRING
    })
}))

app.use("/api/auth", authRoutes)
app.use("/api/user", authMiddleware, userRoutes)
app.use("/api/notes", authMiddleware, noteRoutes)

//middlewares
app.use(notFoundMiddleware)
app.use(errorMiddleware)

export default app