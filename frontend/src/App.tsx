import React from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import router from "./ui/screens/router";
import {ThemeProvider} from "@mui/material";
import theme from "./ui/theme";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router}/>
        </ThemeProvider>

    );
}

export default App;
