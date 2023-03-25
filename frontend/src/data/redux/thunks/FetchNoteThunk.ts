import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import * as dataSoucre from "../../remote/NoteDataSource";
import {NotesState} from "../NoteState";
import Status from "../../models/Status";

export const fetchNotes = createAsyncThunk(
    "Notes/fetchNotes",
    async () => {
        return await dataSoucre.getAllNotes()
    }
)

export const fetchNoteReducer = (builder: ActionReducerMapBuilder<NotesState>) => {
    builder.addCase(fetchNotes.pending, state => {
        state.status = Status.LOADING
    })
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = Status.SUCCESS
        state.notes = action.payload
    })
    builder.addCase(fetchNotes.rejected, (state, action) => {
        state.status = Status.ERROR
        state.errorMsg = action.error.message
    })
}