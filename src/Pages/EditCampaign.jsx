import { useContext, useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import { AuthContext } from "../Contexts/AuthContext";

const campaignTypes = [
  "Personal Issue",
  "Startup", 
  "Business",
  "Creative Ideas",
];

export default function EditCampaign() {
  const campaign = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [form, setForm] = useState({
    image: "",
    title: "",
    type: campaignTypes[0],
    description: "",
    minDonation: "",
    deadline: "",
    goalAmount: "",
    creatorEmail: "",
    creatorName: "",
    creatorPhoto: "",
  });
  const [loading, setLoading] = useState(false);

  // Pre-fill form with campaign data
  useEffect(() => {
    if (campaign) {
      // Format date for input field (convert from YYYY-MM-DD to YYYY-MM-DD)
      const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };

      setForm({
        image: campaign.image || "",
        title: campaign.title || "",
        type: campaign.type || campaignTypes[0],
        description: campaign.description || "",
        minDonation: campaign.minDonation || "",
        deadline: formatDate(campaign.deadline),
        goalAmount: campaign.goalAmount || "",
        creatorEmail: campaign.creatorEmail || "",
        creatorName: campaign.creatorName || "",
        creatorPhoto: campaign.creatorPhoto || "",
      });
    }
  }, [campaign]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Log form data for debugging
    console.log('Submitting campaign update:', form);

    try {
      const response = await fetch(`https://crowd-cube-server-zeta.vercel.app/campaigns/${campaign._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      
      if (response.ok) {
        await Swal.fire({
          title: 'Success!',
          text: 'Your campaign has been updated successfully!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Great!'
        });
        
        // Navigate back to my campaigns
        navigate('/my-campaigns');
      } else {
        throw new Error(data.message || 'Failed to update campaign');
      }
    } catch (error) {
      console.error('Error updating campaign:', error);
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to update campaign. Please try again.',
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setLoading(false);
    }
  };

  // Verify user owns this campaign
  if (user && campaign && user.email !== campaign.creatorEmail) {
    console.log('Access denied: User email does not match campaign creator');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You can only edit your own campaigns.</p>
          <button
            onClick={() => navigate('/my-campaigns')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to My Campaigns
          </button>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-inter">Loading campaign...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-background py-14 px-2 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-card-bg rounded-2xl shadow-xl p-8 flex flex-col gap-6 font-inter border border-divider"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <FaEdit className="text-2xl text-primary" />
          <h2
            className="text-2xl md:text-3xl font-extrabold font-poppins text-primary tracking-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Edit Campaign
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image URL - Full Width */}
          <div className="md:col-span-2">
            <label className="block mb-1.5 font-semibold text-text-primary font-poppins">Image/Thumbnail URL</label>
            <input
              type="url"
              required
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              className="input input-bordered w-full bg-background text-base font-inter border-divider focus:border-primary focus:ring-2 focus:ring-primary"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Title - Full Width */}
          <div className="md:col-span-2">
            <label className="block mb-1.5 font-semibold text-text-primary font-poppins">Campaign Title</label>
            <input
              type="text"
              required
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter campaign title"
              className="input input-bordered w-full bg-background text-base font-inter border-divider focus:border-primary focus:ring-2 focus:ring-primary"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Type */}
          <div>
            <label className="block mb-1.5 font-semibold text-text-primary font-poppins">Campaign Type</label>
            <select
              required
              name="type"
              value={form.type}
              onChange={handleChange}
              className="select select-bordered w-full bg-background text-base font-inter border-divider focus:border-primary focus:ring-2 focus:ring-primary"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {campaignTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Minimum Donation */}
          <div>
            <label className="block mb-1.5 font-semibold text-text-primary font-poppins">Minimum Donation Amount ($)</label>
            <input
              type="number"
              required
              name="minDonation"
              min="1"
              value={form.minDonation}
              onChange={handleChange}
              placeholder="e.g., 10"
              className="input input-bordered w-full bg-background text-base font-inter border-divider focus:border-primary focus:ring-2 focus:ring-primary"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block mb-1.5 font-semibold text-text-primary font-poppins">Deadline</label>
            <input
              type="date"
              required
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="input input-bordered w-full bg-background text-base font-inter border-divider focus:border-primary focus:ring-2 focus:ring-primary"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Goal Amount */}
          <div>
            <label className="block mb-1.5 font-semibold text-text-primary font-poppins">Goal Amount ($)</label>
            <input
              type="number"
              required
              name="goalAmount"
              min="1"
              value={form.goalAmount}
              onChange={handleChange}
              placeholder="e.g., 1000"
              className="input input-bordered w-full bg-background text-base font-inter border-divider focus:border-primary focus:ring-2 focus:ring-primary"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-1.5 font-semibold text-text-primary font-poppins">Description</label>
            <textarea
              required
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your campaign..."
              className="textarea textarea-bordered w-full bg-background text-base font-inter border-divider focus:border-primary focus:ring-2 focus:ring-primary"
              rows={4}
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* User Email */}
          <div>
            <label className="block mb-1.5 font-semibold text-text-primary font-poppins">Creator Email</label>
            <input
              type="email"
              value={form.creatorEmail}
              readOnly
              disabled
              className="input input-bordered w-full bg-disabled text-base font-inter text-text-secondary border-divider cursor-not-allowed"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* User Name */}
          <div>
            <label className="block mb-1.5 font-semibold text-text-primary font-poppins">Creator Name</label>
            <input
              type="text"
              value={form.creatorName}
              readOnly
              disabled
              className="input input-bordered w-full bg-disabled text-base font-inter text-text-secondary border-divider cursor-not-allowed"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate('/my-campaigns')}
            className="btn flex-1 rounded-full text-base sm:text-lg font-bold font-poppins bg-gray-500 text-white hover:bg-gray-600 border-0 shadow-lg transition-all py-3 sm:py-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn flex-1 btn-primary rounded-full text-base sm:text-lg font-bold font-poppins bg-primary py-3 sm:py-4 text-button-text hover:bg-accent-purple border-0 shadow-lg transition-all"
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <div>
                <FaEdit className="inline mr-2" /> Update Campaign
              </div>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
