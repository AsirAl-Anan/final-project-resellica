import { useState } from "react"
export default function ProductIdentifiers() { 
  
    const identifiers = [
      { label: "Brand", value: "JBL" },
      { label: "MPN", value: "CELEBRITY100" },
      { label: "GTIN", value: "0050036384308" },
      { label: "UPC", value: "0050036384308" },
      { label: "eBay Product ID (ePID)", value: "20061877569" },
    ]
  
    return (
      <div className="mt-8 border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">About this product</h2>
        <div className="space-y-2">
          <h3 className="font-semibold">Product Identifiers</h3>
          <table className="w-full">
            <tbody>
              {identifiers.map(({ label, value }) => (
                <tr key={label} className="border-b last:border-b-0">
                  <td className="py-2 text-gray-600">{label}</td>
                  <td className="py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  