import NoteDTO from "./NoteDTO";
import Note from "./Note";

export const toDomainNote = (noteDto:NoteDTO) => new Note(noteDto)

export const toDomainNoteList = (noteDtos:NoteDTO[]) => noteDtos.map(toDomainNote)