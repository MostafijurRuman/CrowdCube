import { useState } from 'react';
import { FaSort } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Helper function to get category color
const getCategoryColor = (type) => {
  const colors = {
    "Personal Issue": "bg-red-100 text-red-700 border-red-200",
    "Startup": "bg-blue-100 text-blue-700 border-blue-200",
    "Business": "bg-purple-100 text-purple-700 border-purple-200",
    "Creative Ideas": "bg-yellow-100 text-yellow-700 border-yellow-200",
    "Technology": "bg-blue-100 text-blue-700 border-blue-200",
    "Environment": "bg-green-100 text-green-700 border-green-200",
    "Arts": "bg-purple-100 text-purple-700 border-purple-200",
    "Health": "bg-red-100 text-red-700 border-red-200"
  };
  return colors[type] || "bg-blue-100 text-blue-700 border-blue-200";
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export default function AllCampaigns({ campaigns }) {
  const [sortBy, setSortBy] = useState('minDonation');
  const navigate = useNavigate();

  // Sort campaigns based on selected criteria
  const sortedCampaigns = campaigns ? [...campaigns].sort((a, b) => {
    switch (sortBy) {
      case 'minDonation':
        return parseInt(a.minDonation) - parseInt(b.minDonation);
      case 'deadline':
        return new Date(a.deadline) - new Date(b.deadline);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'type':
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  }) : [];

  const handleSeeMore = (campaignId) => {
    navigate(`/campaigns/${campaignId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mb-2">
              All Campaigns
            </h1>
            <p className="text-lg text-gray-600 font-inter">
              Discover and support innovative projects from creators worldwide
            </p>
          </div>
          
          {/* Sort Dropdown */}
          <div className="mt-4 md:mt-0">
            <div className="flex items-center gap-2">
              <FaSort className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-bordered bg-white text-gray-900 font-inter border-gray-300 focus:border-blue-500"
              >
                <option value="minDonation">Sort by Min Donation</option>
                <option value="deadline">Sort by Deadline</option>
                <option value="title">Sort by Title</option>
                <option value="type">Sort by Type</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table - Desktop View */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600 uppercase text-sm tracking-wide font-poppins">
            <div className="col-span-5">Campaign</div>
            <div className="col-span-2 text-center">Type</div>
            <div className="col-span-2 text-center">Min Donation</div>
            <div className="col-span-2 text-center">Deadline</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {sortedCampaigns.map((campaign) => (
              <div 
                key={campaign._id} 
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
              >
                {/* Campaign Info */}
                <div className="col-span-5 flex items-center gap-4">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 font-poppins text-base leading-tight">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-500 font-inter text-sm mt-1 truncate max-w-xs">
                      {campaign.description}
                    </p>
                  </div>
                </div>

                {/* Type */}
                <div className="col-span-2 flex justify-center items-center">
                  <span 
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(campaign.type)}`}
                  >
                    {campaign.type}
                  </span>
                </div>

                {/* Min Donation */}
                <div className="col-span-2 flex justify-center items-center">
                  <span className="font-bold text-gray-900 font-poppins text-lg">
                    ${campaign.minDonation}
                  </span>
                </div>

                {/* Deadline */}
                <div className="col-span-2 flex justify-center items-center">
                  <span className="text-gray-500 font-inter">
                    {formatDate(campaign.deadline)}
                  </span>
                </div>

                {/* Action */}
                <div className="col-span-1 flex justify-center items-center">
                  <button
                    onClick={() => handleSeeMore(campaign._id)}
                    className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-lg font-semibold font-poppins px-4 transition-all duration-200"
                  >
                    See More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View - Card Layout */}
        <div className="md:hidden space-y-4">
          {sortedCampaigns.map((campaign) => (
            <div 
              key={campaign._id} 
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Campaign Image and Basic Info */}
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 font-poppins text-lg leading-tight mb-1">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-500 font-inter text-sm line-clamp-2">
                      {campaign.description}
                    </p>
                  </div>
                </div>

                {/* Campaign Details */}
                <div className="space-y-3">
                  {/* Type */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-inter text-sm">Type:</span>
                    <span 
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(campaign.type)}`}
                    >
                      {campaign.type}
                    </span>
                  </div>

                  {/* Min Donation */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-inter text-sm">Min Donation:</span>
                    <span className="font-bold text-gray-900 font-poppins text-lg">
                      ${campaign.minDonation}
                    </span>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-inter text-sm">Deadline:</span>
                    <span className="text-gray-500 font-inter">
                      {formatDate(campaign.deadline)}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleSeeMore(campaign._id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold font-poppins py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    See More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no campaigns) */}
        {(!campaigns || sortedCampaigns.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500 font-inter text-lg">
              No campaigns found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}