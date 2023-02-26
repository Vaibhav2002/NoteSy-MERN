import {apiCall} from "./ApiCall";
import Note from "../models/Note";
import {Labels} from "../models/Labels";
import NoteRequest from "./requests/NoteRequest";

const notesEndpoint = "/notes/"

export async function getAllNotes(): Promise<Note[]> {
    return await apiCall(notesEndpoint, {method: 'GET'})
}

export async function createNote(
    title: string,
    content: string,
    color: string,
    label?: Labels
): Promise<Note> {
    const noteReq: NoteRequest = {
        title: title,
        content: content,
        color: color,
        label: label
    }
    return await apiCall(notesEndpoint, {
        method: 'POST',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(noteReq)
    })
}

