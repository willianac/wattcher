import { createBrowserRouter } from "react-router-dom"

import App from "./App"
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import UserDevices from "./pages/UserDevices";
import Error from "./pages/Error";

const routes = createBrowserRouter([
    {
        path : "/",
        element : <App />,
        errorElement : <Error />,
        children : [
            {
                path : "/",
                element : <LandingPage />
            },
            {
                path : "/login",
                element : <Login />
            },
            {
                path : "/register",
                element : <Register />
            },
            {
                path : "/home",
                element : <Home />
            },
            {
                path : "/mydevices",
                element : <UserDevices />,
            }
        ]
    }
])

export default routes;