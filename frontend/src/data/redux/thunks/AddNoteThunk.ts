import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import * as dataSource from "../../remote/NoteDataSource";
import NoteInput from "../../../ui/components/AddEditNoteModal/NoteInput";
import {NotesState} from "../NoteState";
import Status from "../../models/Status";

export const addNote = createAsyncThunk(
    "Notes/addNote",
    async (noteInput: NoteInput) => {
        return await dataSource.createNote(noteInput)
    }
)

export const addNoteReducer = (builder: ActionReducerMapBuilder<NotesState>) => {
    builder.addCase(addNote.pending, state => {
        state.status = Status.LOADING
    })
    builder.addCase(addNote.fulfilled, (state, action) => {
        state.status = Status.SUCCESS
        state.notes.push(action.payload)
    })
    builder.addCase(addNote.rejected, (state, action) => {
        state.status = Status.ERROR
        state.errorMsg = action.error.message
    })
}