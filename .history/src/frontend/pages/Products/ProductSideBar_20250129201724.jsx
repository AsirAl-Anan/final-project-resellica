const Sidebar = ({ filters, priceRange, onFilterChange, onPriceChange }) => {
    return (
      <div className="w-full md:w-64 space-y-6">
        <Card>
          <CardContent className="p-4">
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
              <div className="flex justify-between">
                <span>{priceRange[0]}</span>
                <span>{priceRange[1]}</span>
              </div>
            </div>
          </CardContent>
        </Card>
  
        <FilterSection
          title="Availability"
          options={['In Stock', 'Pre Order', 'Up Coming']}
          selected={filters.availability}
          onChange={(value) => onFilterChange('availability', value)}
        />
        
        <FilterSection
          title="Series"
          options={['Consumer Laptops', 'Business Laptops', 'Gaming Laptops', 'Premium Ultrabook Laptops']}
          selected={filters.series}
          onChange={(value) => onFilterChange('series', value)}
        />
      </div>
    );
  };