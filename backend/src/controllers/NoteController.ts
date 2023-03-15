import * as dataSource from "../data/datasource/NoteDataSource";
import {RequestHandler} from "express";
import NoteRequest from "../data/models/requests/NoteRequest";
import createHttpError from "http-errors";
import {assertIsDefined} from "../util/assertIsDefined";

const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const userId = req.session.userId
        assertIsDefined(userId)
        const notes = await dataSource.getNotes(userId)
        res.status(200).json(notes)
    } catch (error) {
        next(error)
    }
}

const createNote: RequestHandler<unknown, unknown, NoteRequest, unknown> = async (req, res, next) => {
    try {
        const noteReq = req.body
        const userId = req.session.userId
        assertIsDefined(userId)

        if (!noteReq.title) throw createHttpError(400, "Note must have a title")
        if (!noteReq.content) throw createHttpError(400, "Note must have a content")

        const note = await dataSource.createNote(userId, noteReq)
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

        const userId = req.session.userId
        assertIsDefined(userId)

        if (!noteReq.title) throw createHttpError(400, "Note must have a title")
        if (!noteReq.content) throw createHttpError(400, "Note must have a content")
        if (!noteReq.label) throw createHttpError(400, "Note must have a label")

        const note = await dataSource.updateNote(userId, noteId, noteReq)
        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
}

const deleteNote: RequestHandler<NoteIdParam, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const noteId = req.params.noteId
        const userId = req.session.userId
        assertIsDefined(userId)

        await dataSource.deleteNote(userId, noteId)
        res.status(200).json({
            statusCode: 200,
            message: "Note deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}

export {getNotes, createNote, updateNote, deleteNote}