import { useLoaderData } from "react-router-dom";
import AllCampaigns from "../Components/AllCampaigns";

export default function AllCampaign() {
  const campaigns = useLoaderData();
  
  return (
    <div>
      <AllCampaigns campaigns={campaigns} />
    </div>
  );
}