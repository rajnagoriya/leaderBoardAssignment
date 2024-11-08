"use client"
// import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "../context/AuthContext/useAuth";

function Login() {
 const router = useRouter();
 const { setUser, user } = useAuth();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = {
        username,
        password,
      };

    try {
      const  response  = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/v1/login`,
        formData
      );
      setUser(response?.data?.data);
     localStorage.setItem('authToken', response?.data?.token);

      // Store the token in localstorage 
      //   store the user info in context api 
      
      toast.success(response?.data?.message || "User Login successfully");
      setusername("");
      setPassword("");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error(
         "Faield to login",
      );
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <form onSubmit={handleLogin}>
            <h1 className="text-xl font-semibold mb-6">Login</h1>
            
            <div className="mb-4">
              <input
                type="name"
                placeholder="Your User Name "
                value={username}
                onChange={(e) => setusername(e.target.value)}
                className="w-full p-2  border rounded-md"
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2  border rounded-md"
              />
            </div>

            <p className="text-center mb-4">
              New User?{" "}
              <Link href={"/signup"} className="text-blue-600">
                signup Now
              </Link>
            </p>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
