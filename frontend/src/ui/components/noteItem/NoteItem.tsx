import React from 'react'
import Note from "../../../data/models/Note"
import Card from "@mui/material/Card"
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import styles from "./NoteStyle.module.css"

interface NoteItemProps{
    note:Note
}

const NoteItem = ( { note }:NoteItemProps) => {
    return (
        <Card className ={styles.note_card}>
            <CardContent className = {styles.note_cardContent}>
                <Typography variant="h5">
                    {note.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {note.content}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default NoteItem;