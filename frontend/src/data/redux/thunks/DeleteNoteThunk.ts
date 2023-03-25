import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import * as dataSource from "../../remote/NoteDataSource";
import {NotesState} from "../NoteState";
import Status from "../../models/Status";

export const deleteNote = createAsyncThunk(
    "Notes/deleteNote",
    async (noteId: string) => {
        const response = await dataSource.deleteNote(noteId)
        return response
    }
)

export const deleteNoteReducer = (builder: ActionReducerMapBuilder<NotesState>) => {
    builder.addCase(deleteNote.pending, state => {
        state.status = Status.LOADING
    })
    builder.addCase(deleteNote.fulfilled, (state, action) => {
        state.status = Status.SUCCESS
        state.notes.filter(note => note._id !== action.meta.arg)
    })
    builder.addCase(deleteNote.rejected, (state, action) => {
        state.errorMsg = action.error.message
    })
}