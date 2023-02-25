import express from 'express'
import logger from 'morgan'
import {errorMiddleware, notFoundMiddleware} from "./middleware/ErrorMiddlewares";
import noteRoutes from "./routes/NoteRoutes";

const app = express()

app.use(express.json())
app.use(logger("dev"))

app.use("/notes", noteRoutes)

//middlewares
app.use(notFoundMiddleware)
app.use(errorMiddleware)

export default app