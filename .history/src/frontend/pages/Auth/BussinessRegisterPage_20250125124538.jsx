import { useState, useEffect, useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast, Slide } from "react-toastify";
import { validateBusinessForm,handleInputChange } from "../../frontend-utils/formutils";
import { SellerContext } from "../../context/SellerContext";
import Logo from "../../../../public/logo";

export default function BusinessRegisterPage() {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    password: "",
    confirmPassword: "",
    country: "",
    buyingOnly: false,
  });

  // Flag to track if the user signed up in this session
  const [isNewSignup, setIsNewSignup] = useState(false);

  const { seller, error, signupBussinessAccount, setError, emailVerificationSent, emailVerifying, message } =
    useContext(AuthContext);

  // Fetch countries on mount
  useEffect(() => {
    const getCountries = () => {
      fetch('https://restcountries.com/v3.1/all')
        .then((res) => res.json())
        .then((data) => {
          const formattedCountries = data.map((country) => ({
            name: country.name.common,
            code: country.cca2,
          }));
          formattedCountries.sort((a, b) => a.name.localeCompare(b.name));
          setCountries(formattedCountries);
        })
        .catch((error) => console.error('Error fetching countries:', error));
    };

    getCountries();
  }, []);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Slide,
      });
    }
  }, [error]);

  // Show success toast only when it's a new signup
  useEffect(() => {
    if (user?.emailVerified === true && isNewSignup) {
      toast.success(message || "Logged in successfully", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Slide,
      });
      navigate("/");
    }
  }, [user?.emailVerified, isNewSignup, message, navigate]);

  // Handle form input changes
  const handleInputChangeWrapper = (e) => {
    handleInputChange(e, formData, setFormData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateBusinessForm(formData, setError)) {
      setLoading(false);
      return;
    }

    try {
      const response = await signupBussinessAccount(
        formData.businessEmail,
        formData.password,
        formData.businessName,
        formData.country
      );
      console.log(response);
      setIsNewSignup(true); // Set flag to indicate new signup
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
                  onChange={handleInputChangeWrapper}
                  disabled={emailVerificationSent && emailVerifying}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                  onChange={handleInputChangeWrapper}
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
                    onChange={handleInputChangeWrapper}
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
                    onChange={handleInputChangeWrapper}
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
      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
        Where is your business registered?
      </label>
      <select
        id="country"
        name="country"
        value={formData.country}
        onChange={handleInputChangeWrapper}
        disabled={emailVerificationSent && emailVerifying}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">Select a country/region</option>
        {countries.map(country => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
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
                  onChange={handleInputChangeWrapper}
                  disabled={emailVerificationSent && emailVerifying}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                disabled={loading || (emailVerificationSent && emailVerifying)}
                className="w-full bg-blue-600 text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
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