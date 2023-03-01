import {getAllNotes} from "../../data/remote/NoteDataSource";
import React, {useEffect, useState} from "react"
import Note from "../../data/models/Note";
import NoteItem from "../components/noteItem/NoteItem";
import Grid from '@mui/material/Unstable_Grid2';

const NotesScreen = () => {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        async function loadNotes() {
            try {
                const notes = await getAllNotes()
                setNotes(notes)
            } catch (error) {
                console.log(error)
            }
        }

        loadNotes()
    }, []);


    const notesGrid =
        <Grid container spacing={{xs: 3, md: 2}} columns={{xs: 2, sm: 4, md: 8}}>
            {notes.map(note => (
                <Grid key={note._id}>
                    <NoteItem note={note}/>
                </Grid>
            ))}
        </Grid>

    return (
        <>
            {notesGrid}
        </>
    );
};

export default NotesScreen;