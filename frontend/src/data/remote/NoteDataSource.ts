import {apiCall} from "./ApiCall";
import NoteDTO from "../models/NoteDTO";
import NoteRequest from "./requests/NoteRequest";
import NoteInput from "../../ui/components/AddEditNoteModal/NoteInput";
import Note from "../models/Note";
import {toDomainNote} from "../models/NoteMapper";

const notesEndpoint = "/notes/"

export async function getAllNotes(): Promise<Note[]> {
    const noteDtos = await apiCall(notesEndpoint, {method: 'GET'}) as NoteDTO[]
    return noteDtos.map(note => new Note(note))
}

export async function createNote(
    noteInput:NoteInput
): Promise<Note> {
    const noteReq: NoteRequest = {
        title: noteInput.title,
        content: noteInput.content,
        label: noteInput.label
    }
    const response = await apiCall(notesEndpoint, {
        method: 'POST',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(noteReq)
    }) as NoteDTO
    return toDomainNote(response)
}

export async function updateNote(
    noteId:string,
    noteInput:NoteInput
): Promise<Note> {
    const noteReq: NoteRequest = {
        title: noteInput.title,
        content: noteInput.content,
        label: noteInput.label
    }
    const response = await apiCall(`${notesEndpoint}/${noteId}`, {
        method: 'PUT',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(noteReq)
    }) as NoteDTO
    return toDomainNote(response)
}
