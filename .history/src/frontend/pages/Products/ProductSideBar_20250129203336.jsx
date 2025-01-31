// Sidebar component for filters
const Sidebar = ({ filters, priceRange, onFilterChange, onPriceChange }) => {
    return (
      <div className="w-full md:w-64 space-y-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-4">Price Range</h3>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="599000"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
        </div>
  
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-4">Availability</h3>
          {['In Stock', 'Pre Order', 'Up Coming'].map((option) => (
            <label key={option} className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                checked={filters.availability.includes(option)}
                onChange={(e) => {
                  const newValues = e.target.checked
                    ? [...filters.availability, option]
                    : filters.availability.filter(item => item !== option);
                  onFilterChange('availability', newValues);
                }}
                className="rounded border-gray-300"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
  
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-4">Series</h3>
          {['Consumer Laptops', 'Business Laptops', 'Gaming Laptops', 'Premium Ultrabook Laptops'].map((option) => (
            <label key={option} className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                checked={filters.series.includes(option)}
                onChange={(e) => {
                  const newValues = e.target.checked
                    ? [...filters.series, option]
                    : filters.series.filter(item => item !== option);
                  onFilterChange('series', newValues);
                }}
                className="rounded border-gray-300"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };
  