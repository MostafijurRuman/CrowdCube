import { useLoaderData } from "react-router-dom";
import { Fade, Slide } from 'react-awesome-reveal';
import AllCampaigns from "../Components/AllCampaigns";

export default function AllCampaign() {
  const campaigns = useLoaderData();
  
  return (
    <div>
      <Fade direction="up" triggerOnce>
        <AllCampaigns campaigns={campaigns} />
      </Fade>
    </div>
  );
}