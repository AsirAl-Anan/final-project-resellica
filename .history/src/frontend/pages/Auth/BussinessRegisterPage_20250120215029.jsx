import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function BusinessRegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [accountType, setAccountType] = useState("business")
  const [buyingOnly, setBuyingOnly] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b">
        <a
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          resellica
        </a>
        <div className="text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign in
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Left Column - Image */}
        <div className="hidden lg:block w-3/5 bg-gray-100">
          <div className="h-full relative">
            <img
              src="https://ir.ebaystatic.com/cr/v/c01/buyer_dweb_business.jpg"
              alt="Business seller packaging items"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="w-full lg:w-2/5 p-8">
          <div className="max-w-md mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-4">Create an account</h1>
            </div>

            {/* Account Type Toggle */}
            <div className="bg-gray-100 rounded-full p-1 flex">
              <NavLink
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors text-center ${
                  accountType === "personal" ? "bg-white shadow" : "hover:bg-gray-200"
                }`}
                to={'/user-register'}
              >
                Personal
              </NavLink>
              <NavLink
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors text-center ${
                  accountType === "business" ? "bg-white shadow" : "hover:bg-gray-200"
                }`}
              >
                Business
              </NavLink>
            </div>

            <div className="text-sm text-gray-600">
              Continue to register as a <span className="font-medium">business or nonprofit</span>, or if you plan to
              sell a large number of goods.
            </div>

            {/* Registration Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  placeholder="Business name"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <input
                  type="email"
                  id="businessEmail"
                  name="businessEmail"
                  placeholder="Business email"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
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

              <div>
                <select
                  id="country"
                  name="country"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  defaultValue=""
                >
                  <option value="" disabled>Where is your business registered?</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  If your business isn't registered, select your country of residence.
                </p>
              </div>

              <div className="flex items-center">
                <input
                  id="buyingOnly"
                  name="buyingOnly"
                  type="checkbox"
                  checked={buyingOnly}
                  onChange={(e) => setBuyingOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="buyingOnly" className="ml-2 block text-sm text-gray-700">
                  I'm only interested in buying on Resellica for now
                </label>
              </div>

              <div className="text-xs text-gray-600">
                By selecting Create business account, you agree to our{" "}
                <a href="/terms" className="text-blue-600 hover:text-blue-700">
                  User Agreement
                </a>{" "}
                and acknowledge reading our{" "}
                <a href="/privacy" className="text-blue-600 hover:text-blue-700">
                  Privacy Notice
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-300 text-gray-700 rounded-full py-3 px-4 text-sm font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Create business account
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}