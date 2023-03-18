import NoteRequest from "../models/requests/NoteRequest";
import mongoose, {Types} from "mongoose";
import createHttpError from "http-errors";
import {fromLabelText} from "../models/Labels";
import NoteModel from "../models/entities/NoteEntity"

const getNotes = async (userId: Types.ObjectId) => {
    return await NoteModel.find({userId: userId}).exec();
}

const createNote = async (userId: Types.ObjectId, noteBody: NoteRequest) => {
    const label = fromLabelText(noteBody.label)
    if (!label) throw createHttpError("Invalid Label")
    return await NoteModel.create({
        userId: userId,
        title: noteBody.title,
        content: noteBody.content,
        label: noteBody.label
    })
}

const updateNote = async (userId: Types.ObjectId, noteId: string, noteBody: NoteRequest) => {
    if (!mongoose.isValidObjectId(noteId)) throw createHttpError(400, "Invalid Note Id")

    const note = await NoteModel.findById(noteId).exec()
    if (!note) throw createHttpError(404, "Note not found")

    if (!note.userId.equals(userId)) throw createHttpError(401, "You cannot access this note")

    const label = fromLabelText(noteBody.label)
    if (!label) throw createHttpError(400, "Invalid Label")

    note.title = noteBody.title
    note.content = noteBody.content
    note.label = label

    return await note.save()
}

const deleteNote = async (userId: Types.ObjectId, noteId: string) => {
    if (!mongoose.isValidObjectId(noteId)) throw createHttpError(400, "Invalid Note Id")
    const note = await NoteModel.findById(noteId).exec()

    if (!note) throw createHttpError(404, "Note not found")

    if (!note.userId.equals(userId)) throw createHttpError(401, "You cannot access this note")

    await note.remove()
}

export {getNotes, createNote, updateNote, deleteNote}