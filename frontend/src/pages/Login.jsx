import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { navigate, token, setToken, backendUrl } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;

    if (currentState === "Signup") {
      if (!name.trim()) return toast.error("Name is required.");
      if (!validator.isEmail(email))
        return toast.error("Invalid email address.");
      if (password.length < 8)
        return toast.error("Password must be at least 8 characters long.");
      if (password !== confirmPassword)
        return toast.error("Passwords do not match.");
    } else {
      if (!validator.isEmail(email))
        return toast.error("Invalid email address.");
      if (!password.trim()) return toast.error("Password is required.");
    }

    return true;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const endpoint =
      currentState === "Signup" ? "/api/user/register" : "/api/user/login";
    const requestData =
      currentState === "Signup"
        ? formData
        : { email: formData.email, password: formData.password };

    try {
      const response = await axios.post(
        `${backendUrl}${endpoint}`,
        requestData
      );
      const { success, token, message } = response.data;

      if (success) {
        setToken(token);
        localStorage.setItem("token", token);
        toast.success(
          currentState === "Signup"
            ? "Registration successful!"
            : "Login successful!"
        );
        if (currentState === "Signup") setCurrentState("Login");
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-sm m-auto mt-14 gap-6 text-gray-800"
    >
      <div className="inline-flex flex-col items-center gap-1 mb-4 mt-10">
        <p className="font-semibold text-3xl tracking-wide">{currentState}</p>
        <hr className="h-[2px] w-10 bg-gray-800 rounded-full" />
      </div>

      {currentState === "Signup" && (
        <input
          name="name"
          onChange={handleInputChange}
          value={formData.name}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Name"
        />
      )}
      <input
        name="email"
        onChange={handleInputChange}
        value={formData.email}
        type="email"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        placeholder="Email"
      />
      <input
        name="password"
        onChange={handleInputChange}
        value={formData.password}
        type="password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        placeholder="Password"
      />
      {currentState === "Signup" && (
        <input
          name="confirmPassword"
          onChange={handleInputChange}
          value={formData.confirmPassword}
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Verify Password"
        />
      )}

      <div className="w-full flex justify-between text-sm text-gray-600">
        <p className="cursor-pointer hover:text-gray-800 transition-colors">
          Forgot your password?
        </p>
        <p
          onClick={() =>
            setCurrentState(currentState === "Login" ? "Signup" : "Login")
          }
          className="cursor-pointer hover:text-gray-800 transition-colors"
        >
          {currentState === "Login" ? "Create An Account" : "Login Here"}
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-all"
      >
        {currentState === "Login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
