import { useQuery } from '@tanstack/react-query'
import api from "../../server/utils/axios.js"
import { NavLink } from 'react-router-dom'
// Query function to fetch categories
const fetchCategories = async () => {
  const response = await api.get("/users/api/v1/get-categories")
  return response.data.data.categories
}

export default function CategoryLayout() {
  // Use the useQuery hook to fetch and manage data
  const { data: categories, isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  if (isLoading) {
    return (
      <div className="w-full mx-auto p-6 mt-8">
        <h2 className="text-xl font-semibold mb-6">Loading categories...</h2>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full mx-auto p-6 mt-8">
        <h2 className="text-xl font-semibold mb-6 text-red-600">
          Error loading categories: {error.message}
        </h2>
      </div>
    )
  }

  // Map MongoDB categories to include count and default icon if needed
  const processedCategories = categories.map(category => ({
    title: category.name,
    count: category.subCategories?.length || 0,
    icon: category.icon || '📦' // Default icon if none provided
    id: category._id
  }))
 console.log(processedCategories)
  return (
    <div className="w-full mx-auto p-6 mt-8">
      <h2 className="text-xl font-semibold mb-6">Browse items by category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {processedCategories.map((category, index) => (
          <NavLink
          
          to={`/category/${category._id}`}
            key={index}
            href="#"
            className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <span className="text-2xl mr-3">{category.icon}</span>
            <div>
              <h3 className="font-medium text-gray-900">{category.title}</h3>
              <p className="text-sm text-gray-500">
                {category.count.toLocaleString()} products
              </p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  )
}