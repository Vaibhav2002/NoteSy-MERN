import React from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import router from "./ui/screens/router";
import {ThemeProvider} from "@mui/material";
import theme from "./ui/theme";
import {Provider} from "react-redux";
import store from "./data/redux/store";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </ThemeProvider>

    );
}

export default App;
