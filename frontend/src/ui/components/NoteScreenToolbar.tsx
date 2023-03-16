import React from 'react';
import {AppBar, Button, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";

interface NotesToolbarProps{
    onLogoutPressed:() => void
}

const NotesToolbar = ({onLogoutPressed}:NotesToolbarProps) => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" flexGrow="1">MyNotes App</Typography>
                <Button color="inherit" onClick={onLogoutPressed}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default NotesToolbar;
