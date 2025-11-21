"use client";

import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";
import type React from "react";
import { useSidebar } from "./sidebar-context";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  return (
    <div className="flex min-h-screen">
      {/* <div className="z-50 relative">
         <AppSidebar /> 
      </div> */}
      {/* <div className={cn(collapsed ? "xl:w-[calc(100%-70px)]" : "xl:w-[calc(100%-250px)]", "w-full")}> */}
        {/* <Header /> */}
        {/* <main className="flex-1 overflow-auto p-3 md:p-4 xxl:p-6">{children}</main> */}
        <main className=" flex-1 min-h-screen overflow-auto" >
                      <div
                        className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: "url('https://hsconsultants.pk/images/bg.jpg')",
                          backgroundSize: "100% 100%", // Ensures full image fits perfectly
                          backgroundRepeat: "no-repeat",
                          // backgroundColor:"white"
                        }}
                        
                        >
                          <div className="mt-16" >
                          <img className="mx-auto" src="https://hsconsultants.net/images/pages/post-01.png" alt="" height={380} width={380}/>
                          </div>
                          <div>
                          {children}
                          </div>
                          {/* </div> */}
                        <div className="px-8 py-16 text-center text-gray-300 ">
                          <p className="text-xs">© 2025, Powered by HS Consultants (Pvt.) Ltd.</p>
                        </div>
                        </div>
        </main>
   </div>

  );
}
