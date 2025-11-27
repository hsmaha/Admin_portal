"use client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

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
            <div className="m-6 p-8 border rounded-xl border-gray-300 space-y-6 text-center text-white">
                <p>Total Quiz Registrations</p>
                <p style={{fontSize:'40px'}}>20000+</p>
            </div>
            <div className="m-6 p-8 border rounded-xl border-gray-300 space-y-6 text-center text-white">
                <p>Total Quiz Responses </p><br></br>
                
                <p style={{fontSize:'50px'}}>20000+</p>
            </div>
            <div className="m-6 p-8 border rounded-xl border-gray-300 space-y-6 text-center text-white">
                <p>Total Mentorship Registration</p>
                <p style={{fontSize:'50px'}}>20000+</p>
            </div>
        </div>
    </main>
</div>
    </>
  );
}
