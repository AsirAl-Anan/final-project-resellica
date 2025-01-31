import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function BusinessRegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [buyingOnly, setBuyingOnly] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="px-6 py-3 flex justify-between items-center border-b">
        <a href="/" className="text-2xl font-bold text-blue-600">
          resellica
        </a>
        <div className="text-sm">
          Already have an account? <a href="/login" className="text-blue-600">Sign in</a>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Column - Image Container */}
        <div className="hidden lg:block lg:w-[45%] relative">
          <img
            src="https://ir.ebaystatic.com/cr/v/c01/buyer_dweb_business.jpg"
            alt="Business seller packaging items"
            className="absolute top-0 left-0 w-full h-[400px] object-cover"
          />
        </div>

        {/* Right Column - Form */}
        <div className="w-full lg:w-[55%] px-16 py-8">
          <div className="max-w-lg">
            <h1 className="text-2xl font-bold mb-6">Create an account</h1>

            {/* Account Type Toggle */}
            <div className="bg-gray-100 rounded-full p-1 flex mb-4 max-w-sm">
              <NavLink
                to="/user-register"
                className="flex-1 py-2 px-4 rounded-full text-sm font-medium text-center bg-gray-100 hover:bg-gray-200"
              >
                Personal
              </NavLink>
              <NavLink
                to="#"
                className="flex-1 py-2 px-4 rounded-full text-sm font-medium text-center bg-white shadow"
              >
                Business
              </NavLink>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Continue to register as a <span className="font-medium">business or nonprofit</span>, or if you plan to
              sell a large number of goods.
            </p>

            {/* Registration Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Business name"
                className="w-full p-3 border rounded-md"
              />

              <input
                type="email"
                placeholder="Business email"
                className="w-full p-3 border rounded-md"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 border rounded-md"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              <select className="w-full p-3 border rounded-md text-gray-500">
                <option value="" disabled selected>Where is your business registered?</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
              <p className="text-xs text-gray-500 -mt-2">
                If your business isn't registered, select your country of residence.
              </p>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="buyingOnly"
                  checked={buyingOnly}
                  onChange={(e) => setBuyingOnly(e.target.checked)}
                  className="h-4 w-4 border-gray-300 rounded"
                />
                <label htmlFor="buyingOnly" className="ml-2 text-sm text-gray-700">
                  I'm only interested in buying on Resellica for now
                </label>
              </div>

              <p className="text-xs text-gray-600">
                By selecting Create business account, you agree to our{" "}
                <a href="/terms" className="text-blue-600">User Agreement</a> and
                acknowledge reading our{" "}
                <a href="/privacy" className="text-blue-600">Privacy Notice</a>
              </p>

              <button
                type="submit"
                className="w-full bg-gray-300 text-gray-700 rounded-full py-3 font-medium hover:bg-gray-400"
              >
                Create business account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}