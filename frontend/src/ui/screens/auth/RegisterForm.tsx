import React from 'react';
import {useForm} from "react-hook-form";
import {Button, Link, Stack} from "@mui/material";
import FormTextField from "../../components/formComponents/FormTextFields";
import utilStyle from "../../styles/util.css"
import * as AuthApi from "../../../data/remote/AuthDataSource"
import User from "../../../data/models/User"
import Typography from "@mui/material/Typography";
import RegisterCredentials from "../../../data/remote/requests/RegisterCredentials";

interface RegisterProps {
    onRegisterSuccess: (user: User) => void

    onMoveToLogin:() => void
}

const RegisterForm = ({onRegisterSuccess, onMoveToLogin}: RegisterProps) => {
    const {control, handleSubmit, formState: {isSubmitting, errors}} = useForm<RegisterCredentials>()

    const onSubmit = async (credentials: RegisterCredentials) => {
        try {
            const user = await AuthApi.registerUser(credentials)
            onRegisterSuccess(user)
        } catch (error) {
            alert(error)
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" gap={2}>
                <Typography variant="h4" textAlign="center" mb={2}>
                    Register
                </Typography>

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
                    Already have an account? <Link onClick={onMoveToLogin} sx={{cursor:"pointer"}} color="primary">Login</Link>
                </Typography>
            </Stack>
        </form>
    )
}

export default RegisterForm;
