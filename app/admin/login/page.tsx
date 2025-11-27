"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/admin/dashboard");
    } else {
      setError(data.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col gap-10 items-center h-screen "
     style={{
      // https://i.pinimg.com/474x/4e/63/9d/4e639d9107f323a6cd80293e450fb4e3.jpg
            // backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20210708/pngtree-abstract-dark-grey-and-gold-light-luxury-background-image_739073.jpg')",
            // https://img.freepik.com/free-photo/blank-black-wooden-textured-mobile-wallpaper-background_53876-160541.jpg?semt=ais_hybrid&w=740&q=80
            backgroundImage: "url('https://ica-hpl.com.my/wp-content/uploads/2024/12/W8299SE-BLACK-WOOD.png')",
             backgroundSize: "100% 100%", // Ensures full image fits perfectly
             backgroundRepeat: "no-repeat",
            }}
            >  
    <div className="mt-12 mb-4">
              <img className="mx-auto" src="https://www.hsconsultants.net/images/logo-white.png?eb863ec64642e8a67bbf4db501d5105d" alt="" height={280} width={280}/>
        </div>
    <Card className="bg-black/40 ">
      <form
        onSubmit={handleLogin}
        className="p-8 pt-12 pb-16 rounded-lg shadow-md w-80 "
        >
        <h2 className="text-center text-lg font-semibold mb-4 ">Admin Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 mb-3 rounded-xl"
          required
          />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded-xl"
          required
          />
        <button className="w-full bg-secondary text-white py-2 rounded-xl">
          Login
        </button>
      </form>
  </Card> 
    </div>
  );
}
