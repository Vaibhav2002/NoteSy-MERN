import React from 'react';
import {Labels, labels} from "../../../data/models/Labels";
import {Controller, useForm} from "react-hook-form"
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack} from "@mui/material";
import styles from './AddEditNoteModal.module.css'
import Typography from "@mui/material/Typography";
import NoteInput from "./NoteInput";
import Note from "../../../data/models/Note";
import FormTextField from "../formComponents/FormTextFields";
import {useDispatch} from "react-redux";
import {updateNote} from "../../../data/redux/thunks/UpdateNoteThunk";
import {AppDispatch} from "../../../data/redux/store";
import {addNote} from "../../../data/redux/thunks/AddNoteThunk";

interface AddEditNoteProps {
    note?: Note
    onDismiss: () => void

}

const AddEditNoteModal = ({note, onDismiss}: AddEditNoteProps) => {
        const {control, handleSubmit, formState: {errors, isSubmitting}} = useForm<NoteInput>({
            defaultValues: {
                title: note?.title ?? "",
                content: note?.content ?? "",
                label: note?.label?.label ?? Labels.Home.label
            }
        })

        const dispatch = useDispatch<AppDispatch>()

        let header = "Create Note"
        if (note) header = "Edit Note"
        const allLabels = labels

        const onSubmit = async (input: NoteInput) => {
            if (note)
                dispatch(updateNote({noteId: note._id, noteInput: input}))
            else dispatch(addNote(input))
            onDismiss()
        }

        return (
            <Modal
                open={true}
                onClose={onDismiss}
                className={styles.modal}
            >
                <Box
                    className={styles.modal_content}
                    sx={{
                        width: {
                            xs: 0.8,
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
                                <FormTextField
                                    name="title"
                                    defaultValue={control._defaultValues.title}
                                    rules={{required: "Title is required"}}
                                    control={control}
                                    error={errors.title}
                                    label="Title"
                                />
                                <FormTextField
                                    name="content"
                                    defaultValue={control._defaultValues.content}
                                    rules={{required: "Content is required"}}
                                    control={control}
                                    errors={!!errors.content}
                                    rows={4}
                                    multiline
                                    id="outlined-multiline-flexble-controlled"
                                    label="Content"
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
                                    sx={{padding: 2}}
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
    }
;

export default AddEditNoteModal;
