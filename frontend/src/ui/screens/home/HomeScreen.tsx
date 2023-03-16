import React, {useEffect} from 'react';
import {Button, Container, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link, useNavigate} from "react-router-dom"
import {getAuthenticatedUser} from "../../../data/remote/UserDataSource";

const HomeScreen = () => {

    async function isLoggedIn() {
        try {
            await getAuthenticatedUser()
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const navigate = useNavigate()

    async function onButtonPress(){
        if(await isLoggedIn())
            navigate("/notes")
        else navigate("/auth")
    }

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
                    onClick={onButtonPress}
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
