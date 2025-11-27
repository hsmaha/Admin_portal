"use client";

import Link from "next/link";

export function AdminSidebar() {
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
      <ul className="space-y-3">
        <li>
          <Link href="/admin/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-500 mt-6 block"
          >
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}
