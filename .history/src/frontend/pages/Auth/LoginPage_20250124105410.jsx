"use client"

import { Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(true) 
  }

  return (
    <div className="max-w-[460px] mx-auto px-5 py-10 font-sans">
      <div className="mb-12">
        <Link href="/">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MfGlgmuVMfqjrediwos0KtJz0W4LTl.png"
            alt="eBay Logo"
            width={117}
            height={48}
          />
        </Link>
      </div>

      <div className="text-center">
        <h1 className="text-2xl mb-2 text-gray-900 font-bold">Sign in to your account</h1>
        <p className="mb-6 text-sm">
          New to eBay?{" "}
          <Link href="/register" className="text-blue-600 hover:text-blue-700">
            Create account
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-3 border ${error ? "border-red-600" : "border-gray-400"} rounded-lg text-base focus:outline-none focus:border-blue-600`}
            />
            {error && (
              <div className="flex items-center gap-2 text-red-600 mt-2 text-sm">
                <Info size={16} />
                <span>We couldn't find this eBay account.</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-full text-base transition-colors"
          >
            Continue
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
              <Image src="/placeholder.svg?height=20&width=20" alt="Google" width={20} height={20} />
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
          <Link href="#" className="hover:underline">
            Accessibility
          </Link>
          <Link href="#" className="hover:underline">
            User Agreement
          </Link>
          <Link href="#" className="hover:underline">
            Privacy
          </Link>
          <Link href="#" className="hover:underline">
            Payments Terms of Use
          </Link>
          <Link href="#" className="hover:underline">
            Cookies
          </Link>
          <Link href="#" className="hover:underline">
            Your Privacy Choices
          </Link>
          <Link href="#" className="hover:underline">
            AdChoice
          </Link>
        </div>
      </footer>
    </div>
  )
}

