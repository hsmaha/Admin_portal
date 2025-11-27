"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

interface TokenPayload {
  exp: number;
  [key: string]: any;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isLoginPage = pathname === "/admin/login";

    if (!token && !isLoginPage) {
      router.replace("/admin/login");
      return;
    }

    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        const now = Date.now() / 1000;

        if (decoded.exp < now) {
          localStorage.removeItem("token");
          router.replace("/admin/login");
        } else if (isLoginPage) {
          router.replace("/admin/dashboard");
        }
      } catch {
        localStorage.removeItem("token");
        router.replace("/admin/login");
      }
    }

    setIsLoading(false);
  }, [pathname, router]);

  if (isLoading) return <div>Loading...</div>;
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="flex h-screen overflow-hidden" style={{backgroundColor:"#282828ff"}}>
     
      <aside className="w-64 text-white p-5 overflow-y-auto bg-black border-r border-gray-600">
        <h2 className="font-bold text-xl mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <Link
            href="/admin/dashboard"
            className={`block p-2 rounded hover:bg-gray-700 ${
              pathname === "/admin/dashboard" ? "bg-gray-800" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/quiz-resgistrations"
            className={`block p-2 rounded hover:bg-gray-700 ${
              pathname === "/admin/quiz-resgistrations" ? "bg-gray-800" : ""
            }`}
          >
            Quiz Registrations
          </Link>
          <Link
            href="/admin/quiz-responses"
            className={`block p-2 rounded hover:bg-gray-700 ${
              pathname === "/admin/quiz-responses" ? "bg-gray-800" : ""
            }`}
          >
            Quiz Responses
          </Link>
         
        </nav>
      </aside>
      <div className="flex flex-col **min-h-screen** overflow-hidden bg-gray-100">
            <main className="flex-1 overflow-auto">{children}</main>

          <div className="absolute text-right right-0">
                  <div className="text-right">
                  <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        router.push("/admin/login");
                      }}
                      className="m-6 p-2 bg-red-600 hover:bg-red-700 rounded"
                      >
                      Logout
                    </button>
                  </div>
            </div>
          </div>
      </div>
  );
}
