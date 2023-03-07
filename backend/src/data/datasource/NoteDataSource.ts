import NoteModel from "../models/entities/NoteEntity";
import NoteRequest from "../models/requests/NoteRequest";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import {fromLabelText, Labels} from "../models/Labels";

const getNotes = async () => {
    return await NoteModel.find().exec();
}

const createNote = async (noteBody: NoteRequest) => {
    const label = fromLabelText(noteBody.label)
    if(!label) throw createHttpError("Invalid Label")
    return await NoteModel.create({
        title: noteBody.title,
        content: noteBody.content,
        color: noteBody.color,
        label: noteBody.label
    })
}

const updateNote = async (noteId: string, noteBody: NoteRequest) => {
    if (!mongoose.isValidObjectId(noteId)) throw createHttpError(400, "Invalid Note Id")

    const note = await NoteModel.findById(noteId).exec()
    if (!note) throw createHttpError(200, "Note not found")

    const label = fromLabelText(noteBody.label)
    if(!label) throw createHttpError("Invalid Label")

    note.title = noteBody.title
    note.content = noteBody.content
    note.color = noteBody.color
    note.label = label

    return await note.save()
}

const deleteNote = async (noteId: string) => {
    if (!mongoose.isValidObjectId(noteId)) throw createHttpError(400, "Invalid Note Id")
    await NoteModel.findByIdAndDelete(noteId)
}

export {getNotes, createNote, updateNote, deleteNote}