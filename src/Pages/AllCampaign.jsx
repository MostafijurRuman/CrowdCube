import { useLoaderData } from "react-router-dom";
import CampaignCard from "../Components/CampaignCard";

export default function AllCampaign() {
  const campaigns = useLoaderData();
  
  return (
    <div>
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold text-gray-800 font-inter">All Campaigns</h1>
        <p className="text-lg text-gray-600 mt-2 font-poppins">
          Explore our latest campaigns and find opportunities to invest in innovative ideas.
        </p>
      </div>
        <div className=" max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-10">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
    </div>
  );
}
