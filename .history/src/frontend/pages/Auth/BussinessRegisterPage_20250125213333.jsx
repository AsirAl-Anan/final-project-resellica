import { useState, useEffect, useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { toast, Slide } from "react-toastify";
import { validateBusinessForm,handleInputChange } from "../../frontend-utils/formutils";
import Logo from "../../../../public/logo";
import { AuthContext } from "../../context/AuthContext";

export default function BusinessRegisterPage() {
  
  const {user,error,message, emailVerificationSent, emailVerifying} = useContext(AuthContext);
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: user?.displayName,
    businessEmail: user?.email,
   
    country: "",
    buyingOnly: false,
  });

  // Flag to track if the user signed up in this session
  const [isNewSignup, setIsNewSignup] = useState(false);


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
    if(!user ){
      navigate("/");
    }
    
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

  }, [user?.emailVerified, isNewSignup, message, navigate,user]);
 console.log(formData.businessName)
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
        formData.password,
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
          <NavLink to="/user-login" className="text-blue-600 hover:text-blue-700 font-medium">
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
            alt="Business user packaging items"
            className="absolute inset-0 w-2/3 h-2/3 mx-auto my-auto rounded-lg object-cover"
          />
        </div>

        {/* Right Column - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Set up your account for selling on </h1>
              <Logo></Logo>
            </div>

            {/* Account Type Toggle */}
            <div className=" text-center rounded-full p-1  py-2 px-4  text-sm font-medium transition-colors bg-white shadow-lg">
             
              <NavLink
                to="/business-register"
                className=" w-full"
              >
                Work with us
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
                  Your name
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                 
                  disabled={true}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-700">
                  Your email
                </label>
                <input
                  type="email"
                  id="businessEmail"
                  name="businessEmail"
                  value={formData.businessEmail}
                 
                  disabled={true}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

             
              <div>
      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
        Where are you selling?
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

              

              <div className="text-sm text-gray-600">
                By selecting Create business account, you agree to our{" "}
                <NavLink to="/terms" className="text-blue-600 hover:text-blue-700">
                  user Agreement
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