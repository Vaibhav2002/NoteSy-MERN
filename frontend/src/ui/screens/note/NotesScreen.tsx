import {getAllNotes} from "../../../data/remote/NoteDataSource";
import React, {useEffect, useState} from "react"
import Note from "../../../data/models/Note";
import NoteItem from "../../components/noteItem/NoteItem";
import Grid from '@mui/material/Unstable_Grid2';
import {Box, Fab} from "@mui/material";
import AddEditNoteModal from "../../components/AddEditNoteModal/AddEditNoteModal";
import {Add} from "@mui/icons-material";
import styles from "./NoteScreen.module.css"

const NotesScreen = () => {
    const [notes, setNotes] = useState<Note[]>([])
    const [isModalOpen, setModalOpen] = useState(false)
    const [noteToEdit, setNoteToEdit] = useState<Note | undefined>(undefined)

    async function fetchNotes() {
        try {
            const notes = await getAllNotes()
            setNotes(notes)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function loadNotes() {
            await fetchNotes()
        }

        loadNotes()
    }, []);

    const notesGrid =
        <Grid container spacing={{xs: 3, md: 2}} columns={{xs: 2, sm: 4, md: 8}}>
            {notes.map(note => (
                <Grid key={note._id}>
                    <NoteItem
                        note={note}
                        onClick={setNoteToEdit}
                    />
                </Grid>
            ))}
        </Grid>

    return (
        <>
            <Box className = {styles.noteScreen}>
                <Box p={2}>{notesGrid}</Box>
                {isModalOpen && <AddEditNoteModal
                    onNoteSave={note => {
                        setModalOpen(false)
                        setNotes([...notes, note]);
                    }
                    }
                    onDismiss={() => {
                        setModalOpen(false)
                    }}
                />
                }
                {noteToEdit && <AddEditNoteModal
                    note = {noteToEdit}
                    onNoteSave={newNote => {
                        setNotes(notes.map( note => (note._id === newNote._id)? newNote : note))
                        setNoteToEdit(undefined)
                    }
                    }
                    onDismiss={() => {
                        setNoteToEdit(undefined)
                    }}
                />
                }
                <Fab
                    className={styles.addNoteFab}
                    aria-label="add"
                    color="primary"
                    onClick={() => setModalOpen(true)}
                    sx = {{
                        position: "absolute",
                        bottom: 32,
                        right: 32,
                    }}
                >
                    <Add/>
                </Fab>
            </Box>
        </>
    );
};

export default NotesScreen;