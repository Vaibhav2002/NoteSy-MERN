import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Alert, Button, Collapse, Link, Stack} from "@mui/material";
import FormTextField from "../../components/formComponents/FormTextFields";
import utilStyle from "../../styles/util.css"
import * as AuthApi from "../../../data/remote/AuthDataSource"
import User from "../../../data/models/User"
import Typography from "@mui/material/Typography";
import RegisterCredentials from "../../../data/remote/requests/RegisterCredentials";
import {BadRequestError} from "../../../data/models/Error";

interface RegisterProps {
    onRegisterSuccess: (user: User) => void

    onMoveToLogin: () => void
}

const RegisterForm = ({onRegisterSuccess, onMoveToLogin}: RegisterProps) => {
    const {control, handleSubmit, formState: {isSubmitting, errors}} = useForm<RegisterCredentials>()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const onSubmit = async (credentials: RegisterCredentials) => {
        try {
            const user = await AuthApi.registerUser(credentials)
            onRegisterSuccess(user)
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
                    Register
                </Typography>

                <Collapse in={errorMessage !== null}>
                    <Alert onClose={() => setErrorMessage(null)} severity="error">{errorMessage}</Alert>
                </Collapse>

                <FormTextField
                    control={control}
                    name="username"
                    label="Username"
                    error={errors.username}
                    rules={{required: "Username is required"}}
                    type="fullName"/>

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
                    disabled={isSubmitting}
                    sx={{padding: 2}}
                    className={utilStyle.width100}
                    type="submit"
                >
                    Register
                </Button>

                <Typography mt={2} variant="body2" textAlign="center">
                    Already have an account? <Link onClick={onMoveToLogin} sx={{cursor: "pointer"}}
                                                   color="primary">Login</Link>
                </Typography>
            </Stack>
        </form>
    )
}

export default RegisterForm;
