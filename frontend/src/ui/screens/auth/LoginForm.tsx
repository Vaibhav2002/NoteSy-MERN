import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Alert, Button, Collapse, Link, Stack} from "@mui/material";
import FormTextField from "../../components/formComponents/FormTextFields";
import utilStyle from "../../styles/util.css"
import * as AuthApi from "../../../data/remote/AuthDataSource"
import LoginCredentials from "../../../data/remote/requests/LoginCredentials";
import User from "../../../data/models/User"
import Typography from "@mui/material/Typography";
import {BadRequestError} from "../../../data/models/Error";

interface LoginProps {
    onLoginSuccess: (user: User) => void
    onMoveToRegister: () => void
}

const LoginForm = ({onLoginSuccess, onMoveToRegister}: LoginProps) => {
    const {control, handleSubmit, formState: {errors}} = useForm<LoginCredentials>()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const onSubmit = async (credentials: LoginCredentials) => {
        try {
            const user = await AuthApi.loginUser(credentials)
            onLoginSuccess(user)
        } catch (error) {
            console.log("Error" + error)
            if (error instanceof BadRequestError) {
                setErrorMessage(error.message)
            } else alert(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" gap={2}>
                <Typography variant="h4" textAlign="center" mb={2}>
                    Log In
                </Typography>

                <Collapse in={errorMessage !== null}>
                    <Alert onClose={() => setErrorMessage(null)} severity="error">{errorMessage}</Alert>
                </Collapse>

                <FormTextField
                    control={control}
                    name="email"
                    label="Email"
                    error={errors.email}
                    rules={{required: "Email is required"}}
                    type="email"/>

                <FormTextField
                    control={control}
                    name="password"
                    label="Password"
                    error={errors.password}
                    rules={{required: "Password is required"}}
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
                    Don't have an account yet? <Link onClick={onMoveToRegister} sx={{cursor: "pointer"}}
                                                     color="primary">Register</Link>
                </Typography>
            </Stack>
        </form>
    )
}

export default LoginForm;
