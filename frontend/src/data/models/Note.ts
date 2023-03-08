import {fromLabelText, Labels} from "./Labels";
import NoteDTO from "./NoteDTO";

export default class Note {
    _id: string
    title: string
    content: string
    label: Labels
    createdAt: string
    updatedAt: string

    constructor(dto: NoteDTO) {
        this._id = dto._id
        this.title = dto.title
        this.content = dto.content
        this.label = fromLabelText(dto.label)
        this.createdAt = dto.createdAt
        this.updatedAt = dto.updatedAt
    }
}