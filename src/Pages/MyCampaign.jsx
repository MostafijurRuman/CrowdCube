import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import MyCampaignsTable from '../../src/Components/MyCampaignsTable';

// Fetch campaigns from API and filter by user email
const fetchUserCampaigns = async (userEmail) => {
  try {
    console.log(`Fetching campaigns for user: ${userEmail}`);
    
    // Fetch all campaigns from API
    const response = await fetch('http://localhost:5000/campaigns');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const allCampaigns = await response.json();
    
    // Filter campaigns by creatorEmail matching the logged-in user's email
    const userCampaigns = allCampaigns.filter(campaign => 
      campaign.creatorEmail === userEmail
    );
    
    console.log(`Found ${userCampaigns.length} campaigns for user ${userEmail}`);
    return userCampaigns;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};

// Delete campaign API call
const deleteCampaign = async (campaignId) => {
  try {
    const response = await fetch(`http://localhost:5000/campaigns/${campaignId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting campaign:', error);
    throw error;
  }
};

export default function MyCampaign() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserCampaigns = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Only fetch if user is available and not in auth loading state
        if (user?.email && !authLoading) {
          // Fetch campaigns filtered by user email
          const userCampaigns = await fetchUserCampaigns(user.email);
          setCampaigns(userCampaigns);
        }
      } catch (err) {
        console.error('Failed to fetch user campaigns:', err);
        setError('Failed to load your campaigns. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      if (!user) {
        // User is not authenticated, redirect to login
        navigate('/login');
        return;
      }
      loadUserCampaigns();
    }
  }, [user, authLoading, navigate]);

  // Show loading while auth is being determined
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-inter">Loading...</p>
        </div>
      </div>
    );
  }

  // User is not authenticated
  if (!user) {
    return null; // Component will redirect in useEffect
  }

  // Handle campaign update
  const handleUpdate = (campaignId) => {
    // TODO: Navigate to update campaign page when implemented
    console.log('Update campaign:', campaignId);
    navigate(`/campaigns/${campaignId}/edit`);
  };

  // Handle campaign delete
  const handleDelete = async (campaignId) => {
    if (!window.confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      
      // Call API to delete campaign
      await deleteCampaign(campaignId);
      
      // Remove from local state on successful deletion
      setCampaigns(campaigns.filter(campaign => campaign._id !== campaignId));
      
      // TODO: Show success message/toast instead of alert
      alert('Campaign deleted successfully!');
    } catch (err) {
      console.error('Failed to delete campaign:', err);
      // TODO: Show error message/toast instead of alert
      alert('Failed to delete campaign. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-inter">Loading your campaigns...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-inter mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mb-2">
            My Campaigns
          </h1>
          <p className="text-lg text-gray-600 font-inter">
            Manage and track your crowdfunding campaigns
          </p>
        </div>

        {/* Campaigns Table */}
        {campaigns.length > 0 && (
          <MyCampaignsTable 
            campaigns={campaigns}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}

        {/* Empty State */}
        {campaigns.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <p className="text-gray-500 font-inter text-lg mb-4">
                You haven't created any campaigns yet.
              </p>
              <button
                onClick={() => navigate('/add-campaign')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 font-poppins"
              >
                Create Your First Campaign
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}