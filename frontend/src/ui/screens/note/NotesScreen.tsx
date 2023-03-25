import React, {useEffect, useState} from "react"
import Note from "../../../data/models/Note";
import NoteItem from "../../components/noteItem/NoteItem";
import Grid from '@mui/material/Unstable_Grid2';
import {Box, Fab} from "@mui/material";
import AddEditNoteModal from "../../components/AddEditNoteModal/AddEditNoteModal";
import {Add, DeleteOutlineRounded} from "@mui/icons-material";
import styles from "./NoteScreen.module.css"
import NotesToolbar from "../../components/NoteScreenToolbar";
import {logoutUser} from "../../../data/remote/AuthDataSource";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from "react-redux";
import Status from "../../../data/models/Status";
import {AppDispatch} from "../../../data/redux/store";
import {notesStateSelector} from "../../../data/redux/Selectors";
import {fetchNotes} from "../../../data/redux/thunks/FetchNoteThunk";
import {deleteNote} from "../../../data/redux/thunks/DeleteNoteThunk";

const NotesScreen = () => {
    const {notes, errorMsg, status} = useSelector(notesStateSelector)
    const dispatch = useDispatch<AppDispatch>()

    const [isModalOpen, setModalOpen] = useState(false)
    const [noteToEdit, setNoteToEdit] = useState<Note | undefined>(undefined)
    const [canDelete, setCanDelete] = useState(false)
    const [isHoveringOnDelete, setIsHoveringOnDelete] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchNotes())
    }, [dispatch]);

    useEffect(() => {
        if (!errorMsg) return
        console.log(errorMsg)
        alert(errorMsg)
    }, [errorMsg])

    async function onNoteDelete(noteId: string) {
        dispatch(deleteNote(noteId))
    }

    async function logout() {
        try {
            await logoutUser()
            navigate("/auth", {replace: true})
        } catch (error) {
            alert(error)
            console.log(error)
        }
    }

    function onDragStart(e: React.DragEvent, noteId: string) {
        e.dataTransfer?.setData("noteId", noteId)
        setCanDelete(true)
    }

    function onDrop(e: React.DragEvent) {
        const noteId = e.dataTransfer?.getData("noteId")
        if (!noteId) return
        onNoteDelete(noteId)
    }

    const onDragOverDelete = (e: React.DragEvent) => {
        e.preventDefault()
        setIsHoveringOnDelete(true)
    }

    const onDragOffDelete = () => setIsHoveringOnDelete(false)

    const onDragEnd = () => setCanDelete(false)

    const notesGridComponent = <Box p={2}>
        <Grid
            container
            alignItems="flex-start"
            justifyContent="space-evenly"
            rowSpacing={2}
            columnSpacing={1}
            columns={{xs: 2, sm: 3, md: 4}}
        >
            {notes.map(note => (
                <Grid key={note._id}>
                    <NoteItem
                        note={note}
                        onClick={setNoteToEdit}
                        onDragStart={(e, note) => onDragStart(e, note._id)}
                        onDragEnd={onDragEnd}
                    />
                </Grid>
            ))}
        </Grid>
    </Box>


    const noNotesText = <Typography variant="h5" className={styles.noNotesText}>
        You don't have any notes.<br/> Add a new note by clicking the + button below.
    </Typography>

    return (
        <Box className={styles.noteScreen}>
            <NotesToolbar onLogoutPressed={logout}/>
            <Box>
                {status === Status.SUCCESS && notes.length === 0 && noNotesText}
                {notes.length > 0 && notesGridComponent}

                {isModalOpen && <AddEditNoteModal onDismiss={() => setModalOpen(false)}/>}

                {noteToEdit && <AddEditNoteModal
                    note={noteToEdit}
                    onDismiss={() => setNoteToEdit(undefined)}/>
                }

                <Fab
                    aria-label="add"
                    color="primary"
                    onClick={() => setModalOpen(true)}
                    sx={{
                        position: "fixed",
                        bottom: 32,
                        right: 32,
                    }}
                >
                    <Add/>
                </Fab>

                {canDelete && <Fab
                    aria-label="delete"
                    color="error"
                    onDrop={onDrop}
                    onDragOver={onDragOverDelete}
                    onDragLeave={onDragOffDelete}
                    size={isHoveringOnDelete ? "large" : "medium"}
                    sx={{
                        zIndex: 5,
                        position: "fixed",
                        bottom: 32,
                        left: "50%",
                        right: "50%"
                    }}
                >
                    <DeleteOutlineRounded/>
                </Fab>
                }
            </Box>
        </Box>
    );
};

export default NotesScreen;