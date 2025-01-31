import { useState } from "react"

export default function ProductIdentifiers({ 
  resselicaid,
  postedAt,
  originalPrice,
  resellPrice,
  country,
  yearsOfUse,
  isVerified
}) {
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT'
    }).format(price)
  }

  const identifiers = [
    {
      label: "Product ID",
      value: resselicaid || "N/A"
    },
    {
      label: "Posted Date",
      value: postedAt ? formatDate(postedAt) : "N/A"
    },
    {
      label: "Original Price",
      value: originalPrice ? formatPrice(originalPrice) : "N/A"
    },
    {
      label: "Resell Price",
      value: resellPrice ? formatPrice(resellPrice) : "N/A"
    },
    {
      label: "Location",
      value: country || "N/A"
    },
    {
      label: "Years of Use",
      value: yearsOfUse || "N/A"
    },
    {
      label: "Verification Status",
      value: isVerified ? "Verified" : "Not Verified"
    }
  ]

  return (
    <div className="mt-8 border rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Product Information</h2>
      <div className="space-y-2">
        <h3 className="font-semibold">Product Details</h3>
        <table className="w-full">
          <tbody>
            {identifiers.map(({ label, value }) => (
              <tr key={label} className="border-b last:border-b-0">
                <td className="py-2 text-gray-600 w-1/3">{label}</td>
                <td className="py-2">
                  {label === "Seller Verification Status" ? (
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      value === "Verified" 
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {value}
                    </span>
                  ) : value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}