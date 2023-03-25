import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import * as dataSource from "../../remote/NoteDataSource";
import {NotesState} from "../NoteState";
import Status from "../../models/Status";

export const deleteNote = createAsyncThunk(
    "Notes/deleteNote",
    async (noteId: string) => {
        await dataSource.deleteNote(noteId)
        return noteId
    }
)

export const deleteNoteReducer = (builder: ActionReducerMapBuilder<NotesState>) => {
    builder.addCase(deleteNote.pending, state => {
        state.status = Status.LOADING
    })
    builder.addCase(deleteNote.fulfilled, (state, action) => {
        state.status = Status.SUCCESS
        const noteIndex = state.notes.findIndex(note => note._id === action.payload)
        state.notes.splice(noteIndex, 1)
    })
    builder.addCase(deleteNote.rejected, (state, action) => {
        state.status = Status.ERROR
        state.errorMsg = action.error.message
    })
}