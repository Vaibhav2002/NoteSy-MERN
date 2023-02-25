import * as dataSource from "../data/datasource/NoteDataSource";
import {RequestHandler} from "express";
import NoteRequest from "../data/models/requests/NoteRequest";
import createHttpError from "http-errors";

const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const notes = await dataSource.getNotes()
        res.status(200).json(notes)
    } catch (error) {
        next(error)
    }
}

const createNote: RequestHandler<unknown, unknown, NoteRequest, unknown> = async (req, res, next) => {
    try {
        const noteReq = req.body

        if (!noteReq.title) throw createHttpError(200, "Note must have a title")
        if (!noteReq.content) throw createHttpError(200, "Note must have a content")
        if (!noteReq.color) throw createHttpError(200, "Note must have a color")

        const note = await dataSource.createNote(noteReq)
        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
}

interface NoteIdParam {
    noteId: string
}

const updateNote: RequestHandler<NoteIdParam, unknown, NoteRequest, unknown> = async (req, res, next) => {
    try {
        const noteReq = req.body
        const noteId = req.params.noteId

        if (!noteReq.title) throw createHttpError(200, "Note must have a title")
        if (!noteReq.content) throw createHttpError(200, "Note must have a content")
        if (!noteReq.color) throw createHttpError(200, "Note must have a color")

        const note = await dataSource.updateNote(noteId, noteReq)
        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
}

const deleteNote: RequestHandler<NoteIdParam, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const noteId = req.params.noteId
        await dataSource.deleteNote(noteId)
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}

export {getNotes, createNote, updateNote, deleteNote}