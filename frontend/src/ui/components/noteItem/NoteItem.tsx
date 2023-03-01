import React from 'react'
import Note from "../../../data/models/Note"
import Card from "@mui/material/Card"
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import styles from "./NoteStyle.module.css"
import {Box, Stack} from "@mui/material";

interface NoteItemProps {
    note: Note
}

const NoteItem = ({note}: NoteItemProps) => {
    console.log(note.color)
    return (
        <Card className={styles.note_card}>
            <CardContent className={styles.note_cardContent}>
                    <Typography variant="h6" mr={3}>
                        {note.title}
                    </Typography>

                    <Box sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        aspectRatio: 1,
                        backgroundColor: note.color,
                        position: "absolute",
                        top: 8,
                        right: 8
                    }}
                    />

                <Typography variant="caption" color="text.secondary">
                    {note.content}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default NoteItem;