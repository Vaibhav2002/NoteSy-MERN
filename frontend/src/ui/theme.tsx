import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#18191F',
            light: '#4B4C53',
            dark: '#000000',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#0077c2',
            light: '#4BA3FF',
            dark: '#004EA5',
            contrastText: '#FFFFFF',
        },
        text: {
            primary: '#18191F',
            secondary: '#92949C',
        },
        background: {
            default: '#F2F2F2',
        },
    },
    typography: {
        fontFamily: [
            'Open Sans',
            'Roboto'
        ].join(", ")
    },
})

export default theme