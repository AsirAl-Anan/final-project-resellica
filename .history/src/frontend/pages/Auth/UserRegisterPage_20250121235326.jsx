import { useState, useEffect, useContext } from "react"
import { Eye, EyeOff } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { toast, Slide } from "react-toastify"
import Logo from "../../../../public/logo"
export default function UserRegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: ""
  });
  
  const {
    user,
    error,
    signin,
    message,
    setError,
    emailVerificationSent,
    emailVerifying
  } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
  }, [error]);

  useEffect(() => {
    if (user?.emailVerified) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword || !formData.username) {
      setError('Please fill in all fields');
      return false;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Invalid email address');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }
   
     try {
       const response = await signin(formData.email, formData.password, formData.username, formData.firstName + " " + formData.lastName);
       console.log(response)
       toast.success("Sign in successful", {
         position: "top-right",
         autoClose: 2500,
         hideProgressBar: true,
         closeOnClick: false,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "dark",
         transition: Slide,
       });
       navigate('/');
     } catch (err) {
       toast.error(err.message);
     } finally {
       setLoading(false);
     }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b">
        <NavLink
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          <Logo></Logo>
        </NavLink>
        <div className="text-sm">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign in
          </NavLink>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Left Column - Image */}
        <div className="hidden lg:block w-1/2 relative">
          <img
            src="https:ir.ebaystatic.com/cr/v/c01/buyer_dweb_individual.jpg"
            alt="People enjoying shopping"
            className="absolute inset-0 w-2/3 h-2/3 mx-auto my-auto rounded-lg object-cover"
          />
        </div>

        {/* Right Column - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Create an account</h1>
            </div>
        {/* Email Verification Box */}
        {emailVerificationSent && emailVerifying && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <h3 className="font-medium text-blue-900">Verify Your Email</h3>
                </div>
                <p className="text-sm text-blue-800">
                  We've sent a verification link to your email address. Please check your inbox and verify your email to continue.
                </p>
              </div>
            )}
            {/* Account Type Toggle */}
            <div className="bg-gray-100 rounded-full p-1 flex">
              <NavLink
                to="/user-register"
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors bg-white shadow`}
              >
                Personal
              </NavLink>
              <NavLink
                to="/business-register"
                className="flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors hover:bg-gray-200"
              >
                Business
              </NavLink>
            </div>

            {/* Registration Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={emailVerificationSent && emailVerifying}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={emailVerificationSent && emailVerifying}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* ... other form fields with disabled state ... */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={emailVerificationSent && emailVerifying}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={emailVerificationSent && emailVerifying}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={emailVerificationSent && emailVerifying}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={emailVerificationSent && emailVerifying}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={emailVerificationSent && emailVerifying}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={emailVerificationSent && emailVerifying}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                By selecting Create account, you agree to our{" "}
                <NavLink to="/terms" className="text-blue-600 hover:text-blue-700">
                  User Agreement
                </NavLink>{" "}
                and acknowledge reading our{" "}
                <NavLink to="/privacy" className="text-blue-600 hover:text-blue-700">
                  Privacy Notice
                </NavLink>
              </div>

              <button
                type="submit"
                disabled={loading || (emailVerificationSent && emailVerifying)}
                className="w-full bg-blue-600 text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Create personal account"}
              </button>

            
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}