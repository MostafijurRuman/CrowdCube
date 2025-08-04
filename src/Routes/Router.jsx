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
import CampaignDetails from "../Pages/CampaignDetails";
import PrivateRoutes from "./PrivateRoutes";

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
                path: "campaigns/:id",
                element: <CampaignDetails></CampaignDetails> ,
                loader: ({params})=>fetch(`http://localhost:5000/campaigns/${params.id}`),
            },
            {
                path: "/add-campaign",
                element: <PrivateRoutes><AddCampaign></AddCampaign></PrivateRoutes>,
            },
            {
                path: "/my-campaigns",
                element: <PrivateRoutes><MyCampaign></MyCampaign></PrivateRoutes>,
            },
            {
                path: "/my-donations",
                element:<PrivateRoutes> <MyDonations></MyDonations></PrivateRoutes>,
                loader: ()=> fetch('http://localhost:5000/donations'),
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
