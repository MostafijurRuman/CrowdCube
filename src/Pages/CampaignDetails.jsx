import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaDollarSign, FaShare, FaFacebook, FaTwitter, FaLink } from 'react-icons/fa';

// TODO: Replace with actual auth hook when implemented
const useAuth = () => {
  // Mock auth state - replace with actual auth implementation
  return {
    user: {
      email: "mostafijurruman7@gmail.com",
      displayName: "MostafijurRuman"
    },
    isLoggedIn: true // Change to false to test redirect
  };
};

// TODO: Replace with actual API call when backend is ready
const saveDonation = async (donationData) => {
  // Mock API call - replace with actual implementation
  console.log('Saving donation to database:', donationData);
  
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, id: 'donation_123' });
    }, 1000);
  });
};

// Helper function to calculate days left
const calculateDaysLeft = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const timeDiff = deadlineDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysLeft > 0 ? daysLeft : 0;
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

export default function CampaignDetails() {
  const campaign = useLoaderData();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Remove when auth is implemented - this handles redirect to login
  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  // Mock data for demo - replace with actual API calls
  const raisedAmount = 24750; // TODO: Get from API
  const backersCount = 127; // TODO: Get from API
  const daysLeft = calculateDaysLeft(campaign.deadline);
  const progressPercent = (raisedAmount / parseInt(campaign.goalAmount)) * 100;

  const handleDonate = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    setIsLoading(true);
    
    try {
      const donationData = {
        campaignId: campaign._id,
        campaignTitle: campaign.title,
        userEmail: user.email,
        userName: user.displayName,
        donatedAt: new Date().toISOString(),
        // TODO: Add donation amount when donation form is implemented
        amount: campaign.minDonation
      };

      // TODO: Replace with actual API call
      const result = await saveDonation(donationData);
      
      if (result.success) {
        // TODO: Show success message/modal
        alert('Thank you for your donation!');
      }
    } catch (error) {
      console.error('Donation failed:', error);
      // TODO: Show error message
      alert('Donation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = campaign.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        // TODO: Show toast notification
        alert('Link copied to clipboard!');
        break;
    }
  };
  console.log(campaign.creatorName)

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Campaign Image */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-80 object-cover"
              />
            </div>

            {/* Campaign Category */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {campaign.type}
              </span>
            </div>

            {/* Campaign Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-poppins">
              {campaign.title}
            </h1>

            {/* Campaign Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 font-poppins">About This Campaign</h2>
              <p className="text-gray-700 leading-relaxed font-inter text-lg">
                {campaign.description}
              </p>
            </div>

            {/* Campaign Creator */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 font-poppins">Campaign Creator</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-semibold text-lg">
                    {campaign.creatorName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 font-poppins">{campaign.creatorName }</h4>
                  <p className="text-gray-500 font-inter text-sm">{campaign.creatorEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Campaign Stats & Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
              {/* Raised Amount */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 font-poppins">
                  ${raisedAmount.toLocaleString()}
                </h2>
                <p className="text-gray-500 font-inter">
                  raised of ${parseInt(campaign.goalAmount).toLocaleString()} goal
                </p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progressPercent, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 font-poppins">{backersCount}</div>
                  <div className="text-gray-500 font-inter text-sm">Backers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 font-poppins">{daysLeft}</div>
                  <div className="text-gray-500 font-inter text-sm">Days left</div>
                </div>
              </div>

              {/* Minimum Donation */}
              <div className="mb-6">
                <p className="text-gray-500 font-inter text-sm mb-1">Minimum Donation</p>
                <p className="text-2xl font-bold text-green-600 font-poppins">${campaign.minDonation}</p>
              </div>

              {/* Deadline */}
              <div className="mb-6 flex items-center gap-2">
                <FaCalendarAlt className="text-gray-400" />
                <span className="text-gray-500 font-inter">
                  Deadline: {formatDate(campaign.deadline)}
                </span>
              </div>

              {/* Donate Button */}
              <button
                onClick={handleDonate}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 font-poppins text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </span>
                ) : (
                  '💚 Donate Now'
                )}
              </button>

              {/* Share Campaign */}
              <div>
                <p className="text-gray-500 font-inter text-sm mb-3">Share this campaign</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1"
                  >
                    <FaFacebook />
                    <span className="text-sm">Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1"
                  >
                    <FaTwitter />
                    <span className="text-sm">Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-3 rounded-lg transition-all duration-200"
                  >
                    <FaLink />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}