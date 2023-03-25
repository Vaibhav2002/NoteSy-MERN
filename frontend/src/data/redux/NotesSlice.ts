import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Note from "../models/Note";
import Status from "../models/Status";
import {fetchNoteReducer} from "./thunks/FetchNoteThunk";
import {NotesState} from "./NoteState";


const initialState: NotesState = {
    notes: [],
    errorMsg: undefined,
    status: Status.IDLE
}

const notesSlice = createSlice({
        name: "Notes",
        initialState: initialState,
        reducers: {
            addNote: (state, action: PayloadAction<Note>) => {
                state.notes.push(action.payload)
            },
            deleteNoteById: (state, action: PayloadAction<string>) => {
                state.notes = state.notes.filter(note => note._id !== action.payload)
            },
            updateNote: (state, action: PayloadAction<Note>) => {
                const noteIndex = state.notes.findIndex(note => note._id === action.payload._id)
                state.notes[noteIndex] = action.payload
            },
            setNotes: (state, action: PayloadAction<Note[]>) => {
                state.notes = action.payload
            }
        },
        extraReducers: (builder) => {
            fetchNoteReducer(builder)
        }
    }
)

export const {addNote, deleteNoteById, updateNote, setNotes} = notesSlice.actions

export const notesReducer = notesSlice.reducer