import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "../Pages/Home";
import AllCampaign from "../Pages/AllCampaign";
import MainLayout from "../Layouts/MainLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home> ,
            },
            {
                path: "/all-campaign",
                element: <AllCampaign></AllCampaign> ,
            },
            {
                path: "contact",
                element: <div>Contact</div>,
            },
        ],
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
