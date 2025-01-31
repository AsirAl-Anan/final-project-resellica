import { NavLink } from "react-router-dom"
export default function ProductDetails({product}) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{product?.title}</h1>
  
       
  
          <div className="flex items-center gap-2 mt-2">
            <img src="/placeholder.svg?height=32&width=32" alt="Seller logo" className="w-8 h-8 rounded" />
            <div>
              <NavLink href="#" className="text-sm text-blue-600 hover:underline">
                {product?.sellerAccount?.username}
              </NavLink>
              <div className="text-sm text-gray-600">99.5% positive feedback</div>
            </div>
          </div>
        </div>
  
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-600">Price:</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">$49.94</span>
              <span className="text-gray-600">+ $28.48 shipping</span>
            </div>
          </div>
  
          <div>
            <div className="text-sm text-gray-600">Est. delivery</div>
            <div>Wed, Mar 12 - Wed, Apr 2</div>
          </div>
  
          <div>
            <div className="text-sm text-gray-600">Returns:</div>
            <div>30 days returns. Buyer pays for return shipping.</div>
          </div>
  
          <div>
            <div className="text-sm text-gray-600">Condition:</div>
            <div>New</div>
          </div>
        </div>
  
        <div className="space-y-2">
          <p>
            JBL Celebrity 100 Headunit. Bluetooth Wireless Calls (Receive/End Calls). Built-in Bluetooth technology for
            hands-free talking and audio streaming. Bluetooth Features FM RECEIVER ONLY (NO AM RADIO).
          </p>
          <button className="text-blue-600 hover:underline">See full description</button>
        </div>
  
        <div className="space-y-3">
          <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700">Buy it Now</button>
          <button className="w-full border border-blue-600 text-blue-600 py-3 px-6 rounded-full hover:bg-blue-50">
            Add to cart
          </button>
          <button className="w-full border py-3 px-6 rounded-full hover:bg-gray-50">See all details</button>
        </div>
      </div>
    )
  }
  