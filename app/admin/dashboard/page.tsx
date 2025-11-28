"use client";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import axios from "axios";
import { Car } from "lucide-react";
import { Card,CardContent, CardHeader } from "@/components/ui/card";
export default function Dashboard() {
  const router = useRouter();
 const [totalUsers, setTotalUsers] = useState(0);
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get("https://www.hsconsultants.net/api/admin/get-user");
        
        // Assuming your API returns an array in response.data
        if (Array.isArray(response.data)) {
          setTotalUsers(response.data.length);
        } else if (Array.isArray(response.data.data)) {
          // If API wraps data inside a "data" field
          setTotalUsers(response.data.data.length);
        }
      } catch (err) {
        console.error("Error fetching registrations:", err);
      }
    };
    fetchRegistrations();
  }, []);
  return (
    <>
   <div className="w-full h-full" style={{backgroundColor:"#282828ff"}}>
    <main className="flex-1 p-12 text-center">
        <h1 className="text-2xl font-sans text-white font-semibold m-12" style={{fontSize:'40px'}}>
            Welcome to the Dashboard! 
        </h1>
        <div className="text-center p-16 ">
            <h3 className="font-sans border border-gray-300" style={{fontSize:'25px'}}>
                Here's the total summary of records!
            </h3>
        </div>
        
        {/* FIX APPLIED: Added 'justify-around w-full' to the flex container */}
        <div className="flex justify-around w-full "> 
            <Card className="m-6 border rounded-xl bg-gray border-gray-300 space-y-6 text-center text-white">
                <CardHeader>
                Total Quiz Registrations
                </CardHeader>
                <CardContent>
                    {totalUsers}
                </CardContent>
            </Card>
            <Card className="m-6 bg-gray border rounded-xl border-gray-300 space-y-6 text-center text-white">
                <CardHeader>
                    Total Quiz Responses
                </CardHeader>
                <CardContent>
                        0
                </CardContent>
            </Card>
            <Card className="m-6 bg-gray border rounded-xl border-gray-300 space-y-6 text-center text-white">
                <CardHeader>
                    Total Mentorship Registration
                </CardHeader>
                <CardContent>
                        0
                </CardContent>
            </Card>
            {/* <div className="m-6 p-8 border rounded-xl border-gray-300 space-y-6 text-center text-white">
                <p className="m-6 mt-0">Total Quiz Registrations</p>
                <p style={{fontSize:'40px'}}>{totalUsers}</p>
            </div>
            <div className="m-6 p-8 border rounded-xl border-gray-300 space-y-6 text-center text-white">
                <p className="m-6 mt-0">Total Quiz Responses </p><br></br>
                
                <p style={{fontSize:'50px'}}>0</p>
            </div>
            <div className="m-6 p-8 border rounded-xl border-gray-300 space-y-6 text-center text-white">
                <p>Total Mentorship Registration</p>
                <p style={{fontSize:'50px'}}>0</p>
            </div> */}
        </div>
    </main>
</div>
    </>
  );
}
