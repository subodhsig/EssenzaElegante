import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
        console.log(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Admin Panel
        </h1>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-6">
          {/* Email Field */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          {/* Password Field */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-all"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
