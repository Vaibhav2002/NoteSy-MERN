import {createBrowserRouter} from "react-router-dom";
import HomeScreen from "./home/HomeScreen";
import AuthScreen from "./auth/AuthScreen";
import NotesScreen from "./note/NotesScreen";

const router = createBrowserRouter([
        {
            path: "/",
            element: <HomeScreen/>
        },
        {
            path: "/auth",
            element: <AuthScreen/>
        },
        {
            path: "/notes",
            element: <NotesScreen/>
        }
    ]
)

export default router