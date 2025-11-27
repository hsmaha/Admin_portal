
"use client";
import React, { useState, useMemo } from "react";

// Define a type for your registration data
interface Registration {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    city: string;
    country: string;
    phone: string;
    registered: string;
}

// Generate the mock data (Increased to 50 items for better pagination demonstration)
const API_DATA: Registration[] = [
  { id: 1, name: 'User 1', email: 'user1@example.com', role: 'Admin', status: 'Inactive', city: 'City 1', country: 'Country 1', phone: '+1234567890', registered: '2025-11-1' },
  { id: 2, name: 'User 2', email: 'user2@example.com', role: 'User', status: 'Active', city: 'City 2', country: 'Country 2', phone: '+1234567891', registered: '2025-11-2' },
  { id: 3, name: 'User 3', email: 'user3@example.com', role: 'User', status: 'Active', city: 'City 3', country: 'Country 3', phone: '+1234567892', registered: '2025-11-3' },
  { id: 4, name: 'User 4', email: 'user4@example.com', role: 'Admin', status: 'Active', city: 'City 4', country: 'Country 4', phone: '+1234567893', registered: '2025-11-4' },
  { id: 5, name: 'User 5', email: 'user5@example.com', role: 'User', status: 'Inactive', city: 'City 5', country: 'Country 5', phone: '+1234567894', registered: '2025-11-5' },
  { id: 6, name: 'User 6', email: 'user6@example.com', role: 'User', status: 'Active', city: 'City 6', country: 'Country 6', phone: '+1234567895', registered: '2025-11-6' },
  { id: 7, name: 'User 7', email: 'user7@example.com', role: 'Admin', status: 'Active', city: 'City 7', country: 'Country 7', phone: '+1234567896', registered: '2025-11-7' },
  { id: 8, name: 'User 8', email: 'user8@example.com', role: 'User', status: 'Inactive', city: 'City 8', country: 'Country 8', phone: '+1234567897', registered: '2025-11-8' },
  { id: 9, name: 'User 9', email: 'user9@example.com', role: 'User', status: 'Active', city: 'City 9', country: 'Country 9', phone: '+1234567898', registered: '2025-11-9' },
  { id: 10, name: 'User 10', email: 'user10@example.com', role: 'Admin', status: 'Active', city: 'City 10', country: 'Country 10', phone: '+1234567899', registered: '2025-11-10' },
  { id: 11, name: 'User 11', email: 'user11@example.com', role: 'User', status: 'Inactive', city: 'City 11', country: 'Country 11', phone: '+1234567900', registered: '2025-11-11' },
  { id: 12, name: 'User 12', email: 'user12@example.com', role: 'User', status: 'Active', city: 'City 12', country: 'Country 12', phone: '+1234567901', registered: '2025-11-12' },
  { id: 13, name: 'User 13', email: 'user13@example.com', role: 'Admin', status: 'Active', city: 'City 13', country: 'Country 13', phone: '+1234567902', registered: '2025-11-13' },
  { id: 14, name: 'User 14', email: 'user14@example.com', role: 'User', status: 'Inactive', city: 'City 14', country: 'Country 14', phone: '+1234567903', registered: '2025-11-14' },
  { id: 15, name: 'User 15', email: 'user15@example.com', role: 'User', status: 'Active', city: 'City 15', country: 'Country 15', phone: '+1234567904', registered: '2025-11-15' },
  { id: 16, name: 'User 16', email: 'user16@example.com', role: 'Admin', status: 'Active', city: 'City 16', country: 'Country 16', phone: '+1234567905', registered: '2025-11-16' },
  { id: 17, name: 'User 17', email: 'user17@example.com', role: 'User', status: 'Inactive', city: 'City 17', country: 'Country 17', phone: '+1234567906', registered: '2025-11-17' },
  { id: 18, name: 'User 18', email: 'user18@example.com', role: 'User', status: 'Active', city: 'City 18', country: 'Country 18', phone: '+1234567907', registered: '2025-11-18' },
  { id: 19, name: 'User 19', email: 'user19@example.com', role: 'Admin', status: 'Active', city: 'City 19', country: 'Country 19', phone: '+1234567908', registered: '2025-11-19' },
  { id: 20, name: 'User 20', email: 'user20@example.com', role: 'User', status: 'Inactive', city: 'City 20', country: 'Country 20', phone: '+1234567909', registered: '2025-11-20' },
  { id: 21, name: 'User 21', email: 'user21@example.com', role: 'User', status: 'Active', city: 'City 21', country: 'Country 21', phone: '+1234567910', registered: '2025-11-21' },
  { id: 22, name: 'User 22', email: 'user22@example.com', role: 'Admin', status: 'Active', city: 'City 22', country: 'Country 22', phone: '+1234567911', registered: '2025-11-22' },
  { id: 23, name: 'User 23', email: 'user23@example.com', role: 'User', status: 'Inactive', city: 'City 23', country: 'Country 23', phone: '+1234567912', registered: '2025-11-23' },
  { id: 24, name: 'User 24', email: 'user24@example.com', role: 'User', status: 'Active', city: 'City 24', country: 'Country 24', phone: '+1234567913', registered: '2025-11-24' },
  { id: 25, name: 'User 25', email: 'user25@example.com', role: 'Admin', status: 'Active', city: 'City 25', country: 'Country 25', phone: '+1234567914', registered: '2025-11-25' },
  { id: 26, name: 'User 26', email: 'user26@example.com', role: 'User', status: 'Inactive', city: 'City 26', country: 'Country 26', phone: '+1234567915', registered: '2025-11-26' },
  { id: 27, name: 'User 27', email: 'user27@example.com', role: 'User', status: 'Active', city: 'City 27', country: 'Country 27', phone: '+1234567916', registered: '2025-11-27' },
  { id: 28, name: 'User 28', email: 'user28@example.com', role: 'Admin', status: 'Active', city: 'City 28', country: 'Country 28', phone: '+1234567917', registered: '2025-11-28' },
  { id: 29, name: 'User 29', email: 'user29@example.com', role: 'User', status: 'Inactive', city: 'City 29', country: 'Country 29', phone: '+1234567918', registered: '2025-11-1' },
  { id: 30, name: 'User 30', email: 'user30@example.com', role: 'User', status: 'Active', city: 'City 30', country: 'Country 30', phone: '+1234567919', registered: '2025-11-2' },
  { id: 31, name: 'User 31', email: 'user31@example.com', role: 'Admin', status: 'Active', city: 'City 31', country: 'Country 31', phone: '+1234567920', registered: '2025-11-3' },
  { id: 32, name: 'User 32', email: 'user32@example.com', role: 'User', status: 'Inactive', city: 'City 32', country: 'Country 32', phone: '+1234567921', registered: '2025-11-4' },
  { id: 33, name: 'User 33', email: 'user33@example.com', role: 'User', status: 'Active', city: 'City 33', country: 'Country 33', phone: '+1234567922', registered: '2025-11-5' },
  { id: 34, name: 'User 34', email: 'user34@example.com', role: 'Admin', status: 'Active', city: 'City 34', country: 'Country 34', phone: '+1234567923', registered: '2025-11-6' },
  { id: 35, name: 'User 35', email: 'user35@example.com', role: 'User', status: 'Inactive', city: 'City 35', country: 'Country 35', phone: '+1234567924', registered: '2025-11-7' },
  { id: 36, name: 'User 36', email: 'user36@example.com', role: 'User', status: 'Active', city: 'City 36', country: 'Country 36', phone: '+1234567925', registered: '2025-11-8' },
  { id: 37, name: 'User 37', email: 'user37@example.com', role: 'Admin', status: 'Active', city: 'City 37', country: 'Country 37', phone: '+1234567926', registered: '2025-11-9' },
  { id: 38, name: 'User 38', email: 'user38@example.com', role: 'User', status: 'Inactive', city: 'City 38', country: 'Country 38', phone: '+1234567927', registered: '2025-11-10' },
  { id: 39, name: 'User 39', email: 'user39@example.com', role: 'User', status: 'Active', city: 'City 39', country: 'Country 39', phone: '+1234567928', registered: '2025-11-11' },
  { id: 40, name: 'User 40', email: 'user40@example.com', role: 'Admin', status: 'Active', city: 'City 40', country: 'Country 40', phone: '+1234567929', registered: '2025-11-12' },
  { id: 41, name: 'User 41', email: 'user41@example.com', role: 'User', status: 'Inactive', city: 'City 41', country: 'Country 41', phone: '+1234567930', registered: '2025-11-13' },
  { id: 42, name: 'User 42', email: 'user42@example.com', role: 'User', status: 'Active', city: 'City 42', country: 'Country 42', phone: '+1234567931', registered: '2025-11-14' },
  { id: 43, name: 'User 43', email: 'user43@example.com', role: 'Admin', status: 'Active', city: 'City 43', country: 'Country 43', phone: '+1234567932', registered: '2025-11-15' },
  { id: 44, name: 'User 44', email: 'user44@example.com', role: 'User', status: 'Inactive', city: 'City 44', country: 'Country 44', phone: '+1234567933', registered: '2025-11-16' },
  { id: 45, name: 'User 45', email: 'user45@example.com', role: 'User', status: 'Active', city: 'City 45', country: 'Country 45', phone: '+1234567934', registered: '2025-11-17' },
  { id: 46, name: 'User 46', email: 'user46@example.com', role: 'Admin', status: 'Active', city: 'City 46', country: 'Country 46', phone: '+1234567935', registered: '2025-11-18' },
  { id: 47, name: 'User 47', email: 'user47@example.com', role: 'User', status: 'Inactive', city: 'City 47', country: 'Country 47', phone: '+1234567936', registered: '2025-11-19' },
  { id: 48, name: 'User 48', email: 'user48@example.com', role: 'User', status: 'Active', city: 'City 48', country: 'Country 48', phone: '+1234567937', registered: '2025-11-20' },
  { id: 49, name: 'User 49', email: 'user49@example.com', role: 'Admin', status: 'Active', city: 'City 49', country: 'Country 49', phone: '+1234567938', registered: '2025-11-21' },
  { id: 50, name: 'User 50', email: 'user50@example.com', role: 'User', status: 'Inactive', city: 'City 50', country: 'Country 50', phone: '+1234567939', registered: '2025-11-22' }
];

// MOCK_REGISTRATIONS now points to the static API_DATA array
const MOCK_REGISTRATIONS: Registration[] = API_DATA;
const ITEMS_PER_PAGE = 10; // Define how many items to show per page

export default function quizResponses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State for current page

  // --- Search Logic (from previous step) ---
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page whenever search query changes
  };

  const filteredRegistrations = useMemo(() => {
    if (!searchQuery) {
      return MOCK_REGISTRATIONS;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();

    return MOCK_REGISTRATIONS.filter(registration => 
        registration.name.toLowerCase().includes(lowerCaseQuery) ||
        registration.email.toLowerCase().includes(lowerCaseQuery) ||
        registration.city.toLowerCase().includes(lowerCaseQuery) ||
        registration.country.toLowerCase().includes(lowerCaseQuery) ||
        registration.role.toLowerCase().includes(lowerCaseQuery) ||
        registration.status.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery]);


  // --- Pagination Logic ---
  
  // 1. Calculate total pages
  const totalPages = Math.ceil(filteredRegistrations.length / ITEMS_PER_PAGE);

  // 2. Determine slice start and end indices
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // 3. Get the data for the current page
  const paginatedRegistrations = filteredRegistrations.slice(startIndex, endIndex);

  // Pagination handlers
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };
  
  // Helper to generate an array of page numbers to display in the pagination bar
  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      endPage = Math.min(totalPages, 5);
    } else if (currentPage > totalPages - 2) {
      startPage = Math.max(1, totalPages - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  // Ensure current page is valid after filtering
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }


  return(
    <>
     <div className="w-full **min-h-screen** p-4" 
     style={{ 
      backgroundImage: "url('https://hsconsultants.pk/images/bg.jpg')", 
     backgroundSize: "100% 100%", // Ensures full image fits perfectly 
     backgroundRepeat: "no-repeat",
     }} >
         <div className="pt-8 mb-6" >
            <img className="mx-auto" src="https://hsconsultants.net/images/pages/post-01.png" alt="" height={280} width={280}/>
         </div>

        
        <div className="bg-white dark:bg-black relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                        <label className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input 
                                type="text" 
                                id="simple-search" 
                                className="bg-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                placeholder="Search Name, Email, City, or Role" 
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </form>
                </div>
                {/* ... (Actions/Filter Dropdowns remain unchanged) ... */}
               
            </div>

            <div className="flex-1 overflow-auto border border-gray-700 rounded-lg">
                <table className="min-w-max text-sm text-left border-collapse w-full">
                    <thead className="bg-black sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">City</th>
                            <th className="px-6 py-3">Country</th>
                            <th className="px-6 py-3">Phone</th>
                            <th className="px-6 py-3">Registered</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-700">
                        {paginatedRegistrations.map((registration, i) => (
                        <tr
                            key={registration.id}
                            className={`${
                            i % 2 === 0 ? "bg-black" : "bg-gray-600"
                            } hover:bg-gray-700`}
                        >
                            <td className="px-6 py-3">{registration.id}</td>
                            <td className="px-6 py-3">{registration.name}</td>
                            <td className="px-6 py-3">{registration.email}</td>
                            <td className="px-6 py-3">{registration.role}</td>
                            <td className="px-6 py-3">{registration.status}</td>
                            <td className="px-6 py-3">{registration.city}</td>
                            <td className="px-6 py-3">{registration.country}</td>
                            <td className="px-6 py-3">{registration.phone}</td>
                            <td className="px-6 py-3">{registration.registered}</td>
                            <td className="px-6 py-3">Edit | Delete</td>
                        </tr>
                        ))}

                        {/* Display message if no results found */}
                        {filteredRegistrations.length === 0 && (
                            <tr className="bg-black">
                                <td colSpan={10} className="px-6 py-4 text-center text-lg text-gray-400">
                                No registrations found matching "{searchQuery}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* --- Pagination Controls --- */}
            {totalPages > 1 && (
                <nav className="flex items-center justify-between p-4 bg-black text-white border-t border-gray-700 rounded-b-lg">
                    {/* Information Text */}
                    <span className="text-sm font-normal text-gray-400">
                        Showing{" "}
                        <span className="font-semibold text-white">
                            {Math.min(startIndex + 1, filteredRegistrations.length)}
                        </span>{" "}
                        to{" "}
                        <span className="font-semibold text-white">
                            {Math.min(endIndex, filteredRegistrations.length)}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-white">
                            {filteredRegistrations.length}
                        </span>
                    </span>

                    {/* Page Buttons */}
                    <div className="flex space-x-1">
                        <button
                            onClick={goToPrevPage}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 text-sm font-medium rounded-lg ${
                                currentPage === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                        >
                            Previous
                        </button>
                        
                        {/* Page Numbers */}
                        <div className="flex items-center space-x-1">
                            {currentPage > 3 && totalPages > 5 && (
                                <>
                                <button
                                    onClick={() => goToPage(1)}
                                    className="px-3 py-1 text-sm font-medium rounded-lg bg-gray-700 hover:bg-gray-600"
                                >
                                    1
                                </button>
                                <span className="text-gray-400">...</span>
                                </>
                            )}
                            
                            {renderPageNumbers().map(pageNumber => (
                                <button
                                    key={pageNumber}
                                    onClick={() => goToPage(pageNumber)}
                                    className={`px-3 py-1 text-sm font-medium rounded-lg ${
                                        pageNumber === currentPage ? 'bg-primary-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                            
                            {currentPage < totalPages - 2 && totalPages > 5 && (
                                <>
                                <span className="text-gray-400">...</span>
                                <button
                                    onClick={() => goToPage(totalPages)}
                                    className="px-3 py-1 text-sm font-medium rounded-lg bg-gray-700 hover:bg-gray-600"
                                >
                                    {totalPages}
                                </button>
                                </>
                            )}
                        </div>
                        

                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 text-sm font-medium rounded-lg ${
                                currentPage === totalPages ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </nav>
            )}
            
        {/* The original footer component is now obsolete since we added the full pagination bar at the bottom of the content container. */}
        {/* <div className="flex-shrink-0 mt-4 text-center text-gray-400 text-sm">
            Footer stays visible
        </div> */}

        </div>
          </div>
    </>
  )
}