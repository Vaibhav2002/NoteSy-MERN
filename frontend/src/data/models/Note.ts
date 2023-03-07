import {Labels} from "./Labels";

export default interface Note {
    _id: string
    title: string
    content: string
    color: string
    label: Labels
    createdAt: string
    updatedAt?: string
}