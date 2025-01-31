import { useState, useEffect, useContext } from "react"
import { Eye, EyeOff } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { toast, Slide } from "react-toastify"
import Logo from "../../../../public/logo"

export default function BusinessRegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    password: "",
    confirmPassword: "",
    country: "",
    buyingOnly: false
  });
  
  const {
    error,
    signin,
    setError,
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.businessName || !formData.businessEmail || !formData.password || !formData.confirmPassword || !formData.country) {
      setError('Please fill in all required fields');
      return false;
    }

    if (!formData.businessEmail.includes('@') || !formData.businessEmail.includes('.')) {
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
      const response = await signin(formData.businessEmail, formData.password);
      toast.success("Business account created successfully", {
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
          className="text-2xl w-5 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          <Logo />
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
            src="https://ir.ebaystatic.com/cr/v/c01/buyer_dweb_business.jpg"
            alt="Business seller packaging items"
            className="absolute inset-0 w-2/3 h-2/3 mx-auto my-auto rounded-lg object-cover"
          />
        </div>

        {/* Right Column - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Create an account</h1>
            </div>

            {/* Account Type Toggle */}
            <div className="bg-gray-100 rounded-full p-1 flex">
              <NavLink
                to="/user-register"
                className="flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors hover:bg-gray-200"
              >
                Personal
              </NavLink>
              <NavLink
                to="/business-register"
                className="flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors bg-white shadow"
              >
                Business
              </NavLink>
            </div>

            <div className="text-sm text-gray-600">
              Continue to register as a <span className="font-medium">business or nonprofit</span>, or if you plan to
              sell a large number of goods.
            </div>

            {/* Registration Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                  Business name
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-700">
                  Business email
                </label>
                <input
                  type="email"
                  id="businessEmail"
                  name="businessEmail"
                  value={formData.businessEmail}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
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
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
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
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Where is your business registered?
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select a country/region</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  If your business isn't registered, select your country of residence.
                </p>
              </div>

              <div className="flex items-center">
                <input
                  id="buyingOnly"
                  name="buyingOnly"
                  type="checkbox"
                  checked={formData.buyingOnly}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="buyingOnly" className="ml-2 block text-sm text-gray-700">
                  I'm only interested in buying on Resellica for now
                </label>
              </div>

              <div className="text-sm text-gray-600">
                By selecting Create business account, you agree to our{" "}
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
                disabled={loading}
                className="w-full bg-blue-600 text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create business account"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}