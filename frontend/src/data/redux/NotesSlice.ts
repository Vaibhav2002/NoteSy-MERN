import {createSlice} from "@reduxjs/toolkit";
import Status from "../models/Status";
import {fetchNoteReducer} from "./thunks/FetchNoteThunk";
import {NotesState} from "./NoteState";
import {addNoteReducer} from "./thunks/AddNoteThunk";
import {updateNoteReducer} from "./thunks/UpdateNoteThunk";
import {deleteNoteReducer} from "./thunks/DeleteNoteThunk";

const initialState: NotesState = {
    notes: [],
    errorMsg: undefined,
    status: Status.IDLE
}

const notesSlice = createSlice({
        name: "Notes",
        initialState: initialState,
        reducers: {},
        extraReducers: (builder) => {
            fetchNoteReducer(builder)
            addNoteReducer(builder)
            updateNoteReducer(builder)
            deleteNoteReducer(builder)
        }
    }
)

export const notesReducer = notesSlice.reducer