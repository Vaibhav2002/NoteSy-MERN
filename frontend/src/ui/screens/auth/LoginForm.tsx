import React from 'react';
import {useForm} from "react-hook-form";
import {Button, Link, Stack} from "@mui/material";
import FormTextField from "../../components/fFormComponents/FormTextFields";
import utilStyle from "../../styles/util.css"
import * as AuthApi from "../../../data/remote/AuthDataSource"
import LoginCredentials from "../../../data/remote/requests/LoginCredentials";
import User from "../../../data/models/User"
import Typography from "@mui/material/Typography";

interface LoginProps {
    onLoginSuccess: (user: User) => void
    onMoveToRegister:()=>void
}

const LoginForm = ({onLoginSuccess, onMoveToRegister}: LoginProps) => {
    const {control, handleSubmit, formState: {errors}} = useForm<LoginCredentials>()

    const onSubmit = async (credentials: LoginCredentials) => {
        try {
            const user = await AuthApi.loginUser(credentials)
            onLoginSuccess(user)
        } catch (error) {
            alert(error)
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" gap={2}>
                <Typography variant="h4" textAlign="center" mb={2}>
                    Log In
                </Typography>

                <FormTextField
                    control={control}
                    name="email"
                    label="Email"
                    error={errors.email}
                    rules={{required: true}}
                    type="email"/>

                <FormTextField
                    control={control}
                    name="password"
                    label="Password"
                    error={errors.password}
                    rules={{required: true}}
                    type="password"/>

                <Button
                    variant="contained"
                    color="primary"
                    sx={{padding: 2}}
                    className={utilStyle.width100}
                    type="submit"
                >
                    Log In
                </Button>

                <Typography mt={2} variant="body2" textAlign="center">
                    Don't have an account yet? <Link onClick={onMoveToRegister} sx={{cursor:"pointer"}} color="primary">Register</Link>
                </Typography>
            </Stack>
        </form>
    )
}

export default LoginForm;
