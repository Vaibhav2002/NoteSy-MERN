import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import * as dataSource from "../../remote/NoteDataSource";
import NoteInput from "../../../ui/components/AddEditNoteModal/NoteInput";
import {NotesState} from "../NoteState";
import Status from "../../models/Status";

interface UpdateNoteData {
    noteId: string,
    noteInput: NoteInput
}

export const updateNote = createAsyncThunk(
    "Notes/updateNote",
    async ({noteId, noteInput}: UpdateNoteData) => {
        const response = await dataSource.updateNote(noteId, noteInput)
        return response
    }
)

export const updateNoteReducer = (builder: ActionReducerMapBuilder<NotesState>) => {
    builder.addCase(updateNote.pending, state => {
        state.status = Status.LOADING
    })
    builder.addCase(updateNote.fulfilled, (state, action) => {
        state.status = Status.SUCCESS
        const noteIndex = state.notes.findIndex(note => note._id === action.payload._id)
        state.notes[noteIndex] = action.payload
    })
    builder.addCase(updateNote.rejected, (state, action) => {
        state.errorMsg = action.error.message
    })
}