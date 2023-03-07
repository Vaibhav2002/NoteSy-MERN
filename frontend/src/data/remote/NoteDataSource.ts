import {apiCall} from "./ApiCall";
import Note from "../models/Note";
import {fromLabelText, Labels} from "../models/Labels";
import NoteRequest from "./requests/NoteRequest";
import NoteInput from "../../ui/components/AddEditNoteModal/NoteInput";

const notesEndpoint = "/notes/"

export async function getAllNotes(): Promise<Note[]> {
    return await apiCall(notesEndpoint, {method: 'GET'})
}

export async function createNote(
    noteInput:NoteInput
): Promise<Note> {
    const label = fromLabelText(noteInput.label)
    const noteReq: NoteRequest = {
        title: noteInput.title,
        content: noteInput.content,
        color: label.color,
        label: label.label
    }
    return await apiCall(notesEndpoint, {
        method: 'POST',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(noteReq)
    })
}

export async function updateNote(
    noteId:string,
    noteInput:NoteInput
): Promise<Note> {
    const label = fromLabelText(noteInput.label)
    const noteReq: NoteRequest = {
        title: noteInput.title,
        content: noteInput.content,
        color: label.color,
        label: label.label
    }
    return await apiCall(`${notesEndpoint}/${noteId}`, {
        method: 'PUT',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(noteReq)
    })
}
