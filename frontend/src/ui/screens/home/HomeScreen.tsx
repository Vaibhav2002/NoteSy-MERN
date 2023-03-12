import React from 'react';
import {Button, Container, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom"

const HomeScreen = () => {
    return (
        <Container sx={{
            height:"100vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }}>
            <Stack direction="column">
                <Typography variant="h3" textAlign="center">
                    Welcome to NotesApp
                </Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to="/auth"
                    sx={{
                        marginTop: 2,
                        padding: 2
                    }}
                >
                    Get Started
                </Button>
            </Stack>

        </Container>
    );
};

export default HomeScreen;
