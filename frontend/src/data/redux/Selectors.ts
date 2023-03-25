import {NotesState} from "./NoteState";
import Note from "../models/Note";

export const notesStateSelector = (state: any):NotesState => state.notes
export const notesSelector = (state: any): Note[] => state.notes.notes