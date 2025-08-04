import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Swal from 'sweetalert2'

// Dummy user data (replace with your actual auth context/hook)
const user = {
  email: "ripa@Ruman.com",
  displayName: "Ripali",
};

const campaignTypes = [
  "Personal Issue",
  "Startup",
  "Business",
  "Creative Ideas",
];

const AddCampaign = () => {
  const [form, setForm] = useState({
    image: "",
    title: "",
    type: campaignTypes[0],
    description: "",
    minDonation: "",
    deadline: "",
    goalAmount: "", 
    creatorEmail: user.email,
    creatorName: user.displayName,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Submit logic here
    fetch('http://localhost:5000/campaigns', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then(data => {
      if(data.insertedId){
        Swal.fire({
        title: `Your Campaign Successfully Added!`,
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'Done'
})
      }
    })
    // Reset or show success etc.
    setForm({
      image: "",
      title: "",
      type: campaignTypes[0],
      description: "",
      minDonation: "",
      deadline: "",
      goalAmount: "", 
      creatorEmail: user.email,
      creatorName: user.displayName,
    });
    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-background py-14 px-2 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-card-bg rounded-2xl shadow-xl p-8 flex flex-col gap-6 font-inter border border-divider"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <FaPlusCircle className="text-2xl text-primary" />
          <h2
            className="text-2xl md:text-3xl font-extrabold font-poppins text-primary tracking-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Add New Campaign
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
                <option key={type}>{type}</option>
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
            <label className="block mb-1.5 font-semibold text-text-primary font-poppins">Your Email</label>
            <input
              type="email"
              value={user.email}
              readOnly
              disabled
              className="input input-bordered w-full bg-disabled text-base font-inter text-text-secondary border-divider cursor-not-allowed"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* User Name */}
          <div>
            <label className="block mb-1.5 font-semibold text-text-primary font-poppins">Your Name</label>
            <input
              type="text"
              value={user.displayName}
              readOnly
              disabled
              className="input input-bordered w-full bg-disabled text-base font-inter text-text-secondary border-divider cursor-not-allowed"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full rounded-full text-lg font-bold font-poppins bg-primary text-button-text hover:bg-accent-purple border-0 shadow-lg mt-2 transition-all"
        >
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <>
              <FaPlusCircle className="inline mr-2" /> Add
            </>
          )}
        </button>
      </form>
    </section>
  );
};

export default AddCampaign;