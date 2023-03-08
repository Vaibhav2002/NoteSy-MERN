import React from 'react';
import {Labels, labels} from "../../../data/models/Labels";
import {Controller, useForm} from "react-hook-form"
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField} from "@mui/material";
import styles from './AddEditNoteModal.module.css'
import Typography from "@mui/material/Typography";
import {createNote, updateNote} from "../../../data/remote/NoteDataSource";
import NoteInput from "./NoteInput";
import Note from "../../../data/models/Note";

interface AddEditNoteProps {
    note?: Note
    onDismiss: () => void

    onNoteSave: (note: Note) => void

}

const AddEditNoteModal = ({note, onDismiss, onNoteSave}: AddEditNoteProps) => {
    const {control, handleSubmit, formState: {errors, isSubmitting}} = useForm<NoteInput>({
        defaultValues: {
            title: note?.title ?? "",
            content: note?.content ?? "",
            label: note?.label?.label ?? Labels.Home.label
        }
    })

    let header = "Create Note"
    if (note) header = "Edit Note"
    const allLabels = labels

    const onSubmit = async (input: NoteInput) => {
        let noteResponse
        try {
            if (note)
                noteResponse = await updateNote(note._id, input)
            else noteResponse = await createNote(input)
            onNoteSave(noteResponse)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <Modal
            open={true}
            onClose={onDismiss}
            className={styles.modal}
        >
            <Box
                className = {styles.modal_content}
                sx={{
                    width: {
                        xs: 0.7,
                        md: 0.6,
                        lg: 0.4
                    },
                }}
            >
                <Stack direction="column" gap={2}>
                    <Typography variant="h4" className={styles.modal_title}>
                        {header}
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack direction="column" gap={2}>
                            <Controller
                                name="title"
                                defaultValue={control._defaultValues.title}
                                rules={{required: "Title is required"}}
                                control={control}
                                render={({field: {onChange, value}}) =>
                                    <TextField
                                        id="outlined-basic-controlled"
                                        value={value}
                                        error={!!errors.title}
                                        helperText={errors.title?.message}
                                        onChange={onChange}
                                        label="Title"/>
                                }
                            />
                            <Controller
                                name="content"
                                defaultValue={control._defaultValues.content}
                                rules={{required: "Content is required"}}
                                control={control}
                                render={({field: {onChange, value}}) =>
                                    <TextField
                                        id="outlined-multiline-flexble-controlled"
                                        label="Content"
                                        multiline
                                        helperText={errors.content?.message}
                                        error={!!errors.content}
                                        value={value}
                                        onChange={onChange}
                                        rows={4}
                                    />
                                }
                            />
                            <Controller
                                name="label"
                                defaultValue={control._defaultValues.label}
                                control={control}
                                rules={{required: "Category should be selected"}}
                                render={({field: {onChange, value}}) =>
                                    <FormControl>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-controlled-label"
                                            id="demo-simple_select-autowidth-controlled"
                                            autoWidth
                                            onChange={onChange}
                                            value={value}
                                            label="Category"
                                        >
                                            {allLabels.map((label) =>
                                                <MenuItem value={label.label}>{label.label}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>

                                }
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={isSubmitting}
                                className={styles.modal_saveBtn}
                            >
                                Save Note
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Box>
        </Modal>
    );
};

export default AddEditNoteModal;
