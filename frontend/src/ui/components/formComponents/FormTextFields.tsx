import {Control, Controller, FieldError, RegisterOptions} from "react-hook-form";
import {TextField} from "@mui/material";

interface TextFieldProps {
    control: Control<any>
    name: string
    label: string

    defaultValue?: string
    rules?: RegisterOptions<any>

    error?: FieldError

    id?: string

    [x: string]: any
}

const FormTextField = ({control, name, label, defaultValue, rules, error, id, ...props}: TextFieldProps) => {
    return (
        <Controller
            name={name}
            defaultValue={defaultValue ? defaultValue : ""}
            control={control}
            rules={rules}
            render={({field: {onChange, value}}) =>
                <TextField
                    id={id ? id : "outlined-basic-controlled"}
                    {...props}
                    value={value}
                    error={!!error}
                    helperText={error?.message}
                    onChange={onChange}
                    label={label}/>
            }
        />
    )
}

export default FormTextField