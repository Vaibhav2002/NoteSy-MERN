import express from 'express'
import logger from 'morgan'
import {errorMiddleware, notFoundMiddleware} from "./middleware/ErrorMiddlewares";

const app = express()

app.use(express.json())
app.use(logger("dev"))

//middlewares
app.use(notFoundMiddleware)
app.use(errorMiddleware)

export default app