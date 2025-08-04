import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const calculateProgress = (goalAmount) => {
  const mockRaisedAmount = Math.floor(Math.random() * parseInt(goalAmount));
  return Math.floor((mockRaisedAmount / parseInt(goalAmount)) * 100);
};

export default function MyCampaignsTable({ campaigns, onUpdate, onDelete }) {
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600 uppercase text-sm tracking-wide font-poppins">
          <div className="col-span-4">Campaign</div>
          <div className="col-span-2 text-center">Type</div>
          <div className="col-span-2 text-center">Min Donation</div>
          <div className="col-span-2 text-center">Deadline</div>
          <div className="col-span-1 text-center">Progress</div>
          <div className="col-span-1 text-center">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {campaigns.map((campaign) => {
            const progress = calculateProgress(campaign.goalAmount);

            return (
              <div
                key={campaign._id}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
              >
                {/* Campaign Info */}
                <div className="col-span-4 flex items-center gap-4">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 font-poppins text-base leading-tight truncate">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-500 font-inter text-sm mt-1 truncate">
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

                {/* Progress */}
                <div className="col-span-1 flex justify-center items-center">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-1">
                      <div className="relative w-12 h-12">
                        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="3"
                            strokeDasharray={`${progress}, 100`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-700">{progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex justify-center items-center">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => onUpdate(campaign._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 text-xs"
                      title="Update Campaign"
                    >
                      <FaEdit />
                      <span>Update</span>
                    </button>
                    <button
                      onClick={() => onDelete(campaign._id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 text-xs"
                      title="Delete Campaign"
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tablet View */}
      <div className="hidden md:block lg:hidden bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {campaigns.map((campaign) => {
            const progress = calculateProgress(campaign.goalAmount);

            return (
              <div
                key={campaign._id}
                className="p-6 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 font-poppins text-lg leading-tight mb-1">
                          {campaign.title}
                        </h3>
                        <p className="text-gray-500 font-inter text-sm line-clamp-2 mb-2">
                          {campaign.description}
                        </p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(campaign.type)}`}
                        >
                          {campaign.type}
                        </span>
                      </div>
                      <div className="ml-4 text-center">
                        <div className="w-16 h-16 mx-auto mb-2">
                          <div className="relative w-16 h-16">
                            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#e5e7eb"
                                strokeWidth="3"
                              />
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="3"
                                strokeDasharray={`${progress}, 100`}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-sm font-bold text-gray-700">{progress}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-gray-600 font-inter text-sm">Min Donation:</span>
                        <span className="font-bold text-gray-900 font-poppins text-lg ml-2">
                          ${campaign.minDonation}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 font-inter text-sm">Deadline:</span>
                        <span className="text-gray-500 font-inter ml-2">
                          {formatDate(campaign.deadline)}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => onUpdate(campaign._id)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <FaEdit />
                        <span>Update</span>
                      </button>
                      <button
                        onClick={() => onDelete(campaign._id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <FaTrash />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {campaigns.map((campaign) => {
          const progress = calculateProgress(campaign.goalAmount);

          return (
            <div
              key={campaign._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 font-poppins text-lg leading-tight mb-1">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-500 font-inter text-sm line-clamp-2 mb-2">
                      {campaign.description}
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(campaign.type)}`}
                    >
                      {campaign.type}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="w-14 h-14 mx-auto">
                      <div className="relative w-14 h-14">
                        <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="3"
                            strokeDasharray={`${progress}, 100`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-700">{progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-inter text-sm">Min Donation:</span>
                    <span className="font-bold text-gray-900 font-poppins text-lg">
                      ${campaign.minDonation}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-inter text-sm">Deadline:</span>
                    <span className="text-gray-500 font-inter">
                      {formatDate(campaign.deadline)}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="flex gap-3">
                    <button
                      onClick={() => onUpdate(campaign._id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <FaEdit />
                      <span>Update</span>
                    </button>
                    <button
                      onClick={() => onDelete(campaign._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
