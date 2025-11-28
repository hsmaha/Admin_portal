
"use client";
import React, { useState, useMemo } from "react";

// Define a type for your registration data
interface Registration {
    id: string;
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
  { id: '', name: '', email: '', role: '', status: '', city: '', country: '', phone: '', registered: '' },
]

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
     <div className="w-screen h-screen p-4" 
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
                                placeholder="Search here" 
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
                            {/* <th className="px-4 py-3">ID</th>
                            <th className="px-2 py-3">Full Name</th>
                            <th className="px-2 py-3">Email</th>
                            <th className="px-2 py-3">Phone</th>
                            <th className="px-2 py-3">NIC</th>
                            <th className="px-2 py-3">City</th>
                            <th className="px-2 py-3">Qualification</th>
                            <th className="px-2 py-3">Institute</th>
                            <th className="px-2 py-3">Instagram</th>
                            <th className="px-2 py-3">Registered</th> */}
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
                        </tr>
                        ))}

                        {/* Display message if no results found */}
                        {/* {filteredRegistrations.length === 0 && ( */}
                            <tr className="bg-black">
                                <td colSpan={10} className="px-6 py-4 text-center text-lg text-gray-400">
                                ** No records found **
                                </td>
                            </tr>
                        {/* )} */}
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