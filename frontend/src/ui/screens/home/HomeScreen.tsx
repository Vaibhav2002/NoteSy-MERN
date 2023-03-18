import React from 'react';
import {Box, Button, Stack, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom"
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

    async function onButtonPress() {
        if (await isLoggedIn())
            navigate("/notes")
        else navigate("/auth")
    }

    const theme = useTheme()
    const colors = theme.palette
    return (
        <Box
            height="100vh"
            display="flex"
            flexDirection="row"
        >
            <Box flex="1" display="flex" alignItems="center" justifyContent="center">
                <Stack direction="column" gap={2}>
                    <Typography
                        sx={{
                            typography: {
                                xs: "h4",
                                sm: "h2",
                                xl: "h1"
                            }
                        }}
                        fontWeight="800"
                    >
                        All your notes. <br/>
                        Oragnized. <br/>
                        Effortless.
                    </Typography>

                    <Typography variant="body1" color={colors.text.secondary}>
                        Inspiration strikes everywhere. Notesy lets you<br/>
                        capture your ideas across any device.
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={onButtonPress}
                        sx={{
                            borderRadius: 3,
                            width: "200px",
                            marginTop: 3,
                            padding: 2
                        }}
                    >
                        Get Started
                    </Button>
                </Stack>
            </Box>


            <Box
                component="img"
                flex="1"
                sx={{
                    display: {
                        xs: "none",
                        sm: "block",
                    }
                }}
                src="/images/home_bg.png"
            />

        </Box>
    );
};

export default HomeScreen;
