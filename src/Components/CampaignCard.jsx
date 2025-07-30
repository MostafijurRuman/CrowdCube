import React from 'react';
import { FaCalendarAlt, FaDollarSign } from 'react-icons/fa';

// Helper function to calculate days left
const calculateDaysLeft = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const timeDiff = deadlineDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysLeft > 0 ? daysLeft : 0;
};

// Helper function to get category color
const getCategoryColor = (type) => {
  const colors = {
    "Personal Issue": "bg-accent-red text-white",
    "Startup": "bg-primary text-white", 
    "Business": "bg-accent-purple text-white",
    "Creative Ideas": "bg-accent-yellow text-text-primary",
    "Environment": "bg-accent-green text-white"
  };
  return colors[type] || "bg-primary text-white";
};

export default function CampaignCard({ campaign }) {
  const daysLeft = calculateDaysLeft(campaign.deadline);
  const categoryColor = getCategoryColor(campaign.type);
  
  // Calculate progress percentage (assuming some raised amount for demo)
  const raisedAmount = Math.floor(Math.random() * parseInt(campaign.goalAmount)); // Demo data
  const progressPercent = (raisedAmount / parseInt(campaign.goalAmount)) * 100;

  return (
    <div className="bg-card-bg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border border-divider max-w-sm mx-auto flex flex-col h-full">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={campaign.image} 
          alt={campaign.title}
          className="w-full h-48 object-cover"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold font-poppins ${categoryColor}`}>
            {campaign.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xl font-bold text-text-primary font-poppins mb-3 line-clamp-2">
          {campaign.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary font-inter text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
          {campaign.description}
        </p>

        {/* Min Donation and Days Left */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-text-secondary">
            <FaDollarSign className="text-accent-green text-sm" />
            <span className="text-sm font-medium font-inter">
              Min. ${campaign.minDonation}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="text-accent-red text-sm" />
            <span className="text-sm font-medium text-accent-red font-inter">
              {daysLeft} days left
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-text-secondary font-inter">Progress</span>
            <span className="font-semibold text-primary font-inter">{progressPercent.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-divider rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-accent-purple h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* See More Button */}
        <button className="w-full bg-primary hover:bg-accent-purple text-button-text font-bold py-3 px-4 rounded-xl transition-all duration-300 font-poppins shadow-md hover:shadow-lg mt-auto">
          See More
        </button>
      </div>
    </div>
  );
}