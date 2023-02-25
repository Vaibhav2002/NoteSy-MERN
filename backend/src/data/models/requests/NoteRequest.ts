import {Labels} from "../Labels";

export default interface NoteRequest {
    title:string,
    content:string,
    color:string,
    label:Labels
}