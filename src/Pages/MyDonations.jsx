import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import MyDonationCard from "../Components/MyDonationCard";
import { FaFilter, FaSort } from "react-icons/fa";

export default function MyDonations() {
  const donations = useLoaderData();
  const { user } = useContext(AuthContext);
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  
  // Filter donations by current user
  const myDonations = donations.filter(donation => user.email === donation.userEmail);
  
  // Calculate total donations and count
  const totalAmount = myDonations.reduce((sum, donation) => sum + (donation.MyDonationAmount || 0), 0);
  const campaignCount = myDonations.length;
  
  // Filter and sort donations
  const filteredAndSortedDonations = myDonations
    .filter(donation => {
      if (filterBy === 'all') return true;
      return donation.campaignType === filterBy;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.donatedAt) - new Date(a.donatedAt);
        case 'amount':
          return (b.MyDonationAmount || 0) - (a.MyDonationAmount || 0);
        case 'title':
          return a.campaignTitle.localeCompare(b.campaignTitle);
        default:
          return 0;
      }
    });

  // Calculate pagination
  const totalItems = filteredAndSortedDonations.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDonations = filteredAndSortedDonations.slice(startIndex, endIndex);
  
  // Handle page changes
  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };
  
  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };
  
  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  
  // Reset to page 1 when filter/sort changes
  const handleFilterChange = (value) => {
    setFilterBy(value);
    setCurrentPage(1);
  };
  
  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mb-2">
            My Donations
          </h1>
          <p className="text-lg text-gray-600 font-inter mb-6">
            Track all the campaigns you've supported
          </p>
          
          {/* Stats */}
          <div className="flex items-center gap-6 mb-6">
            <div className="text-gray-600 font-inter">
              <span className="font-semibold">Total Donations:</span> ${totalAmount.toFixed(2)}
            </div>
            <div className="text-gray-600 font-inter">
              <span className="font-semibold">Campaigns:</span> {campaignCount}
            </div>
          </div>
          
          {/* Filter and Sort Controls */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="text-gray-600 font-inter">
                  <span className="font-semibold">Showing:</span> {currentDonations.length} of {totalItems} donations
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2">
                  <FaFilter className="text-gray-500" />
                  <select
                  value={filterBy}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="select select-bordered bg-white text-gray-900 font-inter border-gray-300 focus:border-blue-500"
                  >
                  <option value="all">Filter</option>
                  <option value="Personal Issue">Personal Issue</option>
                  <option value="Startup">Startup</option>
                  <option value="Business">Business</option>
                  <option value="Creative Ideas">Creative Ideas</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <FaSort className="text-gray-500" />
                  <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="select select-bordered bg-white text-gray-900 font-inter border-gray-300 focus:border-blue-500"
                  >
                  <option value="recent">Sort</option>
                  <option value="recent">Most Recent</option>
                  <option value="amount">Highest Amount</option>
                  <option value="title">Title A-Z</option>
                  </select>
                </div>
                </div>
                </div>
              </div>

              {/* Donations Grid */}
        {totalItems > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentDonations.map(myDonation => (
                <MyDonationCard key={myDonation._id} myDonation={myDonation} />
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                {/* Page Info */}
                <div className="text-gray-600 font-inter">
                  Page {currentPage} of {totalPages}
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 border-0 px-4 py-2 rounded-lg font-semibold font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`btn px-3 py-2 rounded-lg font-semibold font-poppins ${
                          currentPage === pageNum 
                            ? 'bg-blue-600 text-white border-0' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700 border-0'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 border-0 px-4 py-2 rounded-lg font-semibold font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                
                {/* Load More Option */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleLoadMore}
                    disabled={currentPage === totalPages}
                    className="btn bg-blue-600 hover:bg-blue-700 text-white border-0 px-6 py-2 rounded-lg font-semibold font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Load More
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <p className="text-gray-500 font-inter text-lg mb-4">
                No donations found.
              </p>
              <p className="text-gray-400 font-inter">
                Start supporting campaigns to see your donation history here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}