import {InferSchemaType, model, Schema} from "mongoose";
import {Labels} from "../Labels";

const noteSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    label: {type: String, enum: Labels, required: true},
}, {timestamps: true})

type NoteModel = InferSchemaType<typeof noteSchema>

export default model<NoteModel>('Note', noteSchema)