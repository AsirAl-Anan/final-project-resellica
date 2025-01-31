import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import Logo from '../../../../../public/logo';
import { useNavigate } from 'react-router-dom';
import api from '../../../../server/utils/axios';
export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {dbUser} = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(()=>{
    if(dbUser[0].role !== "admin"){ 
        navigate('/')
        return null
    }
  })
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/admins/api/v1/login', { email, password });
        console.log(response)
      if(response.status === 400){
        toast.error('Invalid email or password')
      }
      if(response.status === 404){
        toast.error('Admin not found')
      }
      if(response.status === 200){
        toast.success('Login successful! Redirecting...', { position: toast.POSITION.TOP_RIGHT });
      }

    
    return  navigate('/admin')
      // Handle successful login (e.g., set token, redirect)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold text-center text-blue-600">Resellica Admin Login</h1>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="admin@resellica.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your password"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-bold rounded-md ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">&copy; {new Date().getFullYear()} Resellica. All rights reserved.</p>
      </div>
    </div>
  );
}
