interface Category {
    title: string
    count: number
    icon: string
  }
  
  const categories = [
    { title: "Mobiles", count: 75919, icon: "📱" },
    { title: "Electronics", count: 51135, icon: "🖥️" },
    { title: "Vehicles", count: 29578, icon: "🚗" },
    { title: "Property", count: 16677, icon: "🏠" },
    { title: "Home & Living", count: 15207, icon: "🏡" },
    { title: "Pets & Animals", count: 12417, icon: "🐾" },
    { title: "Men's Fashion & Grooming", count: 6622, icon: "👔" },
    { title: "Women's Fashion & Beauty", count: 6051, icon: "👗" },
    { title: "Hobbies, Sports & Kids", count: 5934, icon: "⚽" },
    { title: "Business & Industry", count: 2997, icon: "💼" },
    { title: "Essentials", count: 2402, icon: "🛍️" },
    { title: "Education", count: 2130, icon: "🎓" },
    { title: "Jobs", count: 1208, icon: "💼" },
    { title: "Services", count: 675, icon: "🔧" },
    { title: "Agriculture", count: 555, icon: "🌾" },
    { title: "Overseas Jobs", count: 89, icon: "✈️" },
  ]
  
  export default function CategoryBrowser() {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-6">Browse items by category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <span className="text-2xl mr-3">{category.icon}</span>
              <div>
                <h3 className="font-medium text-gray-900">{category.title}</h3>
                <p className="text-sm text-gray-500">{category.count.toLocaleString()} ads</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    )
  }
  
  