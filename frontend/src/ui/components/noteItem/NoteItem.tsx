import React from 'react'
import Card from "@mui/material/Card"
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import styles from "./NoteStyle.module.css"
import {Box} from "@mui/material";
import formatDate from "../../../util/DateFormatter";
import Note from "../../../data/models/Note";

interface NoteItemProps {
    note: Note
    onClick: (note: Note) => void
}

const NoteItem = ({note, onClick}: NoteItemProps) => {
    let time = `Created: ${formatDate(note.createdAt)}`
    if (note.updatedAt > note.createdAt)
        time = `Updated: ${formatDate(note.updatedAt)}`
    console.log(note.label)
    return (
        <Card className={styles.note_card} onClick={() => onClick(note)}>
            <CardContent className={styles.note_cardContent}>
                <Typography variant="h6" mr={3}>{note.title}</Typography>
                <Typography
                    whiteSpace="pre-line"
                    variant="caption"
                    overflow="auto"
                    color="text.secondary"
                >
                    {note.content}
                </Typography>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        position: "absolute",
                        right: 0,
                        bottom: 0,
                        padding: 1.5
                    }}
                >{time}</Typography>
                <Box
                    sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        aspectRatio: 1,
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: note.label.color
                    }}
                />
            </CardContent>
        </Card>
    );
};

export default NoteItem;