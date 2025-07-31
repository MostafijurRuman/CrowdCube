import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "../Pages/Home";
import AllCampaign from "../Pages/AllCampaign";
import MainLayout from "../Layouts/MainLayout";
import AddCampaign from "../Pages/AddCampaign";
import MyCampaign from "../Pages/MyCampaign";
import MyDonations from "../Pages/MyDonations";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home> ,
                loader: ()=>fetch('http://localhost:5000/campaigns'),
            },
            {
                path: "/all-campaigns",
                element: <AllCampaign></AllCampaign> ,
                loader: ()=>fetch('http://localhost:5000/campaigns'),
            },
            {
                path: "/add-campaign",
                element: <AddCampaign></AddCampaign>,
            },
            {
                path: "/my-campaigns",
                element: <MyCampaign></MyCampaign>,
            },
            {
                path: "/my-donations",
                element: <MyDonations></MyDonations>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
        ],
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
