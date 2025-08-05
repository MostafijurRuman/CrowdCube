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
import EditCampaign from "../Pages/EditCampaign";
import ErrorPage from "../Pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home></Home> ,
                loader: ()=>fetch('https://crowd-cube-server-zeta.vercel.app/campaigns'),
            },
            {
                path: "/all-campaigns",
                element: <AllCampaign></AllCampaign> ,
                loader: ()=>fetch('https://crowd-cube-server-zeta.vercel.app/campaigns'),
            },
            {
                path: "campaigns/:id",
                element: <CampaignDetails></CampaignDetails> ,
                loader: ({params})=>fetch(`https://crowd-cube-server-zeta.vercel.app/campaigns/${params.id}`),
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
                path: "/campaigns/:id/edit",
                element: <PrivateRoutes><EditCampaign></EditCampaign></PrivateRoutes>,
                loader: ({params})=>fetch(`https://crowd-cube-server-zeta.vercel.app/campaigns/${params.id}`),
            },
            {
                path: "/my-donations",
                element:<PrivateRoutes> <MyDonations></MyDonations></PrivateRoutes>,
                loader: ()=> fetch('https://crowd-cube-server-zeta.vercel.app/donations'),
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
