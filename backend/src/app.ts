import express, {NextFunction, Request, Response} from 'express'
import logger from 'morgan'
import {Labels} from "./data/models/Labels";
import NoteModel from "./data/models/Note";
import {errorMiddleware, notFoundMiddleware} from "./middleware/ErrorMiddlewares";

const app = express()

app.use(express.json())
app.use(logger("dev"))

app.get("/addSampleNote", async (req, res, next)=>{
    const note = { title: "Hello Note", content: "Hello", color: "#f0f0f0", label:Labels.Home}
    await NoteModel.create(note)
    const notes = await NoteModel.find().exec()
    res.send(notes)
})

//middlewares
app.use(notFoundMiddleware)
app.use(errorMiddleware)


export default app