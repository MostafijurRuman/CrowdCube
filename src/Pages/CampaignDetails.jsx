import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaDollarSign, FaShare, FaFacebook, FaTwitter, FaLink, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../Contexts/AuthContext';
import { toast } from 'react-toastify';



// Function to save donation to backend
const saveDonation = async (donationData) => {
  try {
    const response = await fetch(`http://localhost:5000/donations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donationData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Error saving donation:', error);
    return { success: false, error: error.message };
  }
};

// Helper function to calculate days left
const calculateDaysLeft = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const timeDiff = deadlineDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysLeft > 0 ? daysLeft : 0;
};

// Helper function to check if deadline has passed
const isDeadlinePassed = (deadline) => {
  if (!deadline) return false;
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(23, 59, 59, 999);
  return today > deadlineDate;
};

// Helper function to check if today is the deadline day
const isDeadlineToday = (deadline) => {
  if (!deadline) return false;
  const today = new Date();
  const deadlineDate = new Date(deadline);
  return today.toDateString() === deadlineDate.toDateString();
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
  const [isLoading, setIsLoading] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const {user} = useContext(AuthContext)
 

  // Mock data for demo - replace with actual API calls
  const raisedAmount = 24750; // TODO: Get from API
  const backersCount = 127; // TODO: Get from API
  const daysLeft = calculateDaysLeft(campaign.deadline);
  const progressPercent = (raisedAmount / parseInt(campaign.goalAmount)) * 100;
  
  // Check if campaign is expired
  const isExpired = isDeadlinePassed(campaign.deadline);
  const isTodayDeadline = isDeadlineToday(campaign.deadline);

  const handleDonate = () => {
    if (isExpired) {
      toast.error('This campaign has expired and is no longer accepting donations.');
      return;
    }
    setShowDonationModal(true);
  };

  const handleDonationSubmit = async () => {
    if (!donationAmount || parseFloat(donationAmount) < parseFloat(campaign.minDonation)) {
      toast.error(`Minimum donation amount is $${campaign.minDonation}`);
      return;
    }

    setIsLoading(true);
    
    try {
      const donationData = {
        campaignId: campaign._id,
        campaignImage: campaign.image,
        campaignType: campaign.type,
        campaignTitle: campaign.title,
        minDonation: campaign.minDonation,
        userEmail: user.email,
        userName: user.displayName,
        donatedAt: new Date().toISOString(),
        donationDeadline: campaign.deadline,
        MyDonationAmount: parseFloat(donationAmount)
      };

      // Send donation to backend API
      const result = await saveDonation(donationData, campaign._id);
      
      if (result.success) {
        // Show success toast
        toast.success('Thank you for your donation! 🎉');
        setShowDonationModal(false);
        setDonationAmount('');
      } else {
        // Show error toast with specific error message
        toast.error(result.error || 'Donation failed. Please try again.');
      }
    } catch (error) {
      console.error('Donation failed:', error);
      // Show error toast
      toast.error('Donation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeDonationModal = () => {
    setShowDonationModal(false);
    setDonationAmount('');
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
        toast.success('Link copied to clipboard! 📋');
        break;
    }
  };
  

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
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {campaign.type}
              </span>
              {isExpired && (
                <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium animate-pulse">
                  ⏰ Expired
                </span>
              )}
              {isTodayDeadline && !isExpired && (
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium animate-pulse">
                  🔥 Last Day
                </span>
              )}
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
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                  <img
                    src={campaign.creatorPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(campaign.creatorName)}&background=3b82f6&color=ffffff&size=48`}
                    alt={campaign.creatorName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(campaign.creatorName)}&background=3b82f6&color=ffffff&size=48`;
                    }}
                  />
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
                  {isExpired ? (
                    <>
                      <div className="text-2xl font-bold text-red-600 font-poppins">Expired</div>
                      <div className="text-gray-500 font-inter text-sm">Campaign</div>
                    </>
                  ) : isTodayDeadline ? (
                    <>
                      <div className="text-2xl font-bold text-orange-600 font-poppins">Last Day</div>
                      <div className="text-gray-500 font-inter text-sm">To Donate</div>
                    </>
                  ) : (
                    <>
                      <div className="text-2xl font-bold text-gray-900 font-poppins">{daysLeft}</div>
                      <div className="text-gray-500 font-inter text-sm">Days left</div>
                    </>
                  )}
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
                disabled={isExpired}
                className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-200 font-poppins text-lg shadow-lg hover:shadow-xl mb-4 ${
                  isExpired 
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-60' 
                    : isTodayDeadline
                    ? 'bg-orange-600 hover:bg-orange-700 text-white animate-pulse'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isExpired 
                  ? '⏰ Campaign Expired' 
                  : isTodayDeadline 
                  ? '🔥 Last Day - Donate Now!'
                  : '💚 Donate Now'
                }
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

      {/* Donation Modal */}
      {showDonationModal && (
        <div className="fixed inset-0 bg-gradient-to-br from-white/30 via-gray-100/20 to-green-100/30 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 max-w-md w-full p-8 transform transition-all duration-300 scale-100 animate-slideUp">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 font-poppins">Make a Donation</h3>
              <button
                onClick={closeDonationModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100/50 rounded-full"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Campaign Info */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 font-poppins text-sm">{campaign.title}</h4>
                  <p className="text-gray-500 font-inter text-xs">by {campaign.creatorName}</p>
                </div>
              </div>
            </div>

            {/* Donation Amount Input */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2 font-poppins">
                Donation Amount ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder={`Minimum ${campaign.minDonation}`}
                  min={campaign.minDonation}
                  step="0.01"
                  className="w-full pl-8 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-400 font-inter text-lg transition-all duration-200 shadow-sm"
                />
              </div>
              <p className="text-gray-500 text-sm mt-2 font-inter">
                Minimum donation: ${campaign.minDonation}
              </p>
            </div>

            {/* Quick Amount Buttons */}
            <div className="mb-6">
              <p className="text-gray-700 font-semibold mb-3 font-poppins">Quick amounts:</p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  campaign.minDonation,
                  parseInt(campaign.minDonation) * 2,
                  parseInt(campaign.minDonation) * 5,
                  parseInt(campaign.minDonation) * 10
                ].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setDonationAmount(amount.toString())}
                    className="bg-gray-50/80 hover:bg-green-100/80 backdrop-blur-sm text-gray-700 hover:text-green-700 py-2 px-3 rounded-xl transition-all duration-200 font-inter text-sm font-semibold border border-gray-200/30 hover:border-green-300/50 shadow-sm hover:shadow-md"
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3">
              <button
                onClick={closeDonationModal}
                className="flex-1 bg-gray-100/80 hover:bg-gray-200/80 backdrop-blur-sm text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 font-poppins border border-gray-200/50"
              >
                Cancel
              </button>
              <button
                onClick={handleDonationSubmit}
                disabled={isLoading || !donationAmount}
                className="flex-1 bg-green-600/90 hover:bg-green-700/90 backdrop-blur-sm text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 font-poppins disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl border border-green-500/20"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </span>
                ) : (
                  'Donate Now'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}