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
import cors from 'cors'
import path from "path"
const app = express()

app.use(express.json())
app.use(logger("dev"))
app.use(cors())

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

app.use(express.static(path.join(__dirname,"../../frontend/build")));
console.log(__dirname)
app.get("*",(req,res) => {
    res.sendFile(path.resolve(__dirname,"../../frontend","build","index.html"))
})

//middlewares
app.use(notFoundMiddleware)
app.use(errorMiddleware)

export default app