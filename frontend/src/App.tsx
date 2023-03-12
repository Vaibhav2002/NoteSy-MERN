import React from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import router from "./ui/screens/router";

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
