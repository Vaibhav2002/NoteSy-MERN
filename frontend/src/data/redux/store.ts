import {AnyAction, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {notesReducer} from "./NotesSlice";

const store = configureStore({
    reducer:{
        notes: notesReducer
    }
})

export default store;

export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;
export type RootState = ReturnType<typeof store.getState>;