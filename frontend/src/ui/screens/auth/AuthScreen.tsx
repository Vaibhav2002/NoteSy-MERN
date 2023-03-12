import React, {useState} from 'react';
import {Box} from '@mui/material';
import Card from "@mui/material/Card";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const AuthScreen = () => {

    const [isRegister, setRegister] = useState(true)

    const toRegister = () => setRegister(true)
    const toLogin = () => setRegister(false)

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Card sx={{
                width: {
                    xs: 0.8,
                    sm: 0.6,
                    md: 0.4
                },
                padding: 3,
                borderRadius: 2
            }}>
                {
                    isRegister
                        ? <RegisterForm
                            onRegisterSuccess={() => {}}
                            onMoveToLogin={toLogin}
                        />
                        : <LoginForm
                            onLoginSuccess={()=>{}}
                            onMoveToRegister={toRegister}
                            />

                }

            </Card>
        </Box>
    )

};

export default AuthScreen;
