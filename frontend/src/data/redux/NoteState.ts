import Note from "../models/Note";
import Status from "../models/Status";

export interface NotesState {
    notes: Note[]
    errorMsg?: string

    status: Status
}
