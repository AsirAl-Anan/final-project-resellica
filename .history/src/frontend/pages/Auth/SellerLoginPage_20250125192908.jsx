"use client";

import { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SellerContext } from "../../context/SellerContext.jsx";
import Logo from "../../../../public/logo";

export default function SellerSignIn() {
  const { 
    signin, 
    seller, 
    dbSeller, 
    message, 
    error, 
    emailVerifying,
    verificationCode,
    setVerificationCode 
  } = useContext(SellerContext) ;
 console.log(verificationCode,emailVerifying)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (seller && dbSeller) {
      toast.success(message);
      navigate("/");
    }
    if (error) {
      toast.error(error);
    }
  }, [seller, dbSeller, navigate, message, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await signin(email, password);
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    
    if (!verificationCode) {
      toast.error("Please enter verification code.");
      return;
    }

    setLoading(true);
    try {
      await signin(email, password, verificationCode);
    } catch (err) {
      toast.error("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[460px] mx-auto px-5 py-10 font-sans">
      <div className="mb-12">
        <NavLink to="/">
          <Logo />
        </NavLink>
      </div>

      {emailVerifying ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-4">Verify Your Account</h2>
          <p className="mb-6 text-gray-600">
            We've sent a verification code to your email. Please enter the code below.
          </p>
          <form onSubmit={handleVerificationSubmit}>
            <input
              type="text"
              placeholder="Enter Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-3 py-3 border border-gray-400 rounded-lg text-base focus:outline-none focus:border-blue-600 mb-4"
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-full text-base transition-colors"
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="#ffffff" /> : "Verify"}
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl mb-2 text-gray-900 font-bold">
            Sign in to your account
          </h1>
          <p className="mb-6 text-sm">
            New to resellica?{" "}
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
                className="w-full px-3 py-3 border border-gray-400 rounded-lg text-base focus:outline-none focus:border-blue-600"
                disabled={loading}
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-3 border border-gray-400 rounded-lg text-base focus:outline-none focus:border-blue-600"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-full text-base transition-colors"
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="#ffffff" /> : "Continue"}
            </button>
          </form>
        </div>
      )}

      <footer className="mt-12 text-center text-xs text-gray-500">
        <p>Copyright © 1995-2025 resellica Inc. All Rights Reserved.</p>
      </footer>
    </div>
  );
}