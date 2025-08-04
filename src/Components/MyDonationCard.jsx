import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaDollarSign, FaEye } from 'react-icons/fa';

// Helper function to get category color and style
const getCategoryStyle = (type) => {
const styles = {
    "Personal Issue": "bg-purple-600 text-white",
    "Startup": "bg-yellow-600 text-white",
    "Business": "bg-blue-600 text-white",
    "Creative Ideas": "bg-pink-600 text-white"
};
  return styles[type] || "bg-gray-600 text-white";
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 30) return `${diffDays} days ago`;
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Helper function to calculate mock progress (TODO: Replace with actual data)
const calculateProgress = () => {
  // TODO: Get actual progress from campaign API
  return Math.floor(Math.random() * 100) + 1;
};

// Helper function to get campaign status
const getCampaignStatus = (progress) => {
  if (progress >= 100) return { text: 'Goal Reached!', color: 'text-green-600' };
  if (progress >= 75) return { text: 'Almost There!', color: 'text-orange-600' };
  return { text: `${progress}% funded`, color: 'text-blue-600' };
};

// Helper function to check if deadline has passed
const isDeadlinePassed = (deadline) => {
  if (!deadline) return false;
  const today = new Date();
  today.setHours(23, 59, 59, 999); // Set to end of today
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(23, 59, 59, 999); // Set to end of deadline day
  return today > deadlineDate;
};

// Helper function to calculate days left until deadline
const calculateDaysLeft = (deadline) => {
  if (!deadline) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(23, 59, 59, 999); // End of deadline day
  const timeDiff = deadlineDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return Math.max(daysLeft, 0); // Never return negative
};

// Helper function to check if today is the deadline day
const isDeadlineToday = (deadline) => {
  if (!deadline) return false;
  const today = new Date();
  const deadlineDate = new Date(deadline);
  return today.toDateString() === deadlineDate.toDateString();
};

// Helper function to get status badge info
const getStatusBadge = (progress, deadline) => {
  // If no deadline is provided, check only progress
  if (!deadline) {
    if (progress >= 100) {
      return { text: 'Completed', bgColor: 'bg-green-500/90', textColor: 'text-white' };
    } else {
      return { text: 'Active', bgColor: 'bg-white/90', textColor: 'text-gray-700' };
    }
  }

  const deadlinePassed = isDeadlinePassed(deadline);
  const deadlineToday = isDeadlineToday(deadline);
  
  // If deadline has passed (not including today)
  if (deadlinePassed && !deadlineToday) {
    if (progress >= 100) {
      return { text: 'Completed', bgColor: 'bg-green-500/90', textColor: 'text-white' };
    } else {
      return { text: 'Expired', bgColor: 'bg-red-500/90', textColor: 'text-white' };
    }
  }
  
  // If today is the deadline day or deadline is in the future
  if (progress >= 100) {
    return { text: 'Completed', bgColor: 'bg-green-500/90', textColor: 'text-white' };
  } else {
    return { text: 'Active', bgColor: 'bg-white/90', textColor: 'text-gray-700' };
  }
};

export default function MyDonationCard({ myDonation }) {
  const navigate = useNavigate();
  
  // TODO: Replace with actual campaign data when available
  const mockData = {
    goalAmount: 5000, // TODO: Get from campaign API
    raisedAmount: 3200, // TODO: Get from donations API
    daysLeft: Math.floor(Math.random() * 30) + 1 // TODO: Calculate from campaign deadline
  };
  
  const progress = calculateProgress();
  const status = getCampaignStatus(progress);
  const statusBadge = getStatusBadge(progress, myDonation.donationDeadline);
  
  const handleViewCampaign = () => {
    navigate(`/campaigns/${myDonation.campaignId}`);
  };
  
  const handleViewUpdates = () => {
    // TODO: Navigate to campaign updates page when implemented
    navigate(`/campaigns/${myDonation.campaignId}/updates`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Campaign Image */}
      <div className="relative">
        <img
          src={myDonation.campaignImage || "https://via.placeholder.com/400x200?text=Campaign+Image"}
          alt={myDonation.campaignTitle}
          className="w-full h-48 object-cover"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryStyle(myDonation.campaignType)}`}>
            {myDonation.campaignType}
          </span>
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`${statusBadge.bgColor} backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold ${statusBadge.textColor}`}>
            {statusBadge.text}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Campaign Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 font-poppins line-clamp-2">
          {myDonation.campaignTitle}
        </h3>

        {/* Donation Info */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 font-inter text-sm">Your Donation:</span>
            <span className="font-bold text-green-600 text-lg font-poppins">
              ${myDonation.MyDonationAmount || 0}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 font-inter text-sm">Min. Donation:</span>
            <span className="font-semibold text-gray-700 font-poppins">
              ${myDonation.minDonation}
            </span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-500 font-inter text-sm">Progress</span>
            <span className={`font-semibold ${status.color} font-inter text-sm`}>
              {status.text}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          
          {/* Progress Stats */}
          <div className="flex justify-between text-sm text-gray-500 font-inter">
            <span>Goal: ${mockData.goalAmount.toLocaleString()}</span>
            <span>Raised: ${mockData.raisedAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Date and Days Left */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500 font-inter">
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="text-gray-400" />
            <span>Donated {formatDate(myDonation.donatedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaDollarSign className="text-gray-400" />
            <span>
              {(() => {
                if (!myDonation.donationDeadline) {
                  return 'No deadline';
                }
                
                const deadlineToday = isDeadlineToday(myDonation.donationDeadline);
                const deadlinePassed = isDeadlinePassed(myDonation.donationDeadline);
                
                if (deadlineToday) {
                  return 'Deadline today';
                } else if (deadlinePassed) {
                  return 'Expired';
                } else {
                  const days = calculateDaysLeft(myDonation.donationDeadline);
                  return days === 1 ? '1 day left' : `${days} days left`;
                }
              })()}
            </span>
          </div>
        </div>

        {/* Action Buttons - Push to bottom */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleViewCampaign}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-200 font-semibold font-poppins text-sm flex items-center justify-center gap-1"
          >
            <FaEye />
            View Campaign
          </button>
          <button
            onClick={handleViewUpdates}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-all duration-200 font-semibold font-poppins text-sm"
          >
            View Updates
          </button>
        </div>
      </div>
    </div>
  );
}