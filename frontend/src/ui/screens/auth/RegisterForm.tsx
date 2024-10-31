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

        const matchpassword = []

        matchpassword.push("[$@$!%*#?&]");
        matchpassword.push("[A-Z]");
        matchpassword.push("[a-z]");
        matchpassword.push("[0-9]");

        if(credentials.password.length<8) {
            setErrorMessage ( "password must be of 8 character" )
            return
        }

        for (let i   = 0  ; i < matchpassword.length ; i++){
            if (!RegExp(matchpassword[i]).test(String(credentials.password))){
                switch (i){
                    case 0:
                        setErrorMessage ( "Password must contains a special character" );
                        return ;
                    case 1:
                        setErrorMessage ( "Password must contains at least a capital letter" );
                        return ;
                    case 2:
                        setErrorMessage ( "Password must contains at least a small letter" );
                        return ;
                    case 3:
                        setErrorMessage ( "Password must contains a number" );
                        return ;
                }
            }
        }


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
