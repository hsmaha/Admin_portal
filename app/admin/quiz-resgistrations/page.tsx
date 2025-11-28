"use client";
import React, { useState, useMemo ,useEffect} from "react";
import axios from "axios";
// Define a type for your registration data
interface Registration {
  u_id: number;
  full_name: string;
  phone: string;
  email: string;
  nic: string;
  city: string;
  last_qualification: string;
  institute: string;
  instagram_handle: string;
  created_at: string;
}
const cityNames: Record<string, string> = {
  "1": "Islamabad",
  "2": "Lahore",
  "3": "Karachi",
};
const ITEMS_PER_PAGE = 10; // Define how many items to show per page

export default function QuizRegistration() {
const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isloader, setisloader] = useState(false);
  const [emailError,setemailError]=useState("")

  const openModal = () => {
        setemailError("")
        setIsOpen(true)
};
  const closeModal = () => setIsOpen(false);
  const sendEmail = async () => {
        setemailError("")
     setisloader(true)
      try {
          const response = await axios.post("https://www.hsconsultants.net/api/admin/email-user");
          setisloader(false);
      } catch (err) {
        setemailError("Something went wrong!!")
        // setError("Failed to load registrations");
      } finally {
        setisloader(false);
      }
  }
  
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://www.hsconsultants.net/api/admin/get-user");
        setRegistrations(response.data.data);
      } catch (err) {
        setError("Failed to load registrations");
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  // --- Search Logic (from previous step) ---
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page whenever search query changes
  };

const filteredRegistrations = useMemo(() => {
  if (!registrations || !Array.isArray(registrations)) return [];
  if (!searchQuery) return registrations;

  const q = searchQuery.toLowerCase();

  return registrations.filter(r => {
    // Convert numeric city to readable name (if exists)
    const readableCity = cityNames[r.city] || r.city;

    return (
      r.full_name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      readableCity.toLowerCase().includes(q) || // ✅ now supports search by "Karachi", "Lahore", etc.
      r.nic.toLowerCase().includes(q) ||
      r.last_qualification.toLowerCase().includes(q) ||
      r.institute.toLowerCase().includes(q)
    );
  });
}, [searchQuery, registrations]);
 
 const totalPages = Math.ceil(filteredRegistrations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedRegistrations = filteredRegistrations.slice(startIndex, endIndex);
if (loading)
    return <div className="flex items-center justify-center h-screen text-white text-xl">Loading...</div>;
  if (error)
    return <div className="flex items-center justify-center h-screen text-red-500 text-xl">{error}</div>;

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
                                placeholder="Search here...." 
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0 ">
                    <button type="button"  onClick={openModal} className="flex items-center justify-center text-white bg-orange-500 hover:bg-primary-800 focus:ring-4 border border-black focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        {/* <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg> */}
                       Send Email
                    </button>
                   
                </div>
            </div>

            <div className="flex-1 overflow-auto border border-gray-700 rounded-lg">
                <table className="min-w-max text-sm text-left border-collapse w-full">
                    <thead className="bg-black sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3">ID</th>
                            <th className="px-2 py-3">Full Name</th>
                            <th className="px-2 py-3">Email</th>
                            <th className="px-2 py-3">Phone</th>
                            <th className="px-2 py-3">NIC</th>
                            <th className="px-2 py-3">City</th>
                            <th className="px-2 py-3">Qualification</th>
                            <th className="px-2 py-3">Institute</th>
                            <th className="px-2 py-3">Instagram</th>
                            <th className="px-2 py-3">Registered</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-700">
                        {paginatedRegistrations.map((r, index) => (
                            <tr key={r.u_id} className={`${index % 2 === 0 ? "bg-black" : "bg-gray-600"
                            } hover:bg-gray-700`}>
                                <td className="px-4 py-3">{r.u_id}</td>
                                <td className="px-2 py-3">{r.full_name}</td>
                                <td className="px-2 py-3">{r.email}</td>
                                <td className="px-2 py-3">{r.phone}</td>
                                <td className="px-2 py-3">{r.nic}</td>
                                <td className="px-2 py-3">{r.city === '3'
                                                            ? 'Karachi'
                                                            : r.city === '2'
                                                            ? 'Lahore'
                                                            : r.city === '1'
                                                            ? 'Islamabad'
                                                            : r.city}
                                </td>
                                <td className="px-2 py-3">{r.last_qualification}</td>
                                <td className="px-2 py-3">{r.institute}</td>
                                <td className="px-2 py-3">{r.instagram_handle}</td>
                                <td className="px-2 py-3">{new Date(r.created_at).toLocaleDateString()}</td>
                            </tr>
                            ))}
                            {filteredRegistrations.length === 0 && (
                            <tr>
                                <tr className="bg-black">
                                <td colSpan={10} className="px-6 py-4 text-center text-lg text-gray-400">
                                No registrations found matching "{searchQuery}"
                                </td>
                            </tr>
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
     {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative text-black">
            <h2 className="text-xl font-semibold mb-4">Email to all Users?</h2>
            <p>By clicking on Sent button you will send "Quiz Link" to all registered users </p>

            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <div className="m-4 text-center border rounded-lg border-white text-white flex justify-center"  >
                <div className="bg-green-700 p-2 border rounded-lg border-white text-white flex ">
                {isloader &&(<p className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin mt-2"></p>)}
                <button className="p-2 " onClick={sendEmail} > Send Email to all Users</button>
                </div>
        </div>
          <div className="text-center"> <p className="text-red-500 text-xs">{emailError}</p></div>
          </div>
        </div>
      )}
        </div>
          </div>
    </>
  )
}