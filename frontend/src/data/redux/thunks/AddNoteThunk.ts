import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import * as dataSource from "../../remote/NoteDataSource";
import NoteInput from "../../../ui/components/AddEditNoteModal/NoteInput";
import {NotesState} from "../NoteState";
import Status from "../../models/Status";
import { addNote as addNewNote} from "../NotesSlice";

export const addNote = createAsyncThunk(
    "Notes/addNote",
    async (noteInput: NoteInput) => {
        const response = await dataSource.createNote(noteInput)
        return response
    }
)

export const addNoteReducer = (builder: ActionReducerMapBuilder<NotesState>) => {
    builder.addCase(addNote.pending, state => {
        state.status = Status.LOADING
    })
    builder.addCase(addNote.fulfilled, (state, action) => {
        state.status = Status.SUCCESS
        addNewNote(action.payload)
    })
    builder.addCase(addNote.rejected, (state, action) => {
        state.errorMsg = action.error.message
    })
}