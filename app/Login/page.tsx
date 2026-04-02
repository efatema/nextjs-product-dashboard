"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const handleLogin = () => {
    if (user.trim() === "admin" && pass.trim() === "1234") {
      localStorage.setItem("auth", "true");
      router.push("/dashboard");
    } else {
      setErr("wrong data 😅");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow w-80">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">
          Login
        </h1>

        <input
          className="w-full border border-gray-300 p-2 mb-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          type="password"
          className="w-full border border-gray-300 p-2 mb-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition"
        >
          Login
        </button>

        {err && <p className="text-red-500 mt-2">{err}</p>}
      </div>
    </div>
  );
}