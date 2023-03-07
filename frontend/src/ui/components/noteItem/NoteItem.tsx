import React from 'react'
import Note from "../../../data/models/Note"
import Card from "@mui/material/Card"
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import styles from "./NoteStyle.module.css"
import {Box} from "@mui/material";
import formatDate from "../../../util/DateFormatter";

interface NoteItemProps {
    note: Note
}

const NoteItem = ({note}: NoteItemProps) => {
    let time = `Created: ${formatDate(note.createdAt)}`
    if (note.updatedAt != undefined)
        time = `Updated: ${formatDate(note.updatedAt)}`
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

                <Typography variant="caption" color="text.secondary"
                    sx = {{
                        position: "absolute",
                        right: 0,
                        bottom: 0,
                        padding: 1.5
                    }}
                >
                    {time}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default NoteItem;