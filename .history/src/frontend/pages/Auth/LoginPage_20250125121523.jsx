"use client";

import { Info } from "lucide-react";
import Logo from "../../../../public/logo";

import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../server/utils/axios.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useContext } from "react";
export default function SignIn() {
  const {dbUser} = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(())
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (email === "" || password === "") {
      setError(true);
      toast.error("Please fill in all fields.");
      return;
    }

    setError(false);
    setLoading(true);

    try {
      const response = await api.post("/users/api/v1/login", { email, password });
      console.log("res,", response)
      setLoading(false);

      if (response.status === 200) {
        toast.success("Logged in successfully!");
        navigate("/"); // Redirect to home page
      } else {
        toast.error("Invalid email or password.");
      }
    } catch (err) {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-[460px] mx-auto px-5 py-10 font-sans">
      <div className="mb-12">
        <NavLink to="/">
          <Logo></Logo>
        </NavLink>
      </div>

      <div className="text-center">
        <h1 className="text-2xl mb-2 text-gray-900 font-bold">Sign in to your account</h1>
        <p className="mb-6 text-sm">
          New to eBay?{" "}
          <NavLink to="/register" className="text-blue-600 hover:text-blue-700">
            Create account
          </NavLink>
        </p>

        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-3 border ${error ? "border-red-600" : "border-gray-400"} rounded-lg text-base focus:outline-none focus:border-blue-600`}
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-3 border ${error ? "border-red-600" : "border-gray-400"} rounded-lg text-base focus:outline-none focus:border-blue-600`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-full text-base transition-colors"
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="#ffffff" /> : "Continue"}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-gray-500">or</span>
            </div>
          </div>

          <div className="space-y-2">
            <button className="w-full border border-gray-400 hover:bg-gray-50 py-3 px-4 rounded-full flex items-center justify-center gap-2 text-base transition-colors">
              Continue with Google
            </button>
          </div>

          <div className="flex items-center gap-2 mt-6 text-sm">
            <input
              type="checkbox"
              id="stay-signed"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="stay-signed">Stay signed in</label>
            <Info size={16} className="text-gray-500 cursor-help" />
          </div>
        </form>
      </div>

      <footer className="mt-12 text-center text-xs text-gray-500">
        <p>Copyright © 1995-2025 eBay Inc. All Rights Reserved.</p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          <NavLink to="#" className="hover:underline">
            Accessibility
          </NavLink>
          <NavLink to="#" className="hover:underline">
            User Agreement
          </NavLink>
          <NavLink to="#" className="hover:underline">
            Privacy
          </NavLink>
          <NavLink to="#" className="hover:underline">
            Payments Terms of Use
          </NavLink>
          <NavLink to="#" className="hover:underline">
            Cookies
          </NavLink>
          <NavLink to="#" className="hover:underline">
            Your Privacy Choices
          </NavLink>
          <NavLink to="#" className="hover:underline">
            AdChoice
          </NavLink>
        </div>
      </footer>
    </div>
  );
}
