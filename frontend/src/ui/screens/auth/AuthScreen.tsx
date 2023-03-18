import React, {useEffect, useState} from 'react';
import {Box, Button, Stack} from '@mui/material';
import Card from "@mui/material/Card";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import {useNavigate} from "react-router-dom";
import User from "../../../data/models/User";

const AuthScreen = () => {

    const [isRegister, setRegister] = useState(false)

    const toRegister = () => setRegister(true)
    const toLogin = () => setRegister(false)

    const navigate = useNavigate()

    const toNotes = (user: User) => navigate(
        "/notes",
        {replace:true}
    )

    return (

        <Box
            height="100vh"
            display="flex"
            flexDirection="row"
        >
            <Box flex="1" display="flex" alignItems="center" justifyContent="center">
                <Card sx={{
                    width: {
                        xs: 0.8,
                        sm: 0.6,
                    },
                    padding: 3,
                    borderRadius: 2
                }}>
                    {
                        isRegister
                            ? <RegisterForm
                                onRegisterSuccess={toNotes}
                                onMoveToLogin={toLogin}
                            />
                            : <LoginForm
                                onLoginSuccess={toNotes}
                                onMoveToRegister={toRegister}
                            />

                    }
                </Card>
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
                src="/images/auth_bg.png"
            />

        </Box>
    )
};

export default AuthScreen;
